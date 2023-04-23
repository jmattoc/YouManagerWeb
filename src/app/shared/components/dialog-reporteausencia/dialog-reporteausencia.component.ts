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
  selector: 'app-dialog-reporteausencia',
  templateUrl: './dialog-reporteausencia.component.html',
  styleUrls: ['./dialog-reporteausencia.component.css']
})
export class DialogReporteausenciaComponent implements OnInit {
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
    public dialogo: MatDialogRef<DialogReporteausenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Ausenciaservice: Ausenciaservice,
    private AssetService: AssetService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
