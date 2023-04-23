import { solicitudSolicitudEMO } from './../../../core/models/solicitudSolicitudEMO.interface';
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
import { bandejaperfilservice } from '@modules/solicitudperfilpuesto/services/solpuestoperfil.service';
import { ListarbandejaperfilResponse } from '@core/models/guardarperfil.interface';
import { NumberSymbol } from '@angular/common';

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
  selector: 'app-dialog-observarperfil',
  templateUrl: './dialog-observarperfil.component.html',
  styleUrls: []
})
export class DialogObservarperfilComponent implements OnInit {

  datosBasicosFormGroup!: FormGroup;
  stobservacion = new FormControl('');
  stnamePerfil = new FormControl('');
  stfuncionespuesto = new FormControl('');
  stmaneperfilpuesto = new FormControl('');
  public lockobservacion: boolean = null;
  public observarpuestotext: string;
  public idcategoria:number;
  public observarperfil: string;
  public perfiltext: string;
  public perfilpuestotext: string;
  public estadoperfil: string;
  public observaciontext: string;
  public funcionpuestotext: string;
  Observer: string;
  id:number=0;
  Listarperfil: ListarbandejaperfilResponse;
  rol: MaestroDetalle[] = [];
  funcion: MaestroDetalle[] = [];
  tipoSolicitud: MaestroDetalle[] = [];
  tipoContrato: MaestroDetalle[] = [];
  @Input() solicitud?: TmSolicitud;

  constructor(
    public dialogo: MatDialogRef<DialogObservarperfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private contratoService: ContraService,
    private solperfilpuesto: solperfilpuesto,
    private _snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private bandejaperfilservice:bandejaperfilservice,
  ) { }

  ngOnInit(): void {

    this.datosBasicosFormGroup = this._formBuilder.group({
      stobservacion: this.stobservacion,
      stnamePerfil: this.stnamePerfil,
      stfuncionespuesto: this.stfuncionespuesto,
      stmaneperfilpuesto: this.stmaneperfilpuesto,
    });
    stnamePerfil :this.stnamePerfil.disable();
    stmaneperfilpuesto :this.stmaneperfilpuesto.disable();
    stfuncionespuesto :this.stfuncionespuesto.disable();

    this.contratoService.getMaestroDetalle(2).subscribe((res: any) => { this.rol = res; });
    this.id = this.data.id;
    this.perfilpuestotext = this.data.nombre;
    this.perfiltext = this.data.categoria;
    this.estadoperfil = this.data.estado;
    this.funcionpuestotext = this.data.funcionesPuesto;
    this.observaciontext = this.data.motivoObservado;

   }

    cerrarDialogo(): void {
      this.dialogo.close(false);

    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ObservarPerfil(){
    if(this.observarpuestotext != ''){
      this.solperfilpuesto.getobservarperfil(this.data.id,this.observarpuestotext).subscribe((Response:any) =>{
        console.log('Respuesta',Response);
        if(Response.tipoResultado==1){
          this.bootstrapNotifyBarService.notifySuccess('Se Observo correctamente el Perfil');
              window.location.reload();
        }
        //this.showbtnenviar = false;
        //this.showclose = true;
      })
    }


  }
}
