import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejaactivosComponent } from './pages/bandejaactivos/bandejaactivos.component';
import { RegistroCelularComponent } from './pages/registro-celular/registro-celular.component';

const routes: Routes = [
  {
    path: '',
        children: [
           {
              path: 'bandequipo',
              component: BandejaactivosComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja de Activos',
                  }
            }
            },
            {
                path: 'consultaactivos',
                component: RegistroCelularComponent,
                data: {
                    breadcrumb: {
                        label: 'Registrar Activos',
                    }
                }
            },
            {
              path: 'consultaactivos/:id',
              component: RegistroCelularComponent,
              data: {
                  breadcrumb: {
                      label: 'Registrar Activos',
                  }
              }
          },

          ],
        }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CelularRoutingModule { }
