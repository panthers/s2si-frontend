import { IPalette, IPaletteProvider } from '../../_helper/bpmn-js';

export class PaletteProvider implements IPaletteProvider {

  static $inject = ['palette', 'create', 'elementFactory', 'bpmnFactory'];

  private readonly create: any;
  private readonly elementFactory: any;
  private readonly bpmnFactory: any;

  // Note that names of arguments must match injected modules, see InjectionNames.
  // I don't know why originalPaletteProvider matters but it breaks if it isn't there.
  // I guess since this component is injected, and it requires an instance of originalPaletteProvider,
  // originalPaletteProvider will be new'ed and thus call palette.registerProvider for itself.
  // There probably is a better way.
  constructor(private palette: IPalette, create, elementFactory, bpmnFactory) {
    // console.log(this.constructor.name, "constructing", palette, originalPaletteProvider);
    palette.registerProvider(this);
    this.create = create;
    this.elementFactory = elementFactory;
    this.bpmnFactory = bpmnFactory;
  }

  getPaletteEntries() {
    return { };
  }

}
