import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';

  @Component({
    selector: 'Proveedores-contra',
    templateUrl: './contra.herramienta.proyecto.html',
  })
  export class ProyectoContraComponent implements OnInit{
      
    formProyecto!: FormGroup;
    Disponibilidad :MaestroDetalle[]=[];
    srcFoto?: string;  
    urlFotoAux :string="";
    urlCvAux?: string="";
    IsProcesando:boolean=false;
    constructor(
      //public dialogRef: MatDialogRef<ProyectoContraComponent>,
      private contratoService: ContraService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {    
    //  this.contratoService.getMaestroDetalle(11).subscribe((res: any)=>{this.Disponibilidad=res;});
  
    
    }

    onNoClick(): void {
        //this.dialogRef.close();
      }  
    guardar(){
    
      var btnGuardar = (document.getElementById("btnGuardar")) as HTMLInputElement;
      btnGuardar.disabled=true;


      this.formProyecto = this.fb.group({         
        stCodigo: document.querySelector<HTMLInputElement>('input[name="stCodigo"]').value,
        StNombre: document.querySelector<HTMLInputElement>('input[name="stNombreProyecto"]').value,
        stPersonaLider: document.querySelector<HTMLInputElement>('input[name="stJefeProyecto"]').value,
        stPersonaLiderUsuario: document.querySelector<HTMLInputElement>('input[name="stUsuarioLider"]').value
      });

       this.contratoService.crearProyecto(this.formProyecto.value)
       .subscribe(data => {      
        this.snackBar.open('Proyecto agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.onNoClick();
        //this.IsProcesando=false;  
        
        document.querySelector<HTMLInputElement>('input[name="stCodigo"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stNombreProyecto"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stJefeProyecto"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stUsuarioLider"]').value="";
      });

      btnGuardar.disabled=false;
    }
  }