import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImphistorialAusenciaComponent } from './pages/imphistorial-ausencia/imphistorial-ausencia.component';

const routes: Routes =[
  {
    path: '',
    children:[
      {
        path: 'imprmirAusencia',
        component: ImphistorialAusenciaComponent,
        data: {
            breadcrumb: {
                label: 'Imprimir ausencia',
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
export class ImprimirRoutingModule { }
