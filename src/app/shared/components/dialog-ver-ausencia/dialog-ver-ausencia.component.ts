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
}

@Component({
  selector: 'app-dialog-ver-ausencia',
  templateUrl: './dialog-ver-ausencia.component.html',
  styleUrls: ['./dialog-ver-ausencia.component.css']
})
export class DialogVerAusenciaComponent implements OnInit {
  datosBasicosFormGroup!: FormGroup;
  public CIPtxt: string ='';
  public rptempleado: string='';
  public tipoAusenciaIDtxt: string ='';
  public txtaprobador: string = '';
  public respEstado: string='';
  public fechainicio: string='';
  public  fechafin:  string='';
  public txtcomentario: string='';
  stamanecip = new FormControl('');
  stamaneAppNombResp = new FormControl('');
  stmanetipoAusencia= new FormControl('');
  stamaneaprobador = new FormControl('');
  fkMdEstado = new FormControl('');
  stamanecomentario = new FormControl('');

  public codigo_Empleado: string;
  public mostrasdias: number =0;



  constructor(
    public dialogo: MatDialogRef<DialogVerAusenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Ausenciaservice: Ausenciaservice,
  ) { }

  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({
      stamanecip: this.stamanecip,
      stamaneAppNombResp: this.stamaneAppNombResp,
      stamanecomentario: this.stamanecomentario,
      stmanetipoAusencia: this.stmanetipoAusencia,
      stamaneaprobador: this.stamaneaprobador,
      fkMdEstado: this.fkMdEstado,
      fxInicio: [],
      fxFin: [],

    });
    this.datosBasicosFormGroup.disable();
   this.rptempleado = this.data.empleado;
   this.tipoAusenciaIDtxt = this.data.tipoAusencia;
   this.txtaprobador =  this.data.aprobador;
   this.respEstado = this.data.estado;
   this.fechainicio = this.data.fechaInicio;
   this.fechafin = this.data.fechaFin;
   this.mostrasdias = this.data.cantidadDias;
   this.txtcomentario = this.data.comentario;
   this.codigo_Empleado = this.data.codigo;

  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    var dstar = moment(dateRangeStart.value, 'D/MM/YYYY'),
      dend = moment(dateRangeEnd.value, 'D/MM/YYYY'),
      totaldays = dend.diff(dstar, 'days');
    console.log(dateRangeStart.value, dstar);
    console.log(dateRangeEnd.value, dend);
    console.log('total de dias',totaldays);
    this.mostrasdias = totaldays;
    //this.showsoldiasausenciatxt = true;
  }
}
