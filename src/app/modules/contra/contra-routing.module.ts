import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './pages/lista-contra/lista-contra.component';
import { NuevoContraComponent } from './pages/nuevo-contra/nuevo-contra.component';
import { EditarContraComponent } from './pages/editar-contra/editar-contra.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsuarioContraComponent } from './pages/herramientas/contra.herramienta.usuario';
import { CuentaContableContraComponent } from './pages/herramientas/contra.herramienta.cuentacontable';
import { ProyectoContraComponent } from './pages/herramientas/contra.herramienta.proyecto';
import { ProveedorContraComponent } from './pages/herramientas/contra.herramienta.proveedores';
import { PostulanteContraComponent } from './pages/herramientas/contra.herramienta.postulante';
import { ListaHorarioComponent } from './pages/lista-horario/lista-horario.component';
const routes: Routes = [
    {
        path: '',        
        children: [
            {
                path: 'reg',
                component: ListaLibrosComponent,
                data: {
                    breadcrumb: {
                        label: 'Bandeja de Reclutamiento',
                    }
                }
            },
            {
                path: 'Hr',
                component: ListaHorarioComponent
            },
            {
                path: 'reg/Dashboard',
                component: DashboardComponent
            },
            {
                path: 'nuevo',
                component: NuevoContraComponent,
                data: {
                    breadcrumb: {
                        label: 'Solicitud de Reclutamiento de Personal',
                    }
                }
            },
            {
                path: 'reg/:id/editar',
                component: EditarContraComponent,
                data: {
                    breadcrumb: {
                        label: 'Editar Reclutamiento',
                    }
                }
            },
            {
                path: 'reg/Usuario',
                component: UsuarioContraComponent
            },
            {
                path: 'reg/CuentaContable',
                component: CuentaContableContraComponent
            },
            {
                path: 'reg/Proyectos',
                component: ProyectoContraComponent
            },
            {
                path: 'reg/Proveedores',
                component: ProveedorContraComponent
            },
            {
                path: 'reg/Postulantes',
                component: PostulanteContraComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }