import { IPalette, IPaletteProvider } from '../../_helper/bpmn-js';
import * as gfx from './GFX';

export class PaletteProvider implements IPaletteProvider {

  static $inject = ['palette', 'originalPaletteProvider', 'create', 'elementFactory', 'bpmnFactory'];

  private readonly create: any;
  private readonly elementFactory: any;
  private readonly bpmnFactory: any;

  // Note that names of arguments must match injected modules, see InjectionNames.
  // I don't know why originalPaletteProvider matters but it breaks if it isn't there.
  // I guess since this component is injected, and it requires an instance of originalPaletteProvider,
  // originalPaletteProvider will be new'ed and thus call palette.registerProvider for itself.
  // There probably is a better way.
  constructor(private palette: IPalette, private originalPaletteProvider: IPaletteProvider, create, elementFactory, bpmnFactory) {
    // console.log(this.constructor.name, "constructing", palette, originalPaletteProvider);
    palette.registerProvider(this);
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
  }

  getPaletteEntries() {
    return {
      'create.System': {
        group: 'activity',
        title: 'Create System',
        // className: ['fa-save', 'fa'],
        imageUrl: gfx.dataURL,
        action: {
          dragstart: (evt) => this.createTask(evt),
          click: (evt) => this.createTask(evt)
        }
      }
    };
  }

  createTask(event) {
    const businessObject = this.bpmnFactory.create('bpmn:Task');
    businessObject.type = 'system';

    const shape = this.elementFactory.create(
      'shape', {
        type: 'bpmn:Task',
        businessObject
      }
    );
    this.create.start(event, shape);
  }
}
