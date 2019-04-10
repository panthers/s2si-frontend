import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import { append as svgAppend, create as svgCreate } from 'tiny-svg';
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
        return businessObject.type === 'polling';
    }

    drawShape(parent, shape) {
        const gfxSvg: any = svgCreate('image', {
            x: 0,
            y: 0,
            width: shape.width,
            height: shape.height,
            href: GfxDataURL.polling
        });
        svgAppend(parent, gfxSvg);
        return gfxSvg;
    }

}
