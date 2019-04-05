import { Renderer } from './Renderer';
import { PaletteProvider } from './PaletteProvider';

export const PollingModule = {
  __init__: [
    'pollingRenderer',
    'pollingPaletteProvider'
  ],
  pollingRenderer: [ 'type', Renderer ],
  pollingPaletteProvider: [ 'type', PaletteProvider ]
};
