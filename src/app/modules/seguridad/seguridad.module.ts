import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { SeguridadRoutes } from './seguridad.routing';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { BreadcrumbModule } from 'xng-breadcrumb';

import { BandejaRolesComponent } from './pages/roles/bandeja-roles-page/bandeja-roles.component';
import { RegistroRolesComponent } from './pages/roles/registro-roles-page/registro-roles.component';
import { FormRolesComponent } from './pages/roles/form-roles-page/form-roles-page.component';
import { EditarRolesComponent } from './pages/roles/editar-roles-page/editar-roles.component';

import { BandejaUsuarioComponent } from './pages/usuario/bandeja-usuario-page/bandeja-usuario.component';
import { RegistroUsuarioComponent } from './pages/usuario/registro-usuario-page/registro-usuario.component';
import { FormUsuarioComponent } from './pages/usuario/form-usuario-page/form-usuario-page.component';
import { EditarUsuarioComponent } from './pages/usuario/editar-usuario-page/editar-usuario.component';
import { BandejaAplicacionComponent } from './pages/aplicacion/bandeja-aplicacion-page/bandeja-aplicacion.component';
import { EditarAplicacionComponent } from './pages/aplicacion/editar-aplicacion-page/editar-aplicacion.component';
import { RegistroAplicacionComponent } from './pages/aplicacion/registro-aplicacion-page/registro-aplicacion.component';
import { FormAplicacionComponent } from './pages/aplicacion/form-aplicacion-page/form-aplicacion-page.component';
import { EditarOpcionComponent } from './pages/opcion/editar-opcion-page/editar-opcion.component';
import { FormOpcionComponent } from './pages/opcion/form-opcion-page/form-opcion-page.component';
import { StepTabService } from '@modules/contra/services/StepTabService';
import { ModuloDelSistemaComponent } from './pages/opcion/modulo-del-sistema/modulo-del-sistema.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    BreadcrumbModule,
    MaterialModule,
    MatInputModule,
    CommonModule,
    RouterModule.forChild(SeguridadRoutes),
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    StepTabService
  ],
  declarations: [
    FormRolesComponent,
    EditarRolesComponent,
    EditarUsuarioComponent,
    FormUsuarioComponent,
    BandejaRolesComponent,
    BandejaUsuarioComponent,
    RegistroRolesComponent,
    RegistroUsuarioComponent,
    FormAplicacionComponent,
    BandejaAplicacionComponent,
    EditarAplicacionComponent,
    RegistroAplicacionComponent,
    FormOpcionComponent,
    EditarOpcionComponent,
    ModuloDelSistemaComponent
  ]
})

export class SeguridadModule { }
