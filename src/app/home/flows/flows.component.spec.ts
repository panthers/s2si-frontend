import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowsComponent } from './flows.component';
import { AppMaterialModuleForSpec } from 'src/app/app-material-for-spec.module';

describe('FlowsComponent', () => {
  let component: FlowsComponent;
  let fixture: ComponentFixture<FlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppMaterialModuleForSpec ],
      declarations: [ FlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
