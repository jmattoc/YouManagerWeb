import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BandejaobjetivoComponent } from './pages/bandejaobjetivo/bandejaobjetivo.component';
import { NewobjetivoComponent } from './pages/newobjetivo/newobjetivo.component';
import { BandejaperiodoComponent } from './pages/bandejaperiodo/bandejaperiodo.component';
import { NewperiodoComponent } from './pages/newperiodo/newperiodo.component';
import { BandejanivelComponent } from './pages/bandejanivel/bandejanivel.component';
import { NewnivelComponent } from './pages/newnivel/newnivel.component';
import { ObjetivoValorComponent } from './pages/objetivo-valor/objetivo-valor.component';
import { BandejaobjValorComponent } from './pages/bandejaobj-valor/bandejaobj-valor.component';
import { BandejaobjcumplimientoComponent } from './pages/bandejaobjcumplimiento/bandejaobjcumplimiento.component';
import { NewobjetivocumlimientoComponent } from './pages/newobjetivocumlimiento/newobjetivocumlimiento.component';


const routes: Routes =[
  {
    path: '',
    children: [
      {
        path: 'concepto',
        component: BandejaobjetivoComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja de conceptos de objetivos de gerencia',
                        }
             }
      },
      {
        path: 'nuevoobjetivo',
        component: NewobjetivoComponent,
        data: {
            breadcrumb: {
                label: 'Nuevo objetivo de gerencia',
            }
      }
      },
      {
        path: 'nuevoobjetivo/:id',
        component: NewobjetivoComponent,
        data: {
            breadcrumb: {
                label: 'Editar concepto',
                        }
             }
      },
      {
        path: 'periodo',
        component: BandejaperiodoComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja de periodos',
                        }
             }
      },
      {
        path: 'newperiodo',
        component: NewperiodoComponent,
        data: {
            breadcrumb: {
                label: 'Nuevo periodo',
                        }
             }
      },
      {
        path: 'newperiodo/:id',
        component: NewperiodoComponent,
        data: {
            breadcrumb: {
                label: 'Editar periodo',
                        }
             }
      },

      {
        path: 'niveles',
        component: BandejanivelComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja de niveles',
                        }
             }
      },
      {
        path: 'newniveles',
        component: NewnivelComponent,
        data: {
            breadcrumb: {
                label: 'Unidades de evaluación',
                        }
             }
      },
      {
        path: 'newniveles/:id',
        component: NewnivelComponent,
        data: {
            breadcrumb: {
                label: 'Editar unidad organica',
                        }
             }
      },
      {
        path: 'objvalor',
        component: BandejaobjValorComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja objetivo valor',
                        }
             }
      },
      {
        path: 'newobjetivovalor',
        component: ObjetivoValorComponent,
        data: {
            breadcrumb: {
                label: 'Crear objetivo valor',
                        }
             }
      },
      {
        path: 'newobjetivovalor/:id',
        component: ObjetivoValorComponent,
        data: {
            breadcrumb: {
                label: 'Crear objetivo valor',
                        }
             }
      },
      {
        path: 'avancumplimiento',
        component: BandejaobjcumplimientoComponent,
        data: {
            breadcrumb: {
                label: 'Bandeja avance cumplimiento',
                        }
             }
      },
      {
        path: 'newobjcumplimiento',
        component: NewobjetivocumlimientoComponent,
        data: {
            breadcrumb: {
                label: 'Crear objetivo cumplimiento',
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
export class RecoRoutingModule { }
