import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { Router } from '@angular/router';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';
import {BootstrapNotifyBarService} from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-nuevo-contra',
  templateUrl: './nuevo-contra.component.html',
  styles: [
  ]
})
export class NuevoContraComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private contratoService: ContraService,
    private router: Router,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    //private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  crear(sol: TmSolicitud) {
   
    this.contratoService.crearSolicitud(sol)
      .subscribe((data:any) =>{ 
        
        this.bootstrapNotifyBarService.notifySuccess('Se creó la solicitud con código: '+ data.stCodigo);
       /* this.snackBar.open('Se creó la solicitud con código: '+ data.stCodigo, 'Ok', {
          duration: 5 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });*/
        setTimeout(() => {
          this.router.navigate(['/contrato', 'reg'])
          //this.router.navigate(['/solicitud/bandejasolicitud'])
        }, 3000)
       
    });
  }
}