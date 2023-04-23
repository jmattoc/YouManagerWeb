import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SCTRRoutes } from './sctr.routing';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BandejaSCTRComponent } from './pages/bandeja-sctr-page/bandeja-sctr.component';
import { RegistroSCTRComponent } from './pages/registro-sctr-page/registro-sctr.component';
import { FormSCTRComponent } from './pages/form-sctr-page/form-sctr-page.component';
import { EditarSCTRComponent } from './pages/editar-sctr-page/editar-sctr.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  imports: [
    NgxDropzoneModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MaterialModule,
    MatInputModule,
    CommonModule,
    RouterModule.forChild(SCTRRoutes),
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [   
    EditarSCTRComponent,
    FormSCTRComponent,   
    BandejaSCTRComponent,   
    RegistroSCTRComponent
  ]
})

export class SeguridadModule { }
