import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { FormContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import{NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import{MatDatepicker} from '@angular/material/datepicker';
//import { CelularRoutingModule } from '@modules/equipocelular/celular-routing.module';
import { RecoRoutingModule } from '@modules/reco/reco-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BandejaobjetivoComponent } from '@modules/reco/pages/bandejaobjetivo/bandejaobjetivo.component';
import { NewobjetivoComponent } from '@modules/reco/pages/newobjetivo/newobjetivo.component';
import { BandejaperiodoComponent } from '@modules/reco/pages/bandejaperiodo/bandejaperiodo.component';
import { NewperiodoComponent } from '@modules/reco/pages/newperiodo/newperiodo.component';
import { BandejanivelComponent } from '@modules/reco/pages/bandejanivel/bandejanivel.component';
import { NewnivelComponent } from '@modules/reco/pages/newnivel/newnivel.component';
import { BandejaobjcumplimientoComponent } from '@modules/reco/pages/bandejaobjcumplimiento/bandejaobjcumplimiento.component';
import { NewobjetivocumlimientoComponent } from '@modules/reco/pages/newobjetivocumlimiento/newobjetivocumlimiento.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {SharedModule} from '@shared/shared.module';
import {BandejacolaboradoresComponent} from './pages/bandejacolaboradores/bandejacolaboradores.component';
import { ColaboradoresRoutingModule } from './Colaboradores-routing.module';



@NgModule({
  declarations: [
    BandejacolaboradoresComponent

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
    NgxDropzoneModule,
    SharedModule,
    ColaboradoresRoutingModule,


  ],
  bootstrap: [FormContraComponent,BandejaobjetivoComponent,NewobjetivoComponent,BandejaperiodoComponent,
    NewperiodoComponent,BandejanivelComponent,NewnivelComponent,BandejaobjcumplimientoComponent,NewobjetivocumlimientoComponent,BandejacolaboradoresComponent,
    ],
  providers: [
    DatePipe,
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class Colaboradoresmodule { }
