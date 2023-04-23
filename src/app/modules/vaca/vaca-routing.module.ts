import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejvacaComponent } from './pages/bandejvaca/bandejvaca.component';
import { NewvacaComponent } from './pages/newvaca/newvaca.component';


const routes: Routes =[
  {
    path: '',
    children: [
      {
        path: 'bandvaca',
        component: BandejvacaComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja de vacaciones',
                        }
             }
      },
      {
        path: '',
        component: NewvacaComponent,
        data: {
            breadcrumb: {
                label: 'Vacaciones por vencer',
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
export class vacaRoutingModule { }
