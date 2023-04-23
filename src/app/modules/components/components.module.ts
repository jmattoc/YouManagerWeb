import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MaterialModule } from '../app.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { ComponentsRoutes } from './components.routing';
import { GridSystemComponent } from './grid/grid.component';
import { IconsComponent } from './icons/icons.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PanelsComponent } from './panels/panels.component';
import { SweetAlertComponent } from './sweetalert/sweetalert.component';
import { TypographyComponent } from './typography/typography.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {  MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from "@angular/material/datepicker";

import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  imports: [
    MatInputModule,
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
    //MaterialModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
      ButtonsComponent,
      GridSystemComponent,
      IconsComponent,
      NotificationsComponent,
      PanelsComponent,
      SweetAlertComponent,
      TypographyComponent
  ]
})

export class ComponentsModule {}
