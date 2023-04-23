import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejaAusenciaComponent } from './pages/bandeja-ausencia/bandeja-ausencia.component';
import { NewausenciaComponent } from './pages/newausencia/newausencia.component';



const routes: Routes =[
  {
    path: '',
    children: [

      {
        path: 'bandausencia',
        component: BandejaAusenciaComponent,
        data: {
            breadcrumb: {
                label: 'Módulo de Ausencias',
                        }
             }
      },
      {
        path: 'nuevasol',
        component: NewausenciaComponent,
        data: {
            breadcrumb: {
                label: 'Nueva solicitud',
                        }
             }
      },
      {
        path: 'nuevasol/:id',
        component: NewausenciaComponent,
        data: {
            breadcrumb: {
                label: 'Editar solicitud',
                        }
             }
      },

    ]
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AusenciaRoutingModule { }
