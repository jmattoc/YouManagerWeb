import { ListarbandejaActivosDto, ListarbandejaActivosResponse } from './../../../../core/models/activos.interface';
import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import{ListarbandejaperfilResponse, ListarbandejaperfilDto, ListarbandejacategoriaResponse
} from '@core/models/guardarperfil.interface'

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { DialogNewperfilpuestoComponent } from '@shared/components/dialog-newperfilpuesto/dialog-newperfilpuesto.component';
import { DatePipe } from '@angular/common';
import { DialogObservarperfilComponent } from '@shared/components/dialog-observarperfil/dialog-observarperfil.component';
import { DialogVerperfilpuestoComponent } from '@shared/components/dialog-verperfilpuesto/dialog-verperfilpuesto.component';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { DialogEditperfilpuestoComponent } from '@shared/components/dialog-editperfilpuesto/dialog-editperfilpuesto.component';
import {equipocelularservice} from '@modules/equipocelular/services/equipocelular.service';
interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-bandejaactivos',
  templateUrl: './bandejaactivos.component.html',
  styleUrls: []
})
export class BandejaactivosComponent implements OnInit {
  matexpansionpanelfiltro: boolean = false;

  isLoading = false;

  public fechainicio: string = '2022-09-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
   datosBasicosFormGroup!: FormGroup;
  columnas = ['stcodigo','stcodigoInventario','stnroserie','stnombretipo','stestado','FxRegistro'];
  codsolicitud: string;
  datafilter: string;
  public lstEstadonewcatgoria: any = [];
  public listarInvActivos: ListarbandejaActivosResponse;
  public estadotxt: string;
  public otrosfiltrostxt: string;

  constructor(
    private contratoService: ContraService,
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private equipocelularservice: equipocelularservice,

  ) {

  }

  ngOnInit(): void {
    this.codsolicitud = this.activatedRoute.snapshot.paramMap.get('code');
    //Inicializacion de form group
    this.datosBasicosFormGroup = this._formBuilder.group({
    });

    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
    });
    this.searchperfil(1,10);
  }
  listaestado: Foodestado[] = [
    {value: 'true', viewValue: 'DISPONIBLE'},
    {value: 'false', viewValue: 'EN USO'},
    {value: 'false', viewValue: 'BAJA'},
  ];
  listatipo: Foodestado[] = [
    {value: '1', viewValue: 'CELULAR'},
    {value: '2', viewValue: 'LAPTOP'},

  ];

  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifySuccess('Seleccione la fecha de Inicio y Fin.');
    } else{
      var data ={
        page: page,
        size: size,
        codigo: this.otrosfiltrostxt == '' ? null : this.otrosfiltrostxt,
        //codigoInventario: this.otrosfiltrostxt == '' ? null : this.otrosfiltrostxt,
        tipo: this.formulario.controls['fkMdEstado'].value == '' ? null : this.formulario.controls['fkMdEstado'].value,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
      this.equipocelularservice.paginadoinvactivos(data).subscribe((res: any) => {
        this.listarInvActivos = res;
       // console.log('tabla',this.listarInvActivos);
        this.isLoading = false;
      }, error => this.isLoading = false);

    }
  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

}
