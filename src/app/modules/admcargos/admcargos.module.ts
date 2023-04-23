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
//import { BandejacargosComponent } from '@modules/admcargos/pages/bandejacargos/bandejacargos.component';
//import {CargosComponent} from '@modules/admcargos/pages/cargos/cargos.component';
//import { CargosComponent } from './pages/cargos/cargos.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CelularRoutingModule } from '@modules/equipocelular/celular-routing.module';
import { AdminRoutingModule } from './admcargos-routing.module';

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
    /*CargosComponent,
    BandejacargosComponent,*/


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
    AdminRoutingModule
  ],
  bootstrap: [FormContraComponent,NuevoContraComponent,ListaLibrosComponent,SolicitudpuestoComponent],
  providers: [
    DatePipe,
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class admincargosmodule { }

