import { Component, Inject, OnInit, Optional, Self } from '@angular/core';
import { FormBuilder, FormGroup, NgControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
//import {recoservice} from '@';
import { Router } from '@angular/router';
export interface DialogData { idSolicitud: number; stCodigo: string; stMotivo: string; }
import {AssetService} from '@shared/services/asset.service';
import { ListarbandejaobjtivovalorResponse } from '@core/models/reco.interface';
export interface DialogData {
  titulo: string;
  mensaje: string;
  id: number;
}

@Component({
  selector: 'app-dialog-confirmarperiodo',
  templateUrl: './dialog-confirmarperiodo.component.html',
  styleUrls: []
})
export class DialogConfirmarperiodoComponent implements OnInit {
  [x: string]: any;
  datosBasicosFormGroup!: FormGroup;
  listarbandejaobjetivovalor:ListarbandejaobjtivovalorResponse;
  idperiodoactivado: number = 0;
  public isedit: boolean = false;

  constructor(
    public dialogo: MatDialogRef<DialogConfirmarperiodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private _snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private router: Router,
    //private recoservice: recoservice,
    private AssetService: AssetService,
  ) { }

  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({

    });
    this.searchperfil3(1,10);
  }

  searchperfil3(page:1, size:10){
    var data = {
      page: page,
      size: size,
      activo: true,
    }
    this.AssetService.postpaginadoobjetivovalor(data).subscribe((res: any) => {
      this.listarbandejaobjetivovalor = res;
      this.idperiodoactivado = res.data[0].id;
      console.log('listar-periodo-activo',this.listarbandejaobjetivovalor);
      console.log('id-periodo', this.idperiodoactivado);
      this.isLoading = false;
    },error => this.isLoading = false);

   }
  registrarcabecera() : void{
    if(this.data.id != null){
      this.bootstrapNotifyBarService.notifyWarning('Ya existe periodo.');
    }
    var cab = {
      idPeriodo:this.idPeriodo,
      descripcion: '',
    }
      this.AssetService.postguardacabecera(cab).subscribe((res: any) =>{
      this.bootstrapNotifyBarService.notifyWarning('Se guardo correctamente la cabecera.');
    });

    this.router.navigate(["/reco/newobjetivovalor"]);
    this.dialogo.close(false);



  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }


}
