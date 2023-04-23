import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { AssetService } from '@shared/services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tmProveedor } from '@core/models/tmProveedor.interface';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { trProveedorPostulante } from '@core/models/trProveedorPostulante.interface';
import { ModalFechaComponent } from '../modal-fecha/modal-fecha.component';

  @Component({
    selector: 'Usuario-contra',
    templateUrl: './contra.herramienta.usuario.html',
  })
  export class UsuarioContraComponent implements OnInit{
    dsProveedor: tmProveedor[] = [];
    formUsuario!: FormGroup;
    Disponibilidad :MaestroDetalle[]=[];
    srcFoto?: string;  
    urlFotoAux :string="";
    urlCvAux?: string="";
    IsProcesando:boolean=false;
    constructor(
      //public dialogRef: MatDialogRef<UsuarioContraComponent>,
      private contratoService: ContraService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {    
      
      this.contratoService.listarProveedor(0).subscribe((res: any) => { 
      
        this.dsProveedor = res;

        var cmbProveedor = (document.getElementById("cmbProveedor")) as HTMLSelectElement;
     
          //Create and append the options
          for (var i = 0; i < this.dsProveedor.length; i++) {
          var option = document.createElement("option");
          option.value = this.dsProveedor[i].idProveedor.toString();
          option.text = this.dsProveedor[i].stNombre;
          cmbProveedor.appendChild(option);
          }
       });

    }

    onNoClick(): void {
       // this.dialogRef.close();
      }  
    guardar(){
      

      var btnGuardar = (document.getElementById("btnGuardar")) as HTMLInputElement;
      btnGuardar.disabled=true;

      var cmbRol = (document.getElementById("cmbRol")) as HTMLSelectElement;
     
      var cmbRolvalue = cmbRol.options[cmbRol.selectedIndex].value;
      var cmbRoltext = cmbRol.options[cmbRol.selectedIndex].text;

      var cmbProveedor = (document.getElementById("cmbProveedor")) as HTMLSelectElement;
      var cmbProveedorvalue = cmbProveedor.options[cmbProveedor.selectedIndex].value;
      var cmbProveedortext = cmbProveedor.options[cmbProveedor.selectedIndex].text;
      
      this.formUsuario = this.fb.group({         
        stNombre: document.querySelector<HTMLInputElement>('input[name="stNombres"]').value,
        stNombreCompleto: document.querySelector<HTMLInputElement>('input[name="stNombres"]').value +" "+
                    document.querySelector<HTMLInputElement>('input[name="stApellidos"]').value,
        stCorreo: document.querySelector<HTMLInputElement>('input[name="stCorreo"]').value,
        stLogin: document.querySelector<HTMLInputElement>('input[name="stUsuario"]').value,
        stPassword: document.querySelector<HTMLInputElement>('input[name="stPassword"]').value,
        stRol: cmbRoltext,
        idProveedor: cmbProveedorvalue
      });

       this.contratoService.crearUsuario(this.formUsuario.value)
       .subscribe(data => {      
        this.snackBar.open('Usuario agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'

        });
        this.onNoClick();
       // this.IsProcesando=false;         
       document.querySelector<HTMLInputElement>('input[name="stNombres"]').value="";
       document.querySelector<HTMLInputElement>('input[name="stNombres"]').value="";
       document.querySelector<HTMLInputElement>('input[name="stApellidos"]').value="";
       document.querySelector<HTMLInputElement>('input[name="stCorreo"]').value="";
       document.querySelector<HTMLInputElement>('input[name="stUsuario"]').value="";
       document.querySelector<HTMLInputElement>('input[name="stPassword"]').value="";
      });

      btnGuardar.disabled=false;
    }
  }