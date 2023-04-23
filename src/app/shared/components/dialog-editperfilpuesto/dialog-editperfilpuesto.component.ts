import { Component, Inject, Input, OnInit, Optional, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContraService } from '@modules/contra/services/contra.service';
//import { DialogData } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import{solperfilpuesto}from '@shared/services/Solicitudperfil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';


export interface DialogData {
  titulo: string;
  mensaje: string;
  categoria:string;
  nombre: string;
  estado: string;
  funcionesPuesto: string;
  motivoObservado: string;
  id:number;

}
@Component({
  selector: 'app-dialog-editperfilpuesto',
  templateUrl: './dialog-editperfilpuesto.component.html',
  styleUrls: ['./dialog-editperfilpuesto.component.css']
})
export class DialogEditperfilpuestoComponent implements OnInit {
  matexpansionpanelfiltro: boolean = false;
  id:number=0;
  nuevasolicitud: number = 0;
  codsolicitud: string;

  public showObs: boolean = false;
  public showbtnobs: boolean =false;
  public showAprob: boolean=false;
  public showdarconf: boolean = false;
  public showbtnenviar: boolean = true;
  public showclose: boolean = false;
  public lockForm: boolean = null;
  public lockfuncionpuesto: boolean = null;
  public showdestado: boolean = null;
  public lockObs: boolean = null;
  public locknamepuesto: boolean = true;
  public idcategoria:number;
  public perfilpuestotext: string;
  public funcionpuestotext: string;
  public estadoperfil: string;
  public perfiltext: string;
  public observaciontext: string;
  public showeditobservar: boolean= false;

  datosBasicosFormGroup!: FormGroup;
  stmaneperfilpuesto = new FormControl('');
  fkMdEstadoperfilpuesto = new FormControl('');
  stfuncionespuesto = new FormControl('');
  rol: MaestroDetalle[] = [];
  funcion: MaestroDetalle[] = [];
  tipoSolicitud: MaestroDetalle[] = [];
  tipoContrato: MaestroDetalle[] = [];
  stnamePerfil = new FormControl('');
  stobservacion = new FormControl('');
  stmaneestadoperfil = new FormControl('');
  @Input() solicitud?: TmSolicitud;


  constructor(
    public dialogo: MatDialogRef<DialogEditperfilpuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private contratoService: ContraService,
    private solperfilpuesto: solperfilpuesto,
    private _snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
  ) { }

  ngOnInit(): void {

    this.datosBasicosFormGroup = this._formBuilder.group({
      stmaneperfilpuesto: this.stmaneperfilpuesto,
      stobservacion: this.stobservacion,
      stfuncionespuesto: this.stfuncionespuesto,
      stnamePerfil: this.stnamePerfil,
      stmaneestadoperfil: this.stmaneestadoperfil,

    });
    stnamePerfil :this.stnamePerfil.disable();
    stobservacion :this.stobservacion.disable(),



    this.contratoService.getMaestroDetalle(2).subscribe((res: any) => { this.rol = res; });
    console.log(this.data);
    this.id = this.data.id;
    this.perfilpuestotext = this.data.nombre;
    this.perfiltext = this.data.categoria;
    this.estadoperfil = this.data.estado;
    this.funcionpuestotext = this.data.funcionesPuesto;
    this.observaciontext = this.data.motivoObservado;
  }
  onRolChange(rl: { value: any; }) {
    this.contratoService.getMaestroDetalleRecursivo(rl.value).subscribe((res: any) => { this.funcion = res; });

  }

  cerrarDialogo(): void {
    this.dialogo.close(false);

  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  Editperfil(){
    var data ={
      id: this.id,
      //idCategoria: this.idcategoria,
      nombre:this.perfilpuestotext,
      funcionesPuesto: this.funcionpuestotext,
      motivoObservado: this.observaciontext,
    }
    console.log(data);
    this.solperfilpuesto.Puteditpuesto(data).subscribe((Response:any) =>{

      if(Response.tipoResultado==1){
       // this.openSnackBar('Los Datos se registraron correctamente','Ok');
        this.bootstrapNotifyBarService.notifySuccess('Los datos se Editaron correctamente');
            window.location.reload();
      }
      this.showbtnenviar = false;
      this.showclose = true;
    })


  }

}
