import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudpuestoComponent } from './pages/solicitudpuesto/solicitudpuesto.component';


const routes: Routes = [
  {
    path: '',
        children: [
            {
                path: 'puesto',
                component: SolicitudpuestoComponent,
                data: {
                    breadcrumb: {
                        label: 'Perfil puesto',
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
export class AdminRoutingModule { }
