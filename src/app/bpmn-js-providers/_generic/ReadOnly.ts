export class ReadOnly {

    static $inject = ['eventBus', 'contextPad', 'dragging', 'directEditing', 'editorActions', 'modeling', 'palette', 'paletteProvider'];

    HIGH_PRIORITY = 10001;

    private readonly eventBus: any;
    private readonly contextPad: any;
    private readonly dragging: any;
    private readonly directEditing: any;
    private readonly editorActions: any;
    private readonly modeling: any;
    private readonly palette: any;
    private readonly paletteProvider: any;
    private readOnlyState = false;

    constructor(eventBus, contextPad, dragging, directEditing, editorActions, modeling, palette, paletteProvider) {
        this.eventBus = eventBus;
        this.contextPad = contextPad;
        this.dragging = dragging;
        this.directEditing = directEditing;
        this.editorActions = editorActions;
        this.modeling = modeling;
        this.palette = palette;
        this.paletteProvider = paletteProvider;

        this.readOnlyChange();
        this.ingnoreList();
        this.throwList();
        this.interceptPalleteProvider();
    }

    readOnlyChange() {
        this.eventBus.on('readOnly.changed', this.HIGH_PRIORITY, (evt) => {
            this.readOnlyState = evt.readOnly;

            if (evt.readOnly) {
                this.directEditing.cancel();
                this.contextPad.close();
                this.dragging.cancel();
            }
            this.palette._update();
        });
    }

    intercept(obj, fnName, cb) {
        const fn = obj[fnName];
        obj[fnName] = (...args) => {
            return cb.call(this, fn, args);
        };
    }

    ignoreWhenReadOnly(obj, fnName) {
        this.intercept(obj, fnName, (fn, args) => {
            if (this.readOnlyState) {
                return;
            }
            return fn.apply(this, args);
        });
    }

    throwIfReadOnly(obj, fnName) {
        this.intercept(obj, fnName, (fn, args) => {
            if (this.readOnlyState) {
                throw new Error('model is read-only');
            }
            return fn.apply(this, args);
        });
    }

    ingnoreList() {
        this.ignoreWhenReadOnly(this.contextPad, 'open');

        this.ignoreWhenReadOnly(this.dragging, 'init');

        this.ignoreWhenReadOnly(this.directEditing, 'activate');

        this.ignoreWhenReadOnly(this.editorActions._actions, 'undo');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'redo');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'copy');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'paste');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'removeSelection');
        // BpmnEditorActions
        this.ignoreWhenReadOnly(this.editorActions._actions, 'spaceTool');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'lassoTool');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'globalConnectTool');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'distributeElements');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'alignElements');
        this.ignoreWhenReadOnly(this.editorActions._actions, 'directEditing');
    }

    throwList() {
        this.throwIfReadOnly(this.modeling, 'moveShape');
        this.throwIfReadOnly(this.modeling, 'updateAttachment');
        this.throwIfReadOnly(this.modeling, 'moveElements');
        this.throwIfReadOnly(this.modeling, 'moveConnection');
        this.throwIfReadOnly(this.modeling, 'layoutConnection');
        this.throwIfReadOnly(this.modeling, 'createConnection');
        this.throwIfReadOnly(this.modeling, 'createShape');
        this.throwIfReadOnly(this.modeling, 'createLabel');
        this.throwIfReadOnly(this.modeling, 'appendShape');
        this.throwIfReadOnly(this.modeling, 'removeElements');
        this.throwIfReadOnly(this.modeling, 'distributeElements');
        this.throwIfReadOnly(this.modeling, 'removeShape');
        this.throwIfReadOnly(this.modeling, 'removeConnection');
        this.throwIfReadOnly(this.modeling, 'replaceShape');
        this.throwIfReadOnly(this.modeling, 'pasteElements');
        this.throwIfReadOnly(this.modeling, 'alignElements');
        this.throwIfReadOnly(this.modeling, 'resizeShape');
        this.throwIfReadOnly(this.modeling, 'createSpace');
        this.throwIfReadOnly(this.modeling, 'updateWaypoints');
        this.throwIfReadOnly(this.modeling, 'reconnectStart');
        this.throwIfReadOnly(this.modeling, 'reconnectEnd');
    }

    interceptPalleteProvider() {
        this.intercept(this.paletteProvider, 'getPaletteEntries', (fn, args) => {
            const entries = fn.apply(this, args);
            if (this.readOnlyState) {
                const allowedEntries = [
                    'hand-tool'
                ];
                // forEach(entries, function(value, key) {
                //     if (allowedEntries.indexOf(key) === -1) {
                //     delete entries[key];
                //     }
                // });
            }
            return entries;
        });
    }

    readOnly(ro) {
        const newValue = !!ro;
        const oldValue = !!this.readOnlyState;

        if (ro === undefined || newValue === oldValue) {
          return oldValue;
        }

        this.readOnlyState = newValue;
        this.eventBus.fire('readOnly.changed', { readOnly: newValue });
        return newValue;
    }
}
