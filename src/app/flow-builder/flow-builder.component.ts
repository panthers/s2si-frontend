import { Component, OnInit } from '@angular/core';

import { Modeler, OriginalPropertiesProvider, InjectionNames, OriginalPaletteProvider } from '../_helper/bpmn-js';
import PropertiesPanelModule from 'bpmn-js-properties-panel';
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';
import { FlowService } from '../_services/flow.service';

import { PaletteProvider } from '../bpmn-js-providers/generic/PaletteProvider';

import { EndpointModule } from '../bpmn-js-providers/endpoint/module';
import { SystemModule } from '../bpmn-js-providers/system/module';
import { QueueModule } from '../bpmn-js-providers/queue/module';
import { TransformerModule } from '../bpmn-js-providers/transformer/module';

const s2siPackage = {
  name: 'S2SI',
  uri: 'http://s2si.com',
  prefix: 's2si',
  xml: {
    tagAlias: 'lowerCase'
  },
  types: [
    {
      name: 'Type',
      extends: [ 'bpmn:Task' ],
      properties: [
        {
          name: 'type',
          isAttr: true,
          type: 'String'
        }
      ]
    }
  ],
  emumerations: [],
  associations: []
};

@Component({
  selector: 's2si-flow-builder',
  templateUrl: './flow-builder.component.html',
  styleUrls: ['./flow-builder.component.scss']
})
export class FlowBuilderComponent implements OnInit {

  modeler: any;

  constructor(
    private flowService: FlowService
  ) { }

  ngOnInit() {
    console.log(s2siPackage);
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        PropertiesPanelModule,
        // Re-use original bpmn-properties-module, see CustomPropsProvider
        { propertiesProvider: ['type', OriginalPropertiesProvider.propertiesProvider[1]] },
        // Re-use original palette, see CustomPaletteProvider
        { originalPaletteProvider: ['type', PaletteProvider] },
        { paletteProvider: ['type', PaletteProvider] },
        // { endpointPaletteProvider: ['type', EndpointPaletteProvider] },
        EndpointModule,
        SystemModule,
        QueueModule,
        TransformerModule
      ],
      moddleExtensions: {
        s2si: s2siPackage
      }
    });
    this.flowService.loadEmptyFlow().subscribe(xml => {
      this.modeler.importXML(xml, value => this.handleError(value));
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  printXML() {
    this.modeler.saveXML({ format: true }, (err, xml) => {
      console.log(xml);
    });
  }

}
