import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../material/material.module';
import { AdminRoutingModule } from './contra-routing.module';
import { ListaLibrosComponent } from './pages/lista-contra/lista-contra.component';
import { NuevoContraComponent } from './pages/nuevo-contra/nuevo-contra.component';
import { PostulanteContraComponent, EditarContraComponent, FeedbackEntrevista, ModalSoloFecha } from './pages/editar-contra/editar-contra.component';
import { DialogRechazarContraComponent, FormContraComponent } from './pages/form-contra/form-contra.component';
import {MatNativeDateModule} from '@angular/material/core';
import { ModalFechaComponent } from './pages/modal-fecha/modal-fecha.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListaHorarioComponent } from './pages/lista-horario/lista-horario.component';
import {BreadcrumbModule} from 'xng-breadcrumb';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {SharedModule} from '@shared/shared.module';
import { DatePipe } from '@angular/common';
import { StepTabService } from './services/StepTabService';

@NgModule({
  declarations: [  
    ListaLibrosComponent,
    PostulanteContraComponent,
    NuevoContraComponent,
    EditarContraComponent,
    FormContraComponent,
    DialogRechazarContraComponent,
    ModalFechaComponent,
    ModalSoloFecha,
    FeedbackEntrevista,   
    DashboardComponent,
    ListaHorarioComponent
  ],
  imports: [
    SharedModule,
    NgxDropzoneModule,
    BreadcrumbModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    MatNativeDateModule,
    AdminRoutingModule
  ],
  bootstrap: [FormContraComponent,NuevoContraComponent,ListaLibrosComponent,],  
  providers: [  
    DatePipe,
    StepTabService
    // { provide: SnackBarService, useValue: {} },
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class ContraModule { }
