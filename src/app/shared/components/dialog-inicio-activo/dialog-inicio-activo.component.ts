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
  selector: 'app-dialog-inicio-activo',
  templateUrl: './dialog-inicio-activo.component.html',
  styleUrls: []
})
export class DialogInicioActivoComponent implements OnInit {
  datosBasicosFormGroup!: FormGroup;
  public tipoactivotxt: string;
  public idcelular: number;
  public idlaptop: number;
  constructor(
    public dialogo: MatDialogRef<DialogInicioActivoComponent>,
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

    })
  }

  chanelid(id:number){
    this.dialogo.close(id);
  }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

}
