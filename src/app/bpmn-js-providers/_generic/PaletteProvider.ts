import { IPalette, IPaletteProvider } from '../../_helper/bpmn-js';
import { assign } from 'min-dash';

export class PaletteProvider implements IPaletteProvider {

  static $inject = ['palette', 'create', 'elementFactory', 'bpmnFactory', 'spaceTool', 'handTool', 'globalConnect'];

  private readonly create: any;
  private readonly elementFactory: any;
  private readonly bpmnFactory: any;
  private readonly spaceTool: any;
  private readonly handTool: any;
  private readonly globalConnect: any;

  // Note that names of arguments must match injected modules, see InjectionNames.
  // I don't know why originalPaletteProvider matters but it breaks if it isn't there.
  // I guess since this component is injected, and it requires an instance of originalPaletteProvider,
  // originalPaletteProvider will be new'ed and thus call palette.registerProvider for itself.
  // There probably is a better way.
  constructor(private palette: IPalette, create, elementFactory, bpmnFactory, spaceTool, handTool, globalConnect) {
    // console.log(this.constructor.name, "constructing", palette, originalPaletteProvider);
    palette.registerProvider(this);
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
    this.spaceTool = spaceTool;
    this.handTool = handTool;
    this.globalConnect = globalConnect;
  }

  getPaletteEntries() {
    const actions = {};
    assign(actions, {
      'hand-tool': {
        group: 'tools',
        className: 'bpmn-icon-hand-tool',
        title: 'Activate the hand tool',
        action: {
          click: (evt) => this.handTool.activateHand(event)
        }
      },
      'space-tool': {
        group: 'tools',
        className: 'bpmn-icon-space-tool',
        title: 'Activate the create/remove space tool',
        action: {
          click: (evt) => this.spaceTool.activateSelection(event)
        }
      },
      'global-connect-tool': {
        group: 'tools',
        className: 'bpmn-icon-connection-multi',
        title: 'Activate the global connect tool',
        action: {
          click: (evt) => this.globalConnect.toggle(event)
        }
      },
      'tool-separator': {
        group: 'tools',
        separator: true
      }
    });
    return actions;
  }

}
