import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@core/auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "@shared/shared.module";
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedpluginModule } from './shared/fixedplugin/fixedplugin.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { MaterialModule } from './material/material.module';
import { MatSelectModule } from '@angular/material/select';
//import {DialogoConfirmacionComponent} from './shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
//import { SolicitudpuestoComponent } from './modules/solicitudperfilpuesto/pages/solicitudpuesto/solicitudpuesto.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { MatDatepicker } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BandejvacaComponent } from './modules/vaca/pages/bandejvaca/bandejvaca.component';
import { NewvacaComponent } from './modules/vaca/pages/newvaca/newvaca.component';
import { DialogHistorialAusenciaComponent } from './components/dialog-historial-ausencia/dialog-historial-ausencia.component';
import { DialogUserexistentecolaboradoresComponent } from './components/dialog-userexistentecolaboradores/dialog-userexistentecolaboradores.component';
//import { DialogVerausenciaComponent } from './components/dialog-verausencia/dialog-verausencia.component';
//import { BandejaobjetivocumplimientoComponent } from './modules/pages/bandejaobjetivocumplimiento/bandejaobjetivocumplimiento.component';
//import { NewobjetivocumplimientoComponent } from './modules/pages/newobjetivocumplimiento/newobjetivocumplimiento.component';
//import { QRCodeModule } from 'angularx-qrcode';
//import {BandejaVacacionesComponent} from './modules/vacaciones/pages/bandeja-vacaciones/bandeja-vacaciones.component';


@NgModule({
  declarations: [

    AdminLayoutComponent,
    AuthLayoutComponent,
   // DialogoConfirmacionComponent,
    AppComponent,
   DialogUserexistentecolaboradoresComponent,
  // DialogHistorialAusenciaComponent,
   // DialogVerausenciaComponent,
   // BandejvacaComponent,
    //NewvacaComponent,
    //SolicitudpuestoComponent
   // AppComponent,



  ],
  imports: [

    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,




  ],
  exports: [],
  providers: [
    /*{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
