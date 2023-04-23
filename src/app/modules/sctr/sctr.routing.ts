import { Routes } from '@angular/router';

import { BandejaSCTRComponent } from './pages/bandeja-sctr-page/bandeja-sctr.component';
import { RegistroSCTRComponent } from './pages/registro-sctr-page/registro-sctr.component';
import { EditarSCTRComponent } from './pages/editar-sctr-page/editar-sctr.component';
export const SCTRRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'regsctr',
        component: RegistroSCTRComponent,
        data: {
          breadcrumb: {
            label: 'Registro de SCTR',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'editsctr/:id',
        component: EditarSCTRComponent,
        data: {
          breadcrumb: {
            label: 'Editar SCTR',
          }
        }
      }]
  },
  {
    path: '',
    children: [
      {
        path: 'solicitudsctr',
        component: BandejaSCTRComponent,
        data: {
          breadcrumb: {
            label: 'Bandeja de SCTR',
          }
        }
      }]
  },

 
];
