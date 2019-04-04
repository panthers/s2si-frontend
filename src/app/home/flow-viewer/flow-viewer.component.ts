import { Component, OnInit, HostListener } from '@angular/core';
import { FlowService } from 'src/app/_services/flow.service';

import { Viewer, OriginalPropertiesProvider, InjectionNames, OriginalPaletteProvider } from '../../_helper/bpmn-js';
import PropertiesPanelModule from 'bpmn-js-properties-panel';
import PropertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/bpmn';

import { PaletteProvider } from '../../bpmn-js-providers/generic/PaletteProvider';

import { EndpointModule } from '../../bpmn-js-providers/endpoint/module';
import { SystemModule } from '../../bpmn-js-providers/system/module';
import { QueueModule } from '../../bpmn-js-providers/queue/module';
import { TransformerModule } from '../../bpmn-js-providers/transformer/module';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 's2si-flow-viewer',
  templateUrl: './flow-viewer.component.html',
  styleUrls: ['./flow-viewer.component.scss']
})
export class FlowViewerComponent implements OnInit {

  bpmnViewer: any;
  canvasHeight = 600;

  constructor(
    private route: ActivatedRoute,
    private flowService: FlowService
  ) { }

  ngOnInit() {
    this.onResize();
    this.bpmnViewer = new Viewer({
      container: '#canvas',
      width: '100%',
      height: this.canvasHeight + 'px',
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
        s2si: this.flowService.s2si()
      }
    });
    // Check if new or not
    this.route.paramMap.subscribe(
      (params: ParamMap) => {
        if (params.get('id') === 'new') {
          this.flowService.loadEmptyFlow().subscribe(xml => {
            this.bpmnViewer.importXML(xml, value => this.handleError(value));
          });
        } else {
          this.flowService.flowXML(params.get('id')).subscribe(xml => {
            this.bpmnViewer.importXML(xml, value => this.handleError(value));
          });
        }
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.canvasHeight = window.innerHeight - 100;
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }
}
