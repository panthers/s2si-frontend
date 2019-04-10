import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import { FlowService } from 'src/app/_services/flow.service';

export class PropertiesProvider extends PropertiesActivator {

    static $inject = ['eventBus', 'bpmnFactory', 'elementRegistry', 'translate'];

    private readonly bpmnFactory: any;
    private readonly elementRegistry: any;
    private readonly translate: any;
    private flowService: FlowService;

    constructor(eventBus, bpmnFactory, elementRegistry, translate) {
        super(eventBus, 1500);
        this.bpmnFactory = bpmnFactory;
        this.elementRegistry = elementRegistry;
        this.translate = translate;
    }

    public setFlowService(flowService: FlowService) {
        this.flowService = flowService;
    }

    getTabs(element: any) {
        // The "Flow" tab
        const flowTab = {
            id: 'flow',
            label: 'Flow',
            groups: this.createFlowTabGroups(element)
        };
        // The "general" tab
        const generalTab = {
            id: 'general',
            label: 'General',
            groups: this.createGeneralTabGroups(element)
        };

        // The "magic" tab
        const magicTab = {
            id: 'magic',
            label: 'Magic',
            groups: this.createMagicTabGroups(element)
        };

        // Show general + "magic" tab
        return [ flowTab, generalTab, magicTab ];
    }

    // Create the flow tab
    createFlowTabGroups(element) {
        const flowGroup = {
            id: 'flow',
            label: 'Flow',
            entries: []
        };
        // Add name property
        flowGroup.entries.push(entryFactory.textField({
            id : 'fname',
            description : '',
            label : 'Name',
            modelProperty : 's2si:fname'
        }));
        // Add long description property
        flowGroup.entries.push(entryFactory.textBox({
            id : 'fdesc',
            description : '',
            label : 'Description',
            modelProperty : 's2si:fdesc'
        }));
        if (is(element, 'bpmn:Process')) {
            return [ flowGroup ];
        } else {
            return [ ];
        }
    }

    // Create the custom magic tab
    createMagicTabGroups(element) {
        // Create a group called "Black Magic".
        const blackMagicGroup = {
        id: 'black-magic',
        label: 'Black Magic',
        entries: []
        };
        // Add the spell props to the black magic group.
        if (is(element, 'bpmn:Task')) {
            blackMagicGroup.entries.push(entryFactory.textField({
              id : 'spell',
              description : 'Apply a black magic spell',
              label : 'Spell',
              modelProperty : 'spell'
            }));
        }
        return [ blackMagicGroup ];
    }

    // The general tab contains all bpmn relevant properties.
    // The properties are organized in groups.
    createGeneralTabGroups(element) {
        const generalGroup = {
            id: 'general',
            label: 'General',
            entries: []
        };
        idProps(generalGroup, element, this.translate);
        nameProps(generalGroup, element, this.translate);
        processProps(generalGroup, element, this.translate);

        const detailsGroup = {
            id: 'details',
            label: 'Details',
            entries: []
        };
        linkProps(detailsGroup, element, this.translate);
        eventProps(detailsGroup, element, this.bpmnFactory, this.elementRegistry, this.translate);

        const documentationGroup = {
            id: 'documentation',
            label: 'Documentation',
            entries: []
        };

        documentationProps(documentationGroup, element, this.bpmnFactory, this.translate);
        return [ generalGroup, detailsGroup, documentationGroup ];
    }

}
