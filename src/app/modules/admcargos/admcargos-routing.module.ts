import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BandejacargosComponent } from './pages/bandejacargos/bandejacargos.component';
import { CargosComponent } from './pages/cargos/cargos.component';

 const routes: Routes = [
   /*{
    path: '',
        children: [
            {
                path: 'cargos',
                component: CargosComponent,
                data: {
                    breadcrumb: {
                        label: 'Bandeja Cargos',
                    }
                }
            },
            {
              path: 'bandejacargos',
              component: BandejacargosComponent,
              data: {
                  breadcrumb: {
                      label: 'Registrar Cargos',
                  }
              }
          },
          ],
  },*/

 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
