import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
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
import { PropsRendererService } from 'src/app/_services/props-renderer.service';

export class PropertiesProvider extends PropertiesActivator {

    static $inject = ['eventBus', 'bpmnFactory', 'elementRegistry', 'translate'];

    private readonly eventBus: any;
    private readonly bpmnFactory: any;
    private readonly elementRegistry: any;
    private readonly translate: any;
    private flowService: FlowService;
    private propsRendererService: PropsRendererService;

    constructor(eventBus, bpmnFactory, elementRegistry, translate) {
        super(eventBus, 1500);
        this.eventBus = eventBus;
        this.bpmnFactory = bpmnFactory;
        this.elementRegistry = elementRegistry;
        this.translate = translate;
        this.eventBusListeners();
    }

    private eventBusListeners() {
        this.eventBus.on('root.added', (e) => {
            this.flowService.rootAdded(e);
        });
        this.eventBus.on('elements.changed', (e) => {
            this.flowService.elementsChanged(e);
        });
    }

    public setFlowService(flowService: FlowService) {
        this.flowService = flowService;
    }

    public setPropsRendererService(propsRendererService: PropsRendererService) {
        this.propsRendererService = propsRendererService;
    }

    getTabs(element: any) {
        const infoTab = {
            id: 'info-tab',
            label: 'Info',
            groups: this.createInfoTabGroups(element)
        };

        const flowTab = {
            id: 'flow-tab',
            label: 'Flow',
            groups: this.createFlowTabGroups(element)
        };

        const systemTab = {
            id: 'system-tab',
            label: 'System',
            groups: this.createSystemTabGroups(element)
        };

        const endpointTab = {
            id: 'endpoint-tab',
            label: 'Endpoint',
            groups: this.createEndpointTabGroups(element)
        };

        const pollingTab = {
            id: 'polling-tab',
            label: 'Polling',
            groups: this.createPollingTabGroups(element)
        };

        const queueTab = {
            id: 'queue-tab',
            label: 'Queue',
            groups: this.createQueueTabGroups(element)
        };

        const transformerTab = {
            id: 'transformer-tab',
            label: 'Transformer',
            groups: this.createTransformerTabGroups(element)
        };
        return [ infoTab, flowTab, systemTab, endpointTab, pollingTab, queueTab, transformerTab ];
    }

    // Create the flow tab
    createFlowTabGroups(element) {
        if (is(element, 'bpmn:Process')) {
            return [
                {
                    id: 'flow-grp',
                    label: 'Flow',
                    entries: [
                        // Add name property
                        entryFactory.textField({
                            id : 'fname-prop',
                            description : '',
                            label : 'Name',
                            modelProperty : 's2si:fname'
                        }),
                        // Add long description property
                        entryFactory.textBox({
                            id : 'fdesc-prop',
                            description : '',
                            label : 'Description',
                            modelProperty : 's2si:fdesc'
                        })
                    ]
                }
            ];
        } else {
            return [ ];
        }
    }

    // Create the system tab
    createSystemTabGroups(element) {
        if (is(element, 'bpmn:Task') && getBusinessObject(element).type === 'system') {
            return [
                {
                    id: 'system-grp',
                    label: 'System',
                    entries: [
                        entryFactory.selectBox({
                            id : 'sysref-prop',
                            description : '',
                            label : 'Reference',
                            modelProperty : 's2si:sysRef',
                            selectOptions: this.flowService.getSystemsInSyncMode(),
                            // setControlValue : true
                        })
                    ]
                }
            ];
        } else {
            return [ ];
        }
    }

    // Create the endpoint tab
    createEndpointTabGroups(element) {
        const group = {
            id: 'endpoint-grp',
            label: 'Endpoint',
            entries: []
        };
        // TODO
        if (is(element, 'bpmn:Task') && getBusinessObject(element).type === 'endpoint') {
            return [ group ];
        } else {
            return [ ];
        }
    }

    // Create the Polling tab
    createPollingTabGroups(element) {
        if (is(element, 'bpmn:Task') && getBusinessObject(element).type === 'polling') {
            return [
                {
                    id: 'polling-grp',
                    label: 'Polling',
                    entries: []
                }
            ];
        } else {
            return [ ];
        }
    }

    // Create the queue tab
    createQueueTabGroups(element) {
        if (is(element, 'bpmn:Task') && getBusinessObject(element).type === 'queue') {
            return [
                {
                    id: 'queue-grp',
                    label: 'Queue',
                    entries: [
                        entryFactory.textField({
                            id : 'qname-prop',
                            description : '',
                            label : 'Queue Name',
                            modelProperty : 's2si:queue_name'
                        })
                    ]
                }
            ];
        } else {
            return [ ];
        }
    }

    // Create the transformer tab
    createTransformerTabGroups(element) {
        if (is(element, 'bpmn:Task') && getBusinessObject(element).type === 'transformer') {
            return [
                {
                    id: 'transformer-grp',
                    label: 'Transformer',
                    entries: [
                        entryFactory.selectBox({
                            id : 'transformertype-prop',
                            description : '',
                            label : 'Type',
                            modelProperty : 's2si:transformer_type',
                            selectOptions: this.flowService.getTransformerTypes()
                        })
                    ]
                }
            ];
        } else {
            return [ ];
        }
    }

    createInfoTabGroups(element) {
        if (is(element, 'bpmn:Process')) {
            return [ this.flowInfoGroup() ];
        } else if (is(element, 'bpmn:Task')) {
            switch (getBusinessObject(element).type) {
                case 'system': return [ this.systemInfoGroup() ];
                case 'endpoint': return [ this.endpointInfoGroup() ];
                case 'polling': return [ this.pollingInfoGroup() ];
                case 'queue': return [ this.queueInfoGroup() ];
                case 'transformer': return [ this.transformerInfoGroup() ];
            }
            return [ this.flowInfoGroup() ];
        }
        return [ this.flowInfoGroup() ];
    }

    flowInfoGroup() {
        return {
            id: 'flow-info-grp',
            label: 'Flow',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'flow-info-p1',
                    pText : 'This is a flow, drag and drop element from the left palette and configure your flow.'
                })
            ]
        };
    }

    systemInfoGroup() {
        return {
            id: 'system-info-grp',
            label: 'System',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'system-info-p1',
                    pText : 'This is a system element. You can define systems here.'
                })
            ]
        };
    }

    endpointInfoGroup() {
        return {
            id: 'endpoint-info-grp',
            label: 'Endpoint Element',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'endpoint-info-p1',
                    pText : 'This is a system element. You can define systems here.'
                })
            ]
        };
    }

    pollingInfoGroup() {
        return {
            id: 'polling-info-grp',
            label: 'Polling Element',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'polling-info-p1',
                    pText : 'This is a system element. You can define systems here.'
                })
            ]
        };
    }

    queueInfoGroup() {
        return {
            id: 'queue-info-grp',
            label: 'Queue Element',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'queue-info-p1',
                    pText : 'This is a system element. You can define systems here.'
                })
            ]
        };
    }

    transformerInfoGroup() {
        return {
            id: 'transformer-info-grp',
            label: 'Transformer Element',
            entries: [
                this.propsRendererService.paragraph({
                    id : 'transformer-info-p1',
                    pText : 'This is a system element. You can define systems here.'
                })
            ]
        };
    }

}
