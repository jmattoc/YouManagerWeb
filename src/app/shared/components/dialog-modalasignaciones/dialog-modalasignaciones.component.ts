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
import { ListartrabajadorespaginadoResponse } from '@core/models/activos.interface';
import { PageEvent } from '@angular/material/paginator';
import { AssetService } from '../../services/asset.service';
export interface DialogData {
  titulo: string;
  mensaje: string;
  idactivo: string;
}

@Component({
  selector: 'app-dialog-modalasignaciones',
  templateUrl: './dialog-modalasignaciones.component.html',
  styleUrls: []
})
export class DialogModalasignacionesComponent implements OnInit {
  columnas =['menu','stcodigo','stnombres','stdni'];
  isLoading = false;
  datosBasicosFormGroup!: FormGroup;
  stamanebuscarpersonal = new FormControl('');
  public listartrabajadorespaginado: ListartrabajadorespaginadoResponse;
  public searchname: string ='';

  constructor(
    public dialogo: MatDialogRef<DialogModalasignacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private contratoService: ContraService,
    private solperfilpuesto: solperfilpuesto,
    private _snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private AssetService: AssetService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    }

  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({
      stamanebuscarpersonal:[],
    })
    //this.searchperfil(1,10);

  }

  searchperfil(page: number, size:number){
    console.log('texto', this.searchname);
    if(this.searchname == ''){
      this.bootstrapNotifyBarService.notifyWarning('Debe ingresar el nombre.');
    }else{
      var data = {
                page: page,
                size: size,
                nombre: this.searchname,
                }
      this.AssetService.postpaginadotrabajador(data).subscribe((res: any) => {
        this.listartrabajadorespaginado = res;
        console.log('listar-trabajadores',this.listartrabajadorespaginado);
        this.isLoading = false;
      }, error => this.isLoading = false);
    }
  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  btnasignar(id: number){
    this.data.idactivo;
    this.AssetService.getasignaractivomodal(this.data.idactivo,id).subscribe((res: any) => {
      this.bootstrapNotifyBarService.notifySuccess('Se Asigno correctamente el Activo.');
      this.router.navigate(["/activos/bandequipo"]);
      this.dialogo.close(false);
    }, error => this.isLoading = false);

  }

}
