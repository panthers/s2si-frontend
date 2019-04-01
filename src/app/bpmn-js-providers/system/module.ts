import { Renderer } from './Renderer';
import { PaletteProvider } from './PaletteProvider';

export const SystemModule = {
  __init__: [
    'systemRenderer',
    'systemPaletteProvider'
  ],
  systemRenderer: [ 'type', Renderer ],
  systemPaletteProvider: [ 'type', PaletteProvider ]
};
