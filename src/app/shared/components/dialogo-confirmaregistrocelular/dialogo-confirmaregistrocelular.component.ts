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
//import { DialogData } from '../dialogo-confirmacion/dialogo-confirmacion.component';
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
  selector: 'app-dialogo-confirmaregistrocelular',
  templateUrl: './dialogo-confirmaregistrocelular.component.html',
  styleUrls: ['./dialogo-confirmaregistrocelular.component.css']
})
export class DialogoConfirmaregistrocelularComponent implements OnInit {

  datosBasicosFormGroup!: FormGroup;
  stnameresponsetxt = new FormControl('');
  constructor(
    public dialogo: MatDialogRef<DialogoConfirmaregistrocelularComponent>,
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

    });

  }

  aceptarmodal(){
    this.dialogo.close(false);
    this.bootstrapNotifyBarService.notifySuccess('Los datos se guardaron correctamente');
    //window.location.reload();
  }

  cerrarDialogo(){
    this.dialogo.close(false);
  }

}
