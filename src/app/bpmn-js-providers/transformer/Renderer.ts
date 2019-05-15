import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { append as svgAppend, create as svgCreate, attr as svgAttr, innerSVG } from 'tiny-svg';
import { GfxDataURL } from '../_gfx/gfx.service';

export class Renderer extends BaseRenderer {

    static $inject = ['eventBus', 'bpmnRenderer'];

    constructor(eventBus, bpmnRenderer) {
        super(eventBus, 1500);
    }

    canRender(element) {
        if (!is(element, 'bpmn:Task')) {
            return;
        }
        const businessObject = getBusinessObject(element);
        return businessObject.type === 'transformer';
    }

    drawShape(parent, shape) {
        const gfxSvg: any = svgCreate('image', {
            x: 0,
            y: 0,
            width: shape.width,
            height: shape.height,
            href: GfxDataURL.transformer
        });
        svgAppend(parent, gfxSvg);
        this.elementLabel(parent);
        return gfxSvg;
    }

    elementLabel(parent) {
        const text: any = svgCreate('text');
        svgAttr(text, {
            x: '0',
            y: '95',
            fontFamily: 'Roboto, "Helvetica Neue", sans-serif',
            fontSize: 12
        });
        innerSVG(text, 'Transformer');
        svgAppend(parent, text);
    }

}
