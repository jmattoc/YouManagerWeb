import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import {MatNativeDateModule} from '@angular/material/core';
//import {BreadcrumbModule} from 'xng-breadcrumb';
import { FormContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import { NuevoContraComponent } from '@modules/contra/pages/nuevo-contra/nuevo-contra.component';
import { ListaLibrosComponent } from '@modules/contra/pages/lista-contra/lista-contra.component';
import { SolicitudpuestoComponent } from '@modules/solicitudperfilpuesto/pages/solicitudpuesto/solicitudpuesto.component';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CelularRoutingModule } from '@modules/equipocelular/celular-routing.module';
import {AdminRoutingModule} from './admin-routing.module';
import {BreadcrumbModule} from 'xng-breadcrumb';
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {CargosComponent} from './pages/cargos/cargos.component';

import { NewcategoriaComponent } from './pages/newcategoria/newcategoria.component';
import { NewcargosComponent } from './pages/newcargos/newcargos.component';
import { TipotrabajadorComponent } from './pages/tipotrabajador/tipotrabajador.component';
import { NewtipotrabajadorComponent } from './pages/newtipotrabajador/newtipotrabajador.component';
import { TipocontratoComponent } from './pages/tipocontrato/tipocontrato.component';
import { NewtipocontratoComponent } from './pages/newtipocontrato/newtipocontrato.component';
import { ModalidadtrabajoComponent } from './pages/modalidadtrabajo/modalidadtrabajo.component';
import { NewmodalidadtrabajoComponent } from './pages/newmodalidadtrabajo/newmodalidadtrabajo.component';
import { HorariotrabajoComponent } from './pages/horariotrabajo/horariotrabajo.component';
import { NewhorariotrabajoComponent } from './pages/newhorariotrabajo/newhorariotrabajo.component';
import { CentrocostoComponent } from './pages/centrocosto/centrocosto.component';
import { NewcentrocostoComponent } from './pages/newcentrocosto/newcentrocosto.component';
//import { newcargosComponent } from './pages/newcargos/newcargos.component';
//import { MatDatepicker } from '@angular/material/datepicker';
//import{NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';




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
    CategoriasComponent,
    CargosComponent,
    NewcategoriaComponent,
    NewcargosComponent,
    TipotrabajadorComponent,
    NewtipotrabajadorComponent,
    TipocontratoComponent,
    NewtipocontratoComponent,
    ModalidadtrabajoComponent,
    NewmodalidadtrabajoComponent,
    HorariotrabajoComponent,
    NewhorariotrabajoComponent,
    CentrocostoComponent,
    NewcentrocostoComponent,




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
    AdminRoutingModule,
    NgxMaterialTimepickerModule
  ],
  bootstrap: [FormContraComponent,NuevoContraComponent,ListaLibrosComponent,SolicitudpuestoComponent,CategoriasComponent,CargosComponent,NewcategoriaComponent,NewcargosComponent,TipotrabajadorComponent,NewtipotrabajadorComponent,TipocontratoComponent,NewtipocontratoComponent,
    ModalidadtrabajoComponent,NewmodalidadtrabajoComponent,
    HorariotrabajoComponent,NewhorariotrabajoComponent,
    CentrocostoComponent,NewcentrocostoComponent, ModalidadtrabajoComponent,
    NewmodalidadtrabajoComponent,
    HorariotrabajoComponent,
    NewhorariotrabajoComponent,
    CentrocostoComponent,
    NewcentrocostoComponent, ],
  providers: [
    DatePipe,
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class adminModule { }

