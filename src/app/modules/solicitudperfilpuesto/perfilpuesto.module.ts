import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { SolicitudpuestoComponent } from './pages/solicitudpuesto/solicitudpuesto.component';

import { ListaLibrosComponent } from '@modules/contra/pages/lista-contra/lista-contra.component';
import { FormContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import { NuevoContraComponent } from '@modules/contra/pages/nuevo-contra/nuevo-contra.component';
import { AdminRoutingModule } from './perfilpuesto-routing.module';


@NgModule({
  declarations: [
   /* LayoutComponent,
    ListaLibrosComponent,
    PostulanteContraComponent,
    NuevoContraComponent,
    EditarContraComponent,
    FormContraComponent,
    DialogRechazarContraComponent,
    ModalFechaComponent,
    ModalSoloFecha,
    FeedbackEntrevista,
    DialogFiltroListadoComponent,
    DashboardComponent,
    ListaHorarioComponent*/
    SolicitudpuestoComponent
  ],
  imports: [
    BreadcrumbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatNativeDateModule,
    AdminRoutingModule
  ],
  bootstrap: [FormContraComponent,NuevoContraComponent,ListaLibrosComponent,SolicitudpuestoComponent],
})
export class perfilpuestoModule { }
//solicitudperfilpuesto/solicitudpuesto
