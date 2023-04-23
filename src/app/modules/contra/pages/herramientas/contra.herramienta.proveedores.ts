import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';

  @Component({
    selector: 'Proveedores-contra',
    templateUrl: './contra.herramienta.proveedores.html',
  })
  export class ProveedorContraComponent implements OnInit{
      
    formProveedor!: FormGroup;
    Disponibilidad :MaestroDetalle[]=[];
    srcFoto?: string;  
    urlFotoAux :string=""; 
    urlCvAux?: string="";
    IsProcesando:boolean=false;
    constructor(
      //public dialogRef: MatDialogRef,
      private contratoService: ContraService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {    
  //    this.contratoService.getMaestroDetalle(11).subscribe((res: any)=>{this.Disponibilidad=res;});
  
    }

    onNoClick(): void {
        //this.dialogRef.close();
      }  
    guardar(){
    
      var btnGuardar = (document.getElementById("btnGuardar")) as HTMLInputElement;
      btnGuardar.disabled=true;

      this.formProveedor = this.fb.group({         
        stNombre: document.querySelector<HTMLInputElement>('input[name="stRazonSocial"]').value,
        stRuc: document.querySelector<HTMLInputElement>('input[name="stRuc"]').value,
        stTelefono: document.querySelector<HTMLInputElement>('input[name="stTelefono"]').value,
        stNombreContacto: document.querySelector<HTMLInputElement>('input[name="stNombreContacto"]').value,
        stCorreo: document.querySelector<HTMLInputElement>('input[name="stCorreoContacto"]').value
      });

       this.contratoService.crearProveedor(this.formProveedor.value)
       .subscribe(data => {      
        this.snackBar.open('Proveedor agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.onNoClick();
        //this.IsProcesando=false;      
        document.querySelector<HTMLInputElement>('input[name="stRazonSocial"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stRuc"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stTelefono"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stNombreContacto"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stCorreoContacto"]').value="";
        
      });

      btnGuardar.disabled=false;
    }
  }