import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContraService } from '../../services/contra.service';
import { PostulanteContraComponent } from '../editar-contra/editar-contra.component';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import {DatePipe} from '@angular/common';

export interface DialogData {
  titulo : string;
  fecha: Date;
  hora: string;
  id:number;
  accion:string;
  stTipoEntrevista:string,
  stLugarEntrevista:string
}
@Component({
  selector: 'app-modal-fecha',
  templateUrl: './modal-fecha.component.html',  
  styleUrls: ['./modal-fecha.component.css' ]
})

export class ModalFechaComponent {
  mostrarTipoEntrevistaLugar=true;  
  constructor(
    private datePipe: DatePipe,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    public dialogRef: MatDialogRef<PostulanteContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private contratoService: ContraService,    
  ) {
    
    this.data.stTipoEntrevista="Virtual";
    this.mostrarTipoEntrevistaLugar = data.accion=="AprobarEntrevista";
    if(data.accion ==="AprobarEntrevista"){
      this.data.fecha=new Date(data.fecha);
      this.data.hora = this.datePipe.transform(new Date(data.fecha), 'HH:mm');
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  Aceptar(){          
    if(!this.data.fecha || !this.data.hora){      
      this.bootstrapNotifyBarService.notifyWarning('Ingrese fecha y hora de la entrevista');
    }    
    else{
      let fecha:string=this.data.fecha.toDateString() +" "+ this.data.hora;         
      if(this.data.accion == "solicitarEntrevista"){
        this.contratoService.getProgramarEntrevista(this.data.id,fecha)
        .subscribe((res: any)=>{
          this.bootstrapNotifyBarService.notifySuccess('Solicitud enviada');          
          this.onNoClick();      
        });
      }
      else{ 
        this.contratoService.getAprobarEntrevista(this.data.id,fecha,this.data.stTipoEntrevista,this.data.stLugarEntrevista)
        .subscribe((res: any)=>{
          this.bootstrapNotifyBarService.notifySuccess('Confirmación registrada');      
          this.onNoClick();      
        });
      }
    }
  }
}