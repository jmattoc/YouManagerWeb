import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejacolaboradoresComponent } from './pages/bandejacolaboradores/bandejacolaboradores.component';

const routes: Routes =[
  {
    path: '',
    children:[
      {
        path: 'maestrocolaborador',
        component: BandejacolaboradoresComponent,
        data: {
            breadcrumb: {
                label: 'Módulo de Colaboradores',
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
export class ColaboradoresRoutingModule { }
