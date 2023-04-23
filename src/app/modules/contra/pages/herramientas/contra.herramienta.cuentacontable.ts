import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';

  @Component({
    selector: 'CuentaContable-contra',
    templateUrl: './contra.herramienta.cuentacontable.html',
  })
  export class CuentaContableContraComponent implements OnInit{
      
    formCuentaContable!: FormGroup;
    Disponibilidad :MaestroDetalle[]=[];
    srcFoto?: string;  
    urlFotoAux :string="";
    urlCvAux?: string="";
    IsProcesando:boolean=false;
    constructor(
     // public dialogRef: MatDialogRef<CuentaContableContraComponent>,
      private contratoService: ContraService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {    
     // this.contratoService.getMaestroDetalle(11).subscribe((res: any)=>{this.Disponibilidad=res;});
  
    }

    onNoClick(): void {
       // this.dialogRef.close();
      }  
    guardar(){    
      var btnGuardar = (document.getElementById("btnGuardar")) as HTMLInputElement;
      btnGuardar.disabled=true;

      this.formCuentaContable = this.fb.group({         
        StNombre: document.querySelector<HTMLInputElement>('input[name="stCodigo"]').value + " - "+
        document.querySelector<HTMLInputElement>('input[name="stNombreCuenta"]').value
      });

       this.contratoService.crearCuentaContable(this.formCuentaContable.value)
       .subscribe(data => {      
        this.snackBar.open('Cuenta Contable agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
       // this.onNoClick();
       // this.IsProcesando=false;    
        
        document.querySelector<HTMLInputElement>('input[name="stCodigo"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stNombreCuenta"]').value="";
      });

      btnGuardar.disabled=false;
    }
  }