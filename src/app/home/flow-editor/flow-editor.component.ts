import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FlowService } from 'src/app/_services/flow.service';

import { Modeler, OriginalPropertiesProvider, InjectionNames, OriginalPaletteProvider } from '../../_helper/bpmn-js';
import PropertiesPanelModule from 'bpmn-js-properties-panel';
import { PropertiesProvider } from '../../bpmn-js-providers/_generic/PropertiesProvider';

import { PaletteProvider } from '../../bpmn-js-providers/_generic/PaletteProvider';

import { EndpointModule } from '../../bpmn-js-providers/endpoint/module';
import { SystemModule } from '../../bpmn-js-providers/system/module';
import { QueueModule } from '../../bpmn-js-providers/queue/module';
import { TransformerModule } from '../../bpmn-js-providers/transformer/module';
import { PollingModule } from '../../bpmn-js-providers/polling/module';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReadOnly } from 'src/app/bpmn-js-providers/_generic/ReadOnly';
import { Subscription } from 'rxjs';

@Component({
  selector: 's2si-flow-editor',
  templateUrl: './flow-editor.component.html',
  styleUrls: ['./flow-editor.component.scss']
})
export class FlowEditorComponent implements OnInit, OnDestroy {

  routeSub: Subscription;
  bpmnModeler: any;
  canvasHeight = 600;
  propertiesPanelOpen = true;
  readOnly = false;

  constructor(
    private route: ActivatedRoute,
    private flowService: FlowService
  ) { }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  ngOnInit() {
    // Init BPMN Modeler
    this.initBPMN();
    this.routeSub = this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('do') !== 'edit') {
        // BPMN Readonly
        this.readOnly = true;
        this.bpmnModeler.get('readOnly').readOnly(true);
      }
      if (params.get('id') === 'new') {
        // Load empty Flow XML
        this.flowService.loadEmptyFlow().subscribe(xml => {
          this.bpmnModeler.importXML(xml, value => this.handleError(value));
        });
      } else {
        // Load Flow XML from server
        this.flowService.flowXML(params.get('id')).subscribe(xml => {
          this.bpmnModeler.importXML(xml, value => this.handleError(value));
        });
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.canvasHeight = window.innerHeight - 100;
    // Add height to bpmnjs editor
    (document.querySelector('div.bjs-container') as HTMLElement).style.height = this.canvasHeight + 'px';
  }

  wireBPMNModules(): void {
    PropertiesProvider.prototype.setFlowService(this.flowService);
  }

  initBPMN(): void {
    this.wireBPMNModules();
    this.canvasHeight = window.innerHeight - 100;
    this.bpmnModeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: this.canvasHeight + 'px',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        PropertiesPanelModule,
        { propertiesProvider: [ 'type', PropertiesProvider ] },
        { originalPaletteProvider: ['type', PaletteProvider] },
        { paletteProvider: ['type', PaletteProvider] },
        SystemModule,
        EndpointModule,
        PollingModule,
        QueueModule,
        TransformerModule,
        { readOnly: [ 'type', ReadOnly ] }
      ],
      moddleExtensions: {
        s2si: this.flowService.s2si()
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  draft(): void {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(xml);
    });
  }

  save(): void {
    this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
      console.log(xml);
    });
  }

  propsCollapse(): void {
    this.propertiesPanelOpen = false;
  }

  propsExpand(): void {
    this.propertiesPanelOpen = true;
  }
}
