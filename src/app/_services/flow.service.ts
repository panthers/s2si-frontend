import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  s2siPackage = {
    name: 'S2SI',
    uri: 'http://s2si.com',
    prefix: 's2si',
    xml: {
      tagAlias: 'lowerCase'
    },
    types: [
      {
        name: 'Process attributes',
        extends: [ 'bpmn:Process' ],
        properties: [
          {
            name: 'fname',
            isAttr: true,
            type: 'String'
          },
          {
            name: 'fdesc',
            isAttr: true,
            type: 'String'
          }
        ]
      },
      {
        name: 'Task attributes',
        extends: [ 'bpmn:Task' ],
        properties: [
          {
            name: 'type',
            isAttr: true,
            type: 'String'
          }
        ]
      },
      {
        name: 'QueueDetails',
        superClass: [ 'Element' ],
        properties: [
          {
            name: 'qname',
            isAttr: true,
            type: 'String'
          }
        ]
      },
      {
        name: 'SystemDetails',
        superClass: [ 'Element' ],
        properties: [
          {
            name: 'sysref',
            isAttr: true,
            type: 'String'
          }
        ]
      },
      {
        name: 'TransformerDetails',
        superClass: [ 'Element' ],
        properties: [
          {
            name: 'type',
            isAttr: true,
            type: 'String'
          },
          {
            name: 'xslt',
            isMany: true,
            type: 'xslt'
          }
        ]
      },
      {
        name: 'xslt',
        properties: [
          {
            name: 'text',
            isBody: true,
            type: 'String'
          }
        ]
      }
    ],
    emumerations: [],
    associations: []
  };

  initialDiagram = '' +
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
        'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
        'targetNamespace="http://bpmn.io/schema/bpmn" ' +
        'id="Definitions_1">' +
    '<bpmn:process id="Process_1" isExecutable="false" s2si:fname="New flow">' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

  flowid1 = '' +
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
        'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" ' +
        'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" ' +
        'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" ' +
        'xmlns:s2si="http://s2si.com" ' +
        'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" ' +
        'id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' +
    '<bpmn:process id="Process_1" isExecutable="false" s2si:fname="abcd">' +
      '<bpmn:task id="Task_0m3ifup" s2si:type="system">' +
        '<bpmn:outgoing>SequenceFlow_09ag6c3</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_1spa6wh" s2si:type="endpoint">' +
        '<bpmn:incoming>SequenceFlow_09ag6c3</bpmn:incoming>' +
        '<bpmn:outgoing>SequenceFlow_0nvp4f3</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_1nck76a" s2si:type="queue">' +
        '<bpmn:incoming>SequenceFlow_0nvp4f3</bpmn:incoming>' +
        '<bpmn:outgoing>SequenceFlow_1adwqf9</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_0eeuppq" s2si:type="transformer">' +
        '<bpmn:incoming>SequenceFlow_1adwqf9</bpmn:incoming>' +
        '<bpmn:outgoing>SequenceFlow_1qoeo78</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_0uo2la1" s2si:type="system">' +
        '<bpmn:incoming>SequenceFlow_1qoeo78</bpmn:incoming>' +
      '</bpmn:task>' +
      '<bpmn:sequenceFlow id="SequenceFlow_09ag6c3" sourceRef="Task_0m3ifup" targetRef="Task_1spa6wh" />' +
      '<bpmn:sequenceFlow id="SequenceFlow_0nvp4f3" sourceRef="Task_1spa6wh" targetRef="Task_1nck76a" />' +
      '<bpmn:sequenceFlow id="SequenceFlow_1adwqf9" sourceRef="Task_1nck76a" targetRef="Task_0eeuppq" />' +
      '<bpmn:sequenceFlow id="SequenceFlow_1qoeo78" sourceRef="Task_0eeuppq" targetRef="Task_0uo2la1" />' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="Task_0m3ifup_di" bpmnElement="Task_0m3ifup">' +
          '<dc:Bounds x="90" y="53" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_1spa6wh_di" bpmnElement="Task_1spa6wh">' +
          '<dc:Bounds x="232" y="53" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_1nck76a_di" bpmnElement="Task_1nck76a">' +
          '<dc:Bounds x="232" y="187" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_0eeuppq_di" bpmnElement="Task_0eeuppq">' +
          '<dc:Bounds x="431" y="187" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_0uo2la1_di" bpmnElement="Task_0uo2la1">' +
          '<dc:Bounds x="431" y="53" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_09ag6c3_di" bpmnElement="SequenceFlow_09ag6c3">' +
          '<di:waypoint x="190" y="93" />' +
          '<di:waypoint x="232" y="93" />' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_0nvp4f3_di" bpmnElement="SequenceFlow_0nvp4f3">' +
          '<di:waypoint x="282" y="133" />' +
          '<di:waypoint x="282" y="187" />' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_1adwqf9_di" bpmnElement="SequenceFlow_1adwqf9">' +
          '<di:waypoint x="332" y="227" />' +
          '<di:waypoint x="431" y="227" />' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_1qoeo78_di" bpmnElement="SequenceFlow_1qoeo78">' +
          '<di:waypoint x="481" y="187" />' +
          '<di:waypoint x="481" y="133" />' +
        '</bpmndi:BPMNEdge>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

  flowid2 = '' +
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' +
      'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"' +
      'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"' +
      'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"' +
      'xmlns:s2si="http://s2si.com"' +
      'xmlns:di="http://www.omg.org/spec/DD/20100524/DI"' +
      'id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">' +
    '<bpmn:process id="Process_1" isExecutable="false">' +
      '<bpmn:task id="Task_1vtnpyg" s2si:type="system">' +
        '<bpmn:incoming>SequenceFlow_0dly2xz</bpmn:incoming>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_0n7hv6t" s2si:type="endpoint">' +
        '<bpmn:outgoing>SequenceFlow_0dly2xz</bpmn:outgoing>' +
        '<bpmn:outgoing>SequenceFlow_0x1zg15</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_0h945tw" s2si:type="transformer">' +
        '<bpmn:incoming>SequenceFlow_0x1zg15</bpmn:incoming>' +
        '<bpmn:outgoing>SequenceFlow_0bbsdf1</bpmn:outgoing>' +
      '</bpmn:task>' +
      '<bpmn:task id="Task_1t4iz51" s2si:type="system">' +
        '<bpmn:incoming>SequenceFlow_0bbsdf1</bpmn:incoming>' +
      '</bpmn:task>' +
      '<bpmn:sequenceFlow id="SequenceFlow_0dly2xz" sourceRef="Task_0n7hv6t" targetRef="Task_1vtnpyg" />' +
      '<bpmn:sequenceFlow id="SequenceFlow_0x1zg15" sourceRef="Task_0n7hv6t" targetRef="Task_0h945tw" />' +
      '<bpmn:sequenceFlow id="SequenceFlow_0bbsdf1" sourceRef="Task_0h945tw" targetRef="Task_1t4iz51" />' +
    '</bpmn:process>' +
    '<bpmndi:BPMNDiagram id="BPMNDiagram_1">' +
      '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">' +
        '<bpmndi:BPMNShape id="Task_1vtnpyg_di" bpmnElement="Task_1vtnpyg">' +
          '<dc:Bounds x="106" y="60" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_0n7hv6t_di" bpmnElement="Task_0n7hv6t">' +
          '<dc:Bounds x="293" y="60" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_0h945tw_di" bpmnElement="Task_0h945tw">' +
          '<dc:Bounds x="293" y="192" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNShape id="Task_1t4iz51_di" bpmnElement="Task_1t4iz51">' +
          '<dc:Bounds x="490" y="192" width="100" height="80" />' +
        '</bpmndi:BPMNShape>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_0dly2xz_di" bpmnElement="SequenceFlow_0dly2xz">' +
          '<di:waypoint x="293" y="100" />' +
          '<di:waypoint x="206" y="100" />' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_0x1zg15_di" bpmnElement="SequenceFlow_0x1zg15">' +
          '<di:waypoint x="343" y="140" />' +
          '<di:waypoint x="343" y="192" />' +
        '</bpmndi:BPMNEdge>' +
        '<bpmndi:BPMNEdge id="SequenceFlow_0bbsdf1_di" bpmnElement="SequenceFlow_0bbsdf1">' +
          '<di:waypoint x="393" y="232" />' +
          '<di:waypoint x="490" y="232" />' +
        '</bpmndi:BPMNEdge>' +
      '</bpmndi:BPMNPlane>' +
    '</bpmndi:BPMNDiagram>' +
  '</bpmn:definitions>';

  public flowNameEmitter: EventEmitter<string>;

  constructor() {
    this.flowNameEmitter = new EventEmitter();
  }

  s2si(): any {
    return this.s2siPackage;
  }

  loadEmptyFlow(): Observable<string> {
    return of(this.initialDiagram);
  }

  flowXML(id: string): Observable<string> {
    if (id === 'flowid1') {
      return of(this.flowid1);
    } else if (id === 'flowid2') {
      return of(this.flowid2);
    } else {
      // Put http code here, until then return empty flow xml
      return this.loadEmptyFlow();
    }
  }

  /**
   * Get or Create ExtensionElements and details under the specified element.
   */
  getOrCreateExtensionElementsAndDetails(element, type, bpmnFactory, modeling) {

    const bo = element.businessObject;
    let extensionElements = bo.extensionElements;

    // add extension elements
    if (!extensionElements) {
      extensionElements = bpmnFactory.create('bpmn:ExtensionElements', {
        values: [ bpmnFactory.create(type) ]
      });
      modeling.updateProperties(element, {
        extensionElements
      });
    } else {
      const detail = extensionElements.values.filter((extensionElement) => {
        return is(extensionElement, type);
      })[0];
      if (!detail) {
        extensionElements.values.push(bpmnFactory.create(type));
        modeling.updateProperties(element, {
          extensionElements
        });
      }
    }
    return extensionElements;
  }

  /**
   * Get Extension Element for the specified type.
   */
  getExtensionElements(bo, type) {
    if (!bo.extensionElements) {
      return;
    }
    return bo.extensionElements.values.filter((extensionElement) => {
      return is(extensionElement, type);
    })[0];
  }

  /**
   * Set Extension Element attribute for the specified type.
   */
  setDetailAttribute(ele, type, attr, val, modeling) {
    const bo = getBusinessObject(ele);
    if (!bo.extensionElements) {
      return;
    }
    const detail = bo.extensionElements.values.filter((extensionElement) => {
      return is(extensionElement, type);
    })[0];
    if (!detail) {
      return;
    }
    detail[attr] = val;
    modeling.updateProperties(ele, {
      extensionElements: bo.extensionElements
    });
  }

  /**
   * Set Extension Element text value for the specified type.
   */
  setDetailText(ele, type, node, nodeType, val, bpmnFactory, modeling) {
    const bo = getBusinessObject(ele);
    if (!bo.extensionElements) {
      return;
    }
    const detail = bo.extensionElements.values.filter((extensionElement) => {
      return is(extensionElement, type);
    })[0];
    if (!detail) {
      return;
    }
    detail[node] = [
      bpmnFactory.create(nodeType, { text: val })
    ];
    modeling.updateProperties(ele, {
      extensionElements: bo.extensionElements
    });
  }

  /**
   * Set Extension Element text value for the specified type.
   */
  getDetailText(ele, type, node, nodeType) {
    const text = '';
    const bo = getBusinessObject(ele);
    if (!bo.extensionElements) {
      return text;
    }
    const detail = bo.extensionElements.values.filter((extensionElement) => {
      return is(extensionElement, type);
    })[0];
    if (!detail) {
      return text;
    }
    if (!detail[node]) {
      return text;
    }
    const textEle = detail[node].filter((nd) => {
      return is(nd, nodeType);
    })[0];
    if (!textEle) {
      return text;
    }
    return textEle.text;
  }

  /**
   * eventBus handlers
   */
  rootAdded(event: any): void {
    const element = event.element;
    if (is(element, 'bpmn:Process') && getBusinessObject(element).fname) {
      this.flowNameEmitter.emit(getBusinessObject(element).fname);
    }
  }

  elementsChanged(event: any): void {
    event.elements.forEach(element => {
      if (is(element, 'bpmn:Process') && getBusinessObject(element).fname) {
        this.flowNameEmitter.emit(getBusinessObject(element).fname);
      }
    });
  }

  getTransformerTypes(): any {
    const types = [];
    types.push({ value: '', name: 'Select a value'});
    types.push({ value: 'XSLT', name: 'XSLT Transformer'});
    return types;
  }

  /**
   * Write all synchronous jQuery calls below, someday will come when we will change this.
   * jQuery yuckkk, synchronous yuckkk
   */
  getSystemsInSyncMode(): any {
    const systems = [];
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos/1',
      method : 'GET',
      success: (result) => {
        systems.push({ value: '', name: 'Select a value'});
        systems.push({ value: 'one', name: 'one'});
        systems.push({ value: 'two', name: 'two' });
      },
      async: false
    });
    return systems;
  }
}
