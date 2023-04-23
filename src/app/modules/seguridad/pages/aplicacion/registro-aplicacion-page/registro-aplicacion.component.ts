import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AplicacionService } from '@modules/seguridad/services/aplicacion.service';
import { Router } from '@angular/router';
import {BootstrapNotifyBarService} from "@shared/services/bootstrap-notify.service";

@Component({
  selector: 'app-registro-aplicacion',
  templateUrl: './registro-aplicacion.component.html',
  styles: [
  ]
})
export class RegistroAplicacionComponent implements OnInit{
  constructor(private aplicacionService: AplicacionService,
              private fb: FormBuilder,              
              private router: Router,
              private notificador: BootstrapNotifyBarService,) {} 
  ngOnInit(): void {
    localStorage.setItem("idRegistro","null");
  }
  crear(req: any) {   
    this.aplicacionService.grabarAplicacion(req)
     .subscribe((data : any) => {      
      if(data.tipoResultado==1){
        this.notificador.notifySuccess(data.mensaje);
        setTimeout(() => {
          this.router.navigate(['/seguridad', 'bandApp'])
        }, 3000)
      }else{
        this.notificador.notifyWarning(data.mensaje);
      }
    });
  }
}