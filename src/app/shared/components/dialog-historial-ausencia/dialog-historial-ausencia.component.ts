import { Component,OnInit, Inject, Optional, Self, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, NgControl } from '@angular/forms';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { Ausenciaservice } from '@modules/Ausencia/services/Ausencia.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import * as moment from 'moment';

export interface DialogData{
  titulo: string;
  mensaje: string;
  codigo: string;
  aprobador: string;
  cantidadDias:any;
  empleado: string;
  estado: any;
  fechaInicio:string;
  fechaFin: string;
  idEmpleado:any;
  idEstado: number;
  idTipoAusencia: number;
  motivoRechazo: string;
  tipoAusencia:string;
  comentario: string;
  id:number;
}

@Component({
  selector: 'app-dialog-historial-ausencia',
  templateUrl: './dialog-historial-ausencia.component.html',
  styleUrls: ['./dialog-historial-ausencia.component.css']
})
export class DialogHistorialAusenciaComponent implements OnInit {
  datosBasicosFormGroup!: FormGroup;
  idEmpleado: number =0;
  idAusencia: number =0;
  public NombreEmpleado: string='';
  public CodigoEmpleado: string='';
  public lsitarhistorial: any [];
  columnas = ['FechaInicio','FechaFin','FechaRegistro','cantidadDias','estado','tipo']
  isLoading = false;
  public totalDiasAprobados: number=0;
  datos = ' '
  constructor(
    public dialogo: MatDialogRef<DialogHistorialAusenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Ausenciaservice: Ausenciaservice,
  ) { }

  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({

    })


    this.idEmpleado = this.data.idEmpleado;
    console.log('Idempleado',this.idEmpleado );
    this.idAusencia = this.data.id;
    console.log('Idempleado',this.idAusencia );
    this.NombreEmpleado = this.data.empleado;
    this.CodigoEmpleado = this.data.codigo;

    this.Ausenciaservice.gethistorialAusencia(this.idEmpleado).subscribe((res:any) =>{
      this.lsitarhistorial = res;
      this.totalDiasAprobados = res[0].totalDiasAprobados;
      console.log('ListaAusencia', this.lsitarhistorial);
    });
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  imprimirhistorial(){
   // let oldStr = window.document.body.innerHTML; // Obtener el contenido del cuerpo
   // let start = "<! - startprint ->"; // Iniciar la impresión del logotipo, 17 caracteres
  //  let end = "<! - endprint ->"; // fin de imprimir logo
   // let newStr = oldStr.substr (oldStr.indexOf (start) + 17); // interceptar el contenido después de comenzar a imprimir el logotipo
   // newStr = newStr.substring (0, newStr.indexOf (end)); // Interceptar el contenido entre la marca de inicio de impresión y la marca de finalización de impresión
   // window.document.body.innerHTML = newStr; // Asignar el contenido especificado que debe imprimirse en el cuerpo
    window.print (); // Llame a la función de impresión del navegador para imprimir el área especificada
   // window.document.body.innerHTML = oldStr; // reemplaza el cuerpo con el contenido original
  }

}
