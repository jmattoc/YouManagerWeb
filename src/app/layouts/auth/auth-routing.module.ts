/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LayoutComponent } from '../home/pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
const routes: Routes = [
    {
        path: '',
        //component: LayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegistroComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})*/
export class AuthRoutingModule { }
