import { Component,OnInit, Inject, Optional, Self, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, NgControl } from '@angular/forms';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { Ausenciaservice } from '@modules/Ausencia/services/Ausencia.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import * as moment from 'moment';
import { AssetService } from '../../services/asset.service';
import { Router } from '@angular/router';

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
  id: number;
}

@Component({
  selector: 'app-dialog-observar-ausencia',
  templateUrl: './dialog-observar-ausencia.component.html',
  styleUrls: ['./dialog-observar-ausencia.component.css']
})
export class DialogObservarAusenciaComponent implements OnInit {
  datosBasicosFormGroup!: FormGroup;
  public CIPtxt: string ='';
  public rptempleado: string='';
  public tipoAusenciaIDtxt: string ='';
  public txtaprobador: string = '';
  public respEstado: string='';
  public fechainicio: string='';
  public  fechafin:  string='';
  public txtcomentario: string='';
  public txtrechazo: string = '';
  stamanecip = new FormControl('');
  stamaneAppNombResp = new FormControl('');
  stmanetipoAusencia= new FormControl('');
  stamaneaprobador = new FormControl('');
  fkMdEstado = new FormControl('');
  stamanecomentario = new FormControl('');
  stamanerechazo = new FormControl('');
  showsrechazar: boolean=false;
  public codigo_Empleado: string;
  public mostrasdias: number =0;
  public idsolicitud: number=0;

  constructor(
    public dialogo: MatDialogRef<DialogObservarAusenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Ausenciaservice: Ausenciaservice,
    private AssetService: AssetService,
    private router: Router,
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
      stamanerechazo: this.stamanerechazo,

    });
    this.showsrechazar = true;
    this.datosBasicosFormGroup.controls['stamanerechazo'].enable();
    this.datosBasicosFormGroup.controls['stamanecip'].disable();
    this.datosBasicosFormGroup.controls['stamaneAppNombResp'].disable();
    this.datosBasicosFormGroup.controls['stamanecomentario'].disable();
    this.datosBasicosFormGroup.controls['stmanetipoAusencia'].disable();
    this.datosBasicosFormGroup.controls['stamaneaprobador'].disable();
    this.datosBasicosFormGroup.controls['fkMdEstado'].disable();
    this.datosBasicosFormGroup.controls['fxInicio'].disable();
    this.datosBasicosFormGroup.controls['fxFin'].disable();
   this.rptempleado = this.data.empleado;
   this.tipoAusenciaIDtxt = this.data.tipoAusencia;
   this.txtaprobador =  this.data.aprobador;
   this.respEstado = this.data.estado;
   this.fechainicio = this.data.fechaInicio;
   this.fechafin = this.data.fechaFin;
   this.mostrasdias = this.data.cantidadDias;
   this.txtcomentario = this.data.comentario;
   this.codigo_Empleado = this.data.codigo;
   this.idsolicitud = this.data.id;
   this.txtrechazo = this.data.motivoRechazo;
   console.log('id-solicitud',this.idsolicitud );
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

  ObservarAusencia(){
    var data = {
      idSolicitudAusencia:this.idsolicitud,
      motivoRechazo: this.txtrechazo,
    }
      this.AssetService.postrechazarausencia(data).subscribe((res: any)=>{
      this.bootstrapNotifyBarService.notifyWarning("Acaba de rechazar ausencia de: "+ this.rptempleado);
      window.location.reload();
      this.router.navigate(["/gestionasusencia/bandausencia"]);
      this.dialogo.close(false);
    });

  }



}
