import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import {NewcategoriaComponent} from './pages/newcategoria/newcategoria.component';
import {CargosComponent } from './pages/cargos/cargos.component';
import {NewcargosComponent} from './pages/newcargos/newcargos.component';
import { TipotrabajadorComponent } from './pages/tipotrabajador/tipotrabajador.component';
import { NewtipotrabajadorComponent } from './pages/newtipotrabajador/newtipotrabajador.component';
import { TipocontratoComponent } from './pages/tipocontrato/tipocontrato.component';
import { NewtipocontratoComponent } from './pages/newtipocontrato/newtipocontrato.component';
import { ModalidadtrabajoComponent } from './pages/modalidadtrabajo/modalidadtrabajo.component';
import { NewmodalidadtrabajoComponent } from './pages/newmodalidadtrabajo/newmodalidadtrabajo.component';
import { CentrocostoComponent } from './pages/centrocosto/centrocosto.component';
import { NewcentrocostoComponent } from './pages/newcentrocosto/newcentrocosto.component';
import {HorariotrabajoComponent} from './pages/horariotrabajo/horariotrabajo.component';
import { NewhorariotrabajoComponent } from './pages/newhorariotrabajo/newhorariotrabajo.component';
const routes: Routes = [
  {
    path: '',
        children: [
            {
                path: 'categoria',
                component: CategoriasComponent,
                data: {
                    breadcrumb: {
                        label: 'Bandeja categorias',
                    }
                }
            },
            {
              path: 'newcategoria',
              component: NewcategoriaComponent,
              data: {
                  breadcrumb: {
                      label: 'Nueva categoria',
                  }
              }
            },
            {
              path: 'newcategoria/:id',
              component: NewcategoriaComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar categoria',
                  }
              }
            },
            {
              path: 'cargos',
              component: CargosComponent,
              data: {
                  breadcrumb: {
                      label: 'Regitrar Categorias',
                  }
              }
            },
            {
              path: 'newcargos',
              component: NewcargosComponent,
              data: {
                  breadcrumb: {
                      label: 'Regitrar Cargo',
                  }
              }
            },
            {
              path: 'tipotrabajador',
              component: TipotrabajadorComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja Tipo Trabajador',
                  }
              }
            },
            {
              path: 'newtipotrabajador',
              component: NewtipotrabajadorComponent,
              data: {
                  breadcrumb: {
                      label: 'Crear Tipo Trabajador',
                  }
              }
            },
            {
              path: 'newtipotrabajador/:id',
              component: NewtipotrabajadorComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar nuevo trabajador',
                  }
              }
            },
            {
              path: 'horatrabajo',
              component: HorariotrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja Horario trabajador',
                  }
              }
            },
            {
              path: 'newhorariotrabajo',
              component: NewhorariotrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Nuevo Horario trabajador',
                  }
              }
            },
            {
              path: 'newhorariotrabajo/:id',
              component: NewhorariotrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar Horario trabajador',
                  }
              }
            },
            {
              path: 'tipocontrato',
              component: TipocontratoComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja Tipo Contrato',
                  }
              }
            },
            {
              path: 'newtipocontrato',
              component: NewtipocontratoComponent,
              data: {
                  breadcrumb: {
                      label: 'Crear tipo contrato',
                  }
              }
            },
            {
              path: 'newtipocontrato/:id',
              component: NewtipocontratoComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar tipo de contrato',
                  }
              }
            },
            {
              path: 'modtrabajo',
              component: ModalidadtrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja de modalidad de trabajo',
                  }
              }
            },
            {
              path: 'newmodtrabajo',
              component: NewmodalidadtrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Crear modalidad de trabajo',
                  }
              }
            },
            {
              path: 'newmodtrabajo/:id',
              component: NewmodalidadtrabajoComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar modalidad de trabajo',
                  }
              }
            },



            {
              path: 'centrocosto',
              component: CentrocostoComponent,
              data: {
                  breadcrumb: {
                      label: 'Bandeja de centro de costo',
                  }
              }
            },
            {
              path: 'newcentrocosto',
              component: NewcentrocostoComponent,
              data: {
                  breadcrumb: {
                      label: 'Crear centro de costo',
                  }
              }
            },
            {
              path: 'newcentrocosto/:id',
              component: NewcentrocostoComponent,
              data: {
                  breadcrumb: {
                      label: 'Editar Centro de costo',
                  }
              }
            },
          ],
        },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
