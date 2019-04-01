import { Renderer } from './Renderer';
import { PaletteProvider } from './PaletteProvider';

export const TransformerModule = {
  __init__: [
    'transformerRenderer',
    'transformerPaletteProvider'
  ],
  transformerRenderer: [ 'type', Renderer ],
  transformerPaletteProvider: [ 'type', PaletteProvider ]
};
