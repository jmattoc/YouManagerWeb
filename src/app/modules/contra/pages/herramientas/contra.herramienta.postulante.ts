import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProveedor } from '@core/models/tmProveedor.interface';

  @Component({
    selector: 'Postulante-contra',
    templateUrl: './contra.herramienta.postulante.html',
  })
  export class PostulanteContraComponent implements OnInit{
    dsProveedor: tmProveedor[] = [];
    dsGradoInstruccion: MaestroDetalle[] = [];

    formPostulante!: FormGroup;
    Disponibilidad :MaestroDetalle[]=[];
    srcFoto?: string;  
    urlFotoAux :string="";
    urlCvAux?: string="";
    IsProcesando:boolean=false;
    constructor(
      //public dialogRef: MatDialogRef<PostulanteContraComponent>,
      private contratoService: ContraService,
      private fb: FormBuilder,
      private snackBar: MatSnackBar
    ) {}
    ngOnInit(): void {    
  //    this.contratoService.getMaestroDetalle(11).subscribe((res: any)=>{this.Disponibilidad=res;});
  
  this.contratoService.listarProveedor(0).subscribe((res: any) => { 
    
      this.dsProveedor = res;

      var cmb = (document.getElementById("cmbProveedor")) as HTMLSelectElement;
   
        //Create and append the options
        for (var i = 0; i < this.dsProveedor.length; i++) {
        var option = document.createElement("option");
        option.value = this.dsProveedor[i].idProveedor.toString();
        option.text = this.dsProveedor[i].stNombre;
        cmb.appendChild(option);
        }
     });

     this.contratoService.listarGradoInstruccion().subscribe((res: any) => { 
      
        this.dsGradoInstruccion = res;
  
          var cmb = (document.getElementById("cmbGradoInstruccion")) as HTMLSelectElement;
    
          //Create and append the options
          for (var i = 0; i < this.dsGradoInstruccion.length; i++) {
          var option = document.createElement("option");
          option.value = this.dsGradoInstruccion[i].idMaestroDetalle.toString();
          option.text = this.dsGradoInstruccion[i].stNombre;
          cmb.appendChild(option);
          }
       });

    }

    onNoClick(): void {
       // this.dialogRef.close();
      }  
    guardar(){
    
      var btnGuardar = (document.getElementById("btnGuardar")) as HTMLInputElement;
      btnGuardar.disabled=true;

      var cmbProveedor = (document.getElementById("cmbProveedor")) as HTMLSelectElement;
      var cmbProveedorvalue = cmbProveedor.options[cmbProveedor.selectedIndex].value;
      var cmbProveedortext = cmbProveedor.options[cmbProveedor.selectedIndex].text;

      var cmbcmbGradoInstruccion = (document.getElementById("cmbGradoInstruccion")) as HTMLSelectElement;
      var cmbcmbGradoInstruccionvalue = cmbcmbGradoInstruccion.options[cmbcmbGradoInstruccion.selectedIndex].value;
      var cmbcmbGradoInstrucciontext = cmbcmbGradoInstruccion.options[cmbcmbGradoInstruccion.selectedIndex].text;
      
      

      this.formPostulante = this.fb.group({     
        stNombre: document.querySelector<HTMLInputElement>('input[name="stNombreApellidos"]').value,
        stNroDocumento: document.querySelector<HTMLInputElement>('input[name="stNumeroDocumento"]').value,
        fkProveedor: cmbProveedorvalue,
        stGradoInstruccion: cmbcmbGradoInstrucciontext,
        flPresupuestoMensual: document.querySelector<HTMLInputElement>('input[name="stTarifa"]').value    
      });

       this.contratoService.crearHerramientaPostulante(this.formPostulante.value)
       .subscribe(data => {      
        this.snackBar.open('Postulante agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
       // this.onNoClick();
       // this.IsProcesando=false;      

        document.querySelector<HTMLInputElement>('input[name="stNombreApellidos"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stNumeroDocumento"]').value="";
        document.querySelector<HTMLInputElement>('input[name="stTarifa"]').value="";
        
      });
    
      btnGuardar.disabled=false;
    }
  }