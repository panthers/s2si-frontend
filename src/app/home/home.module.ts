import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';

import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatProgressBarModule,
  MatGridListModule,
  MatTableModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatTabsModule,
  MatExpansionModule,
  MatMenuModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatSliderModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatTooltipModule
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarComponent } from './avatar/avatar.component';
import { FlowsComponent } from './flows/flows.component';
import { SystemsComponent } from './systems/systems.component';
import { FlowEditorComponent } from './flow-editor/flow-editor.component';

@NgModule({
  declarations: [
    HomeComponent,
    AvatarComponent,
    LandingComponent,
    FlowsComponent,
    SystemsComponent,
    FlowEditorComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
