import { Renderer } from './Renderer';
import { PaletteProvider } from './PaletteProvider';

export const QueueModule = {
  __init__: [
    'queueRenderer',
    'queuePaletteProvider'
  ],
  queueRenderer: [ 'type', Renderer ],
  queuePaletteProvider: [ 'type', PaletteProvider ]
};
