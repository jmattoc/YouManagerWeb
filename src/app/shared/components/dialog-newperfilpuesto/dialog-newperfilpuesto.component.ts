import { Component, OnInit, Inject, Optional, Self, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse, TmSolicitud } from '@core/models/TmSolicitud.interface';
import { FormGroup, FormBuilder, Validators, FormControl, NgControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
export interface DialogData { idSolicitud: number; stCodigo: string; stMotivo: string; }
import{solperfilpuesto}from '@shared/services/Solicitudperfil.service';


export interface DialogData {
  titulo: string;
  mensaje: string;
}

@Component({
  selector: 'app-dialog-newperfilpuesto',
  templateUrl: './dialog-newperfilpuesto.component.html',
  styleUrls: ['./dialog-newperfilpuesto.component.css']
})
export class DialogNewperfilpuestoComponent implements OnInit {

  matexpansionpanelfiltro: boolean = false;
  id:number=0;
  nuevasolicitud: number = 0;
  codsolicitud: string;
  //stperfilpuesto = new FormControl('');
  //stfuncionespuesto = new FormControl('');
  //Inicializacion de form group
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
  datosBasicosFormGroup!: FormGroup;
  stmaneperfilpuesto = new FormControl('');
  fkMdEstadoperfilpuesto = new FormControl('');
  stobservacion = new FormControl('');
  stfuncionespuesto = new FormControl('');
  rol: MaestroDetalle[] = [];
  funcion: MaestroDetalle[] = [];
  tipoSolicitud: MaestroDetalle[] = [];
  tipoContrato: MaestroDetalle[] = [];
  @Input() solicitud?: TmSolicitud;

  constructor(
    public dialogo: MatDialogRef<DialogNewperfilpuestoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private contratoService: ContraService,
    private solperfilpuesto: solperfilpuesto,
    private _snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
  ) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);

  }
  confirmado(): void {
    this.dialogo.close(true);
  }




  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({
      stmaneperfilpuesto: this.stmaneperfilpuesto,
      stfuncionespuesto: this.stfuncionespuesto,
      fkMdEstadoperfilpuesto: this.fkMdEstadoperfilpuesto,
      fkMdPerfilContratacion: [{ value: this.solicitud?.fkMdPerfilContratacion, disabled: false }, [Validators.required]],
    });
    this.contratoService.getMaestroDetalle(2).subscribe((res: any) => { this.rol = res; });
  }
  onRolChange(rl: { value: any; }) {
    this.contratoService.getMaestroDetalleRecursivo(rl.value).subscribe((res: any) => { this.funcion = res; });
    
  }
  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.panelClass = 'text-align:center'
    this._snackBar.open(message, action,{
      duration: 3000,
      panelClass: ['blue-snackbar']
    });
  }

  CrearPerfil(){
    var data ={
      idCategoria: this.idcategoria,
      nombre:this.perfilpuestotext,
      funcionesPuesto: this.funcionpuestotext,
    }
    this.solperfilpuesto.Postcrearpuesto(data).subscribe((Response:any) =>{
      
      if(Response.tipoResultado==1){
       // this.openSnackBar('Los Datos se registraron correctamente','Ok');
        this.bootstrapNotifyBarService.notifySuccess('Los datos se registraron correctamente');
            window.location.reload();
      }
      this.showbtnenviar = false;
      this.showclose = true;
    })

   /* this.nuevasolicitud = 1;

    this.showObs = true;
    this.lockForm = true;
    this.lockfuncionpuesto = true;
    this.showbtnobs = true;
    this.showAprob = true;
    this.showbtnenviar = false;
    this.lockObs = null;*/

  }
  cerrarDialogomodal():void{
    this.dialogo.close(false);
  }
  btnobservar(){
    this.nuevasolicitud = 2;

    //bloquear control showObs
    this.showObs = true;
     //ocultar control lock
    this.lockObs = true;
    //conotrol nombre del puesto
    this.locknamepuesto = true;
    this.lockForm = null;
    //control funcion del puesto
    this.lockfuncionpuesto = null;
    this.showbtnenviar = true;
    this.showbtnobs = false;
    this.showAprob = false;
  }
  btndarconformidad(){
    this.nuevasolicitud = 4;
    //conotrol nombre del puesto
    this.locknamepuesto = true;
    this.lockForm = false;
    //control funcion del puesto
    this.lockfuncionpuesto = true;
    this.showdarconf = false;
    this.showAprob = true;


  }
  btnAprobar(){
    this.nuevasolicitud = 3;
    this.lockObs = false;
    this.showbtnobs = false;
    this.showdarconf = true;
    this.showAprob = false;
    this.showclose = true;
  }


}
