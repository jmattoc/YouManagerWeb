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
import { BandejaobjetivoComponent } from './pages/bandejaobjetivo/bandejaobjetivo.component';
import{NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import{MatDatepicker} from '@angular/material/datepicker';
//import { CelularRoutingModule } from '@modules/equipocelular/celular-routing.module';
import { RecoRoutingModule } from '@modules/reco/reco-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NewobjetivoComponent } from './pages/newobjetivo/newobjetivo.component';
import { BandejaperiodoComponent } from './pages/bandejaperiodo/bandejaperiodo.component';
import { NewperiodoComponent } from './pages/newperiodo/newperiodo.component';
import { BandejanivelComponent } from './pages/bandejanivel/bandejanivel.component';
import { NewnivelComponent } from './pages/newnivel/newnivel.component';
import { ObjetivoValorComponent } from './pages/objetivo-valor/objetivo-valor.component';
import { BandejaobjValorComponent } from './pages/bandejaobj-valor/bandejaobj-valor.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BandejaobjcumplimientoComponent } from './pages/bandejaobjcumplimiento/bandejaobjcumplimiento.component';
import { NewobjetivocumlimientoComponent } from './pages/newobjetivocumlimiento/newobjetivocumlimiento.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [

    BandejaobjetivoComponent,
    NewobjetivoComponent,
    BandejaperiodoComponent,
    NewperiodoComponent,
    BandejanivelComponent,
    NewnivelComponent,
    ObjetivoValorComponent,
    BandejaobjValorComponent,
    BandejaobjcumplimientoComponent,
    NewobjetivocumlimientoComponent,




  ],
  imports: [
    BreadcrumbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatNativeDateModule,
    RecoRoutingModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTreeModule,
    MatProgressBarModule,
    MatCheckboxModule,



  ],
  bootstrap: [FormContraComponent,BandejaobjetivoComponent,NewobjetivoComponent,BandejaperiodoComponent,
    NewperiodoComponent,BandejanivelComponent,NewnivelComponent,BandejaobjcumplimientoComponent,NewobjetivocumlimientoComponent,],
  providers: [
    DatePipe,
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class Recomodule { }
