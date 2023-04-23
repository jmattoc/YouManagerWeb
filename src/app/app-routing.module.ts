import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './auth/helpers/auth.guard';
import { AuthGuard } from "@core/auth/guards/auth.guard";
import { AdminLayoutComponent } from "./layouts/admin/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
//import { newcategoria } from './modules/admin/pages/categorias/categorias.component';
import {NewcategoriaComponent} from './modules/admin/pages/newcategoria/newcategoria.component';
import { TipotrabajadorComponent } from './modules/admin/pages/tipotrabajador/tipotrabajador.component';
import { Recomodule } from './modules/reco/reco.module';

/*
//
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contra',
    loadChildren: () => import('./contra/contra.module').then(module => module.ContraModule),
    canActivate: [AuthGuard]
  },

  {
    path: '',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  }

];*/
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    //loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import(`./dashboard/dashboard.module`).then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: () => import(`./modules/components/components.module`).then(m => m.ComponentsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contrato',
        loadChildren: () => import('./modules/contra/contra.module').then(module => module.ContraModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'puestoperfil',
        loadChildren: () => import('./modules/solicitudperfilpuesto/perfilpuesto.module').then(module => module.perfilpuestoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'puestoperfil',
        loadChildren: () => import('./modules/admin/admin.module').then(module => module.adminModule),
        canActivate: [AuthGuard]
      },
      {
      path: 'administracion',
      loadChildren: () => import('./modules/admin/admin.module').then(module => module.adminModule),
      canActivate: [AuthGuard]
     },
     {
        path: 'seguridad',
        loadChildren: () => import('./modules/seguridad/seguridad.module').then(module => module.SeguridadModule),
        canActivate: [AuthGuard]
     },
     {

        path: 'sctr',
        loadChildren: () => import('./modules/sctr/sctr.module').then(module => module.SeguridadModule),
        canActivate: [AuthGuard]
      },
     /* {
        path: 'gesequipo',
      },*/
      {
        path: 'activos',
        loadChildren: () => import('./modules/equipocelular/celular.module').then(module => module.celularmodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'configuracion',
        loadChildren: () => import('./modules/reco/reco.module').then(module => module.Recomodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'reco',
        loadChildren: () => import('./modules/reco/reco.module').then(module => module.Recomodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'gestionvaciones',
        loadChildren: () => import('./modules/vaca/vaca.module').then(module => module.Vacamodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'gestionasusencia',
        loadChildren: () => import('./modules/Ausencia/Ausencia.module').then(module => module.Ausenciamodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'colaradores',
        loadChildren: () => import('./modules/colaboradores/colaboradores.module').then(module => module.Colaboradoresmodule),
        canActivate: [AuthGuard]
      },
      {
        path: 'immprimir',
        loadChildren: () => import('./modules/imprimir/inprimir.module').then(module => module.Imprmirmodule),
        canActivate: [AuthGuard]
      },

    ]
  },
  // ,
  // {
  //   path: 'home',
  //   loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule),
  //   //canActivate: [AuthGuard],
  // },
  // {
  //   path: '',
  //   redirectTo: '/home/0',
  //   pathMatch: 'full'
  // },
  // ,
  // {
  //   path:"home/:id",
  //   component:HomeComponent
  // },
  /*{
    path: 'nodisponible',
    loadChildren: () => import(`./modules/no-disponible/no-disponible.module`).then(m => m.NoDisponibleModule),
    //canActivate: [AuthGuard],
  }*/

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
