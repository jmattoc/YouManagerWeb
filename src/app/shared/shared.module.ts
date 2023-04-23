import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table'
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule, } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { MatSelectModule } from '@angular/material/select';
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoComentarionComponent } from './components/dialogo-comentario/dialogo-comentario.component';
import { DialogoExamneMedicoComponent } from './components/dialogo-examenmedico/dialogo-examenmedico.component';

import { ProgressComponent } from './components/progress/progress.component';
import { DialogoRechazoEntrevistaComponent } from './components/dialogo-rechazoentrevista/dialogo-rechazoentrevista.component';
import { DialogPersonalComponent } from './components/dialogo-personal/dialogo-personal.component';
import { DialogNewperfilpuestoComponent } from './components/dialog-newperfilpuesto/dialog-newperfilpuesto.component';
import { DialogObservarperfilComponent } from './components/dialog-observarperfil/dialog-observarperfil.component';
import { DialogVerperfilpuestoComponent } from './components/dialog-verperfilpuesto/dialog-verperfilpuesto.component';
import { DialogEditperfilpuestoComponent } from './components/dialog-editperfilpuesto/dialog-editperfilpuesto.component';
import { DialogoConfirmaregistrocelularComponent } from './components/dialogo-confirmaregistrocelular/dialogo-confirmaregistrocelular.component';
import { DialogInicioActivoComponent } from './components/dialog-inicio-activo/dialog-inicio-activo.component';
import { DialogModalasignacionesComponent } from './components/dialog-modalasignaciones/dialog-modalasignaciones.component';
import { DialogModaldevolucionesComponent } from './components/dialog-modaldevoluciones/dialog-modaldevoluciones.component';
import { DialogConfirmarperiodoComponent } from './components/dialog-confirmarperiodo/dialog-confirmarperiodo.component';
//import { ConfirAdjAusenciaComponent } from './pages/confir-adj-ausencia/confir-adj-ausencia.component';
import { DialogConfirAdjAusenciaComponent } from './components/dialog-confir-adj-ausencia/dialog-confir-adj-ausencia.component';
import { DialogVerAusenciaComponent } from './components/dialog-ver-ausencia/dialog-ver-ausencia.component';
import { DialogObservarAusenciaComponent } from './components/dialog-observar-ausencia/dialog-observar-ausencia.component';
import { DialogReporteausenciaComponent } from './components/dialog-reporteausencia/dialog-reporteausencia.component';
import { DialogHistorialAusenciaComponent } from './components/dialog-historial-ausencia/dialog-historial-ausencia.component';
import { DialogHabilitaruserComponent } from './components/dialog-habilitaruser/dialog-habilitaruser.component';
import {MatTabsModule} from '@angular/material/tabs';
import { DialogHabilitarusercolaboradoresComponent } from './components/dialog-habilitarusercolaboradores/dialog-habilitarusercolaboradores.component';
// common-widgets.module.ts

@NgModule({
  declarations: [
    DialogPersonalComponent,
    DialogoRechazoEntrevistaComponent,
    ProgressComponent,
    DialogoExamneMedicoComponent,
    DialogoConfirmacionComponent,
    DialogoComentarionComponent,
    DialogNewperfilpuestoComponent,
    DialogObservarperfilComponent,
    DialogVerperfilpuestoComponent,
    DialogEditperfilpuestoComponent,
    DialogoConfirmaregistrocelularComponent,
    DialogInicioActivoComponent,
    DialogModalasignacionesComponent,
    DialogModaldevolucionesComponent,
    DialogConfirmarperiodoComponent,
    DialogVerAusenciaComponent,
    DialogObservarAusenciaComponent,
    DialogReporteausenciaComponent,
    DialogHistorialAusenciaComponent,
    DialogHabilitaruserComponent,
    DialogHabilitarusercolaboradoresComponent,
  ],
  imports: [
    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTabsModule
  ],
  exports: [
    DialogPersonalComponent,
    DialogoRechazoEntrevistaComponent,
    DialogoExamneMedicoComponent,
    ProgressComponent,
    DialogoConfirmacionComponent,

  ],
  providers: [

    BootstrapNotifyBarService,
    // { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class SharedModule {
}
