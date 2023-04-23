import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { FormContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import { NuevoContraComponent } from '@modules/contra/pages/nuevo-contra/nuevo-contra.component';
import { ListaLibrosComponent } from '@modules/contra/pages/lista-contra/lista-contra.component';
import { SolicitudpuestoComponent } from '@modules/solicitudperfilpuesto/pages/solicitudpuesto/solicitudpuesto.component';
import { RegistroCelularComponent } from './pages/registro-celular/registro-celular.component';
import { CelularRoutingModule } from './celular-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AsignacionesComponent } from './pages/asignaciones/asignaciones.component';
import { PenalidadesComponent } from './pages/penalidades/penalidades.component';
import { BandejaactivosComponent } from './pages/bandejaactivos/bandejaactivos.component';
import{NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import{MatDatepicker} from '@angular/material/datepicker';
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
    RegistroCelularComponent,
   AsignacionesComponent,
   PenalidadesComponent,
   BandejaactivosComponent,
  ],
  imports: [
    BreadcrumbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatNativeDateModule,
    CelularRoutingModule,
    MatSelectModule,
    NgxMatSelectSearchModule,


  ],
  bootstrap: [FormContraComponent,NuevoContraComponent,ListaLibrosComponent,SolicitudpuestoComponent, RegistroCelularComponent,BandejaactivosComponent],
  providers: [
    DatePipe,
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class celularmodule { }
//solicitudperfilpuesto/solicitudpuesto
