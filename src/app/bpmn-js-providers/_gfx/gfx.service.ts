export const GfxStock = {
  dataURLPrefix: 'data:image/svg+xml;utf8,',
  svgPolling: '' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
      '<path fill="currentColor" ' +
        'd="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 ' +
          '448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 ' +
          '200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 ' +
          '0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z" />' +
    '</svg>',
  svgEndpoint: '' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
      '<path fill="currentColor" ' +
        'd="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 ' +
          '448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200z" />' +
    '</svg>',
  svgQueue: '' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
      '<path fill="currentColor" ' +
        'd="M12.41 148.02l232.94 105.67c6.8 3.09 14.49 3.09 21.29 0l232.94-105.67c16.55-7.51 ' +
          '16.55-32.52 0-40.03L266.65 2.31a25.607 25.607 0 0 0-21.29 0L12.41 107.98c-16.55 7.51-16.55 ' +
          '32.53 0 40.04zm487.18 88.28l-58.09-26.33-161.64 73.27c-7.56 3.43-15.59 5.17-23.86 ' +
          '5.17s-16.29-1.74-23.86-5.17L70.51 209.97l-58.1 26.33c-16.55 7.5-16.55 32.5 0 40l232.94 ' +
          '105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 276.3c16.55-7.5 16.55-32.5 0-40zm0 ' +
          '127.8l-57.87-26.23-161.86 73.37c-7.56 3.43-15.59 5.17-23.86 5.17s-16.29-1.74-23.86-5.17L70.29 ' +
          '337.87 12.41 364.1c-16.55 7.5-16.55 32.5 0 40l232.94 105.59c6.8 3.08 14.49 3.08 21.29 0L499.59 ' +
          '404.1c16.55-7.5 16.55-32.5 0-40z" />' +
    '</svg>',
  svgSystem: '' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">' +
      '<path fill="currentColor" ' +
        'd="M422.19 109.95L256.21 9.07c-19.91-12.1-44.52-12.1-64.43 0L25.81 109.95c-5.32 3.23-5.29 ' +
          '11.27.06 14.46L224 242.55l198.14-118.14c5.35-3.19 5.38-11.22.05-14.46zm13.84 44.63L240 ' +
          '271.46v223.82c0 12.88 13.39 20.91 24.05 14.43l152.16-92.48c19.68-11.96 31.79-33.94 ' +
          '31.79-57.7v-197.7c0-6.41-6.64-10.43-11.97-7.25zM0 161.83v197.7c0 23.77 12.11 45.74 31.79 ' +
          '57.7l152.16 92.47c10.67 6.48 24.05-1.54 24.05-14.43V271.46L11.97 154.58C6.64 151.4 0 155.42 0 161.83z" />' +
    '</svg>',
  svgTransformer: '' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
      '<path fill="currentColor" ' +
        'd="M504.971 359.029c9.373 9.373 9.373 24.569 0 33.941l-80 79.984c-15.01 15.01-40.971 ' +
          '4.49-40.971-16.971V416h-58.785a12.004 12.004 0 0 1-8.773-3.812l-70.556-75.596 ' +
          '53.333-57.143L352 336h32v-39.981c0-21.438 25.943-31.998 40.971-16.971l80 79.981zM12 ' +
          '176h84l52.781 56.551 53.333-57.143-70.556-75.596A11.999 11.999 0 0 0 122.785 96H12c-6.627 ' +
          '0-12 5.373-12 12v56c0 6.627 5.373 12 12 12zm372 0v39.984c0 21.46 25.961 31.98 40.971 ' +
          '16.971l80-79.984c9.373-9.373 9.373-24.569 0-33.941l-80-79.981C409.943 24.021 384 34.582 ' +
          '384 56.019V96h-58.785a12.004 12.004 0 0 0-8.773 3.812L96 336H12c-6.627 0-12 5.373-12 ' +
          '12v56c0 6.627 5.373 12 12 12h110.785c3.326 0 6.503-1.381 8.773-3.812L352 176h32z" />' +
    '</svg>'
};

export const GfxDataURL = {
  polling: GfxStock.dataURLPrefix + encodeURIComponent(GfxStock.svgPolling).replace(/'/g, '%27').replace(/"/g, '%22'),
  endpoint: GfxStock.dataURLPrefix + encodeURIComponent(GfxStock.svgEndpoint).replace(/'/g, '%27').replace(/"/g, '%22'),
  queue: GfxStock.dataURLPrefix + encodeURIComponent(GfxStock.svgQueue).replace(/'/g, '%27').replace(/"/g, '%22'),
  system: GfxStock.dataURLPrefix + encodeURIComponent(GfxStock.svgSystem).replace(/'/g, '%27').replace(/"/g, '%22'),
  transformer: GfxStock.dataURLPrefix + encodeURIComponent(GfxStock.svgTransformer).replace(/'/g, '%27').replace(/"/g, '%22')
};
