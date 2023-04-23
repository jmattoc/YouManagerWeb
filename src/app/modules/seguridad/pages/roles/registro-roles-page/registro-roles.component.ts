import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RolesService } from '@modules/seguridad/services/roles.service';
import { Router } from '@angular/router';
import {BootstrapNotifyBarService} from "@shared/services/bootstrap-notify.service";

@Component({
  selector: 'app-registro-roles',
  templateUrl: './registro-roles.component.html',
  styles: [
  ]
})
export class RegistroRolesComponent implements OnInit{
  constructor(private rolesService: RolesService,
              private fb: FormBuilder,              
              private router: Router,
              private notificador: BootstrapNotifyBarService,) {} 
  ngOnInit(): void {
    localStorage.setItem("idRegistro","null");
  }
  crear(req: any) {   
    this.rolesService.grabarRoles(req)
     .subscribe((data : any) => {      
      if(data.tipoResultado==1){
        this.notificador.notifySuccess(data.mensaje);
        setTimeout(() => {
          this.router.navigate(['/seguridad', 'bandroles'])
        }, 3000)
      }else{
        this.notificador.notifyWarning(data.mensaje);
      }
    });
  }
}