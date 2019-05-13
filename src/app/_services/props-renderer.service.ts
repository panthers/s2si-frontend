import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropsRendererService {

  constructor() { }

  /**
   * The label factory provides a label entry. For the label text
   * it expects either a string provided by the options.labelText
   * parameter or it could be generated programmatically using a
   * function passed as the options.get parameter.
   *
   * @param options type object
   * @param options.id type string
   * @param options.pText type string supports new lines as well
   * @param options.get type function
   * @param options.showLabel type function
   * @param options.divider type boolean, adds a divider at the top of the label if true; default: false
   */
  public paragraph(options): any {
    return {
        id: options.id,
        html: '<label data-value="label" ' +
                'data-show="showLabel" ' +
                'class="entry-label entry-para' + (options.divider ? ' divider' : '') + '">' +
              '</label>',
        get: (element, node) => {
          if (typeof options.get === 'function') {
            return options.get(element, node);
          }
          return { label: options.pText };
        },
        showLabel: (element, node) => {
          if (typeof options.showLabel === 'function') {
            return options.showLabel(element, node);
          }
          return true;
        }
    };
  }
}
