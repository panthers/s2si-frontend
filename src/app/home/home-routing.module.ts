import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { FlowsComponent } from './flows/flows.component';
import { SystemsComponent } from './systems/systems.component';
import { FlowEditorComponent } from './flow-editor/flow-editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'default'
      },
      {
        path: 'default',
        component: LandingComponent
      },
      {
        path: 'flows',
        component: FlowsComponent
      },
      {
        path: 'flows/:do/:id',
        component: FlowEditorComponent
      },
      {
        path: 'systems',
        component: SystemsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
