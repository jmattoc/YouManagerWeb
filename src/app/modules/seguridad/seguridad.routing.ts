import { Routes } from '@angular/router';
import { BandejaRolesComponent } from './pages/roles/bandeja-roles-page/bandeja-roles.component';
import { RegistroRolesComponent } from './pages/roles/registro-roles-page/registro-roles.component';
import { EditarRolesComponent } from './pages/roles/editar-roles-page/editar-roles.component';

import { BandejaUsuarioComponent } from './pages/usuario/bandeja-usuario-page/bandeja-usuario.component';
import { RegistroUsuarioComponent } from './pages/usuario/registro-usuario-page/registro-usuario.component';
import { EditarUsuarioComponent } from './pages/usuario/editar-usuario-page/editar-usuario.component';
import { FormRolesComponent } from './pages/roles/form-roles-page/form-roles-page.component';
import { BandejaAplicacionComponent } from './pages/aplicacion/bandeja-aplicacion-page/bandeja-aplicacion.component';
import { EditarAplicacionComponent } from './pages/aplicacion/editar-aplicacion-page/editar-aplicacion.component';
import { RegistroAplicacionComponent } from './pages/aplicacion/registro-aplicacion-page/registro-aplicacion.component';
import { EditarOpcionComponent } from './pages/opcion/editar-opcion-page/editar-opcion.component';
export const SeguridadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'regusuario',
        component: RegistroUsuarioComponent,
        data: {
          breadcrumb: {
            label: 'Registro de Usuario',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'editusuario/:id',
        component: EditarUsuarioComponent,
        data: {
          breadcrumb: {
            label: 'Editar Usuario',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'bandusuario',
        component: BandejaUsuarioComponent,
        data: {
          breadcrumb: {
            label: 'Bandeja de Usuario',
          }
        }
      }]
  },

  {
    path: '',
    children: [
      {
        path: 'regroles',
        component: RegistroRolesComponent,
        data: {
          breadcrumb: {
            label: 'Registro Roles',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'editroles/:id',
        component: EditarRolesComponent,
        data: {
          breadcrumb: {
            label: 'Editar Roles',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'bandroles',
        component: BandejaRolesComponent,
        data: {
          breadcrumb: {
            label: 'Bandeja de Roles',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'bandroles2',
        component: FormRolesComponent,
        data: {
          breadcrumb: {
            label: 'Bandeja de Roles',
          }
        }
      }]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'bandApp',
        component: BandejaAplicacionComponent,
        data: {
          breadcrumb: {
            label: 'Bandeja de Aplicaciones',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'regAplicacion',
        component: RegistroAplicacionComponent,
        data: {
          breadcrumb: {
            label: 'Registro Aplicación',
          }
        }
      }]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'editaplicaciones/:id',
        component: EditarAplicacionComponent,
        data: {
          breadcrumb: {
            label: 'Editar Aplicaciones',
          }
        }
      }]
  }
  ,
  {
    path: '',
    children: [
      {
        path: 'editopciones/:id',
        component: EditarOpcionComponent,
        data: {
          breadcrumb: {
            label: 'Editar Opciones / Botones',
          }
        }
      }]
  }
];
