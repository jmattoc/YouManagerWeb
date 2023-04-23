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
  categoria:string;
  nombre: string;
  estado: string;
  funcionesPuesto: string;
  motivoObservado: string;

}

@Component({
  selector: 'app-dialog-verperfilpuesto',
  templateUrl: './dialog-verperfilpuesto.component.html',
  styleUrls: ['./dialog-verperfilpuesto.component.css']
})
export class DialogVerperfilpuestoComponent implements OnInit {

  datosBasicosFormGroup!: FormGroup;
  public idcategoria:number;
  rol: MaestroDetalle[] = [];
  funcion: MaestroDetalle[] = [];
  tipoSolicitud: MaestroDetalle[] = [];
  tipoContrato: MaestroDetalle[] = [];
  stmaneperfilpuesto = new FormControl('');
  stmaneestadoperfil = new FormControl('');
  stnamePerfil = new FormControl('');
  fkMdEstadoperfilpuesto = new FormControl('');
  stobservacion = new FormControl('');
  stfuncionespuesto = new FormControl('');
  public perfilpuestotext: string;
  public estadoperfil: string;
  public perfiltext: string;
  public funcionpuestotext: string;
  public observaciontext: string;
  @Input() solicitud?: TmSolicitud;

  constructor(
    public dialogo: MatDialogRef<DialogVerperfilpuestoComponent>,
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
    this.datosBasicosFormGroup.disable();
    console.log(this.data.nombre);
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

}
