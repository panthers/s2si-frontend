import { Renderer } from './Renderer';
import { PaletteProvider } from './PaletteProvider';

export const EndpointModule = {
  __init__: [
    'endpointRenderer',
    'endpointPaletteProvider'
  ],
  endpointRenderer: [ 'type', Renderer ],
  endpointPaletteProvider: [ 'type', PaletteProvider ]
};
