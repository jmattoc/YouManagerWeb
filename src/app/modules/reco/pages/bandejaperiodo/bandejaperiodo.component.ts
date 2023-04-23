import { recoservice } from './../services/reco.service';
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
import {ListarbandejaperiodoDetalleResponse} from '@core/models/reco.interface';

interface Foodestado {
  value: boolean;
  viewValue: string;
};

@Component({
  selector: 'app-bandejaperiodo',
  templateUrl: './bandejaperiodo.component.html',
  styleUrls: []
})
export class BandejaperiodoComponent implements OnInit {
  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  public fechainicio: string = '2022-09-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
   datosBasicosFormGroup!: FormGroup;
   columnas = ['stmenu','stnombre','stfechainicio','stfechafin','stestado','FxRegistro'];
   listarperiodo: ListarbandejaperiodoDetalleResponse;
   public desactivar: string;
   public activar: String;
   public showestado: boolean = false;
  public estadotxt: string = '';
  idperiodo: number = 0;
  private ultimonombreperiodo: string ='';
  private idultmoperiodo: number = 0;

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
    private recoservice: recoservice,

  ) { }

  estadocategoria: Foodestado[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'},
  ];

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
    });
    this.searchperfil(1,10);
  }

  Renameestado(value: any){
    if(value ==true) return value ="Activo"
    if(value ==false) return value ="Inactivo"

  }

  openmsg(){
    this.bootstrapNotifyBarService.notifyWarning('EL PERIODO SE CREARA COMO ACTIVO!');
    this.router.navigate(["/configuracion/newperiodo"]);

  }

  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifyWarning('Seleccione la fecha de Inicio y Fin.');
    } else{
      var data ={
        page: page,
        size: size,
        estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
     // console.log('Data',data);
     // console.log('fecinicio', this.fechainicio);
     // console.log('fechafin', this.fechafin);
     // console.log('Estado', this.formulario.controls['fkMdEstado'].value);
      this.recoservice.paginadoperido(data).subscribe((res: any) => {
        this.listarperiodo = res;
       // console.log('tabla',this.listarperiodo);
        this.ultimonombreperiodo = res.data[0].nombre;
       // console.log('nombre-ultimo-periodo',this.ultimonombreperiodo)
        this.idultmoperiodo = res.data[0].id;
       // console.log('id-ultimo-periodo',this.idultmoperiodo)

        this.isLoading = false;
      }, error => this.isLoading = false);

    }

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  desactivarperiodo(id: any){
    var data = {
      id: this.idperiodo= id,
    }
        this.recoservice.deleteperiodo(data).subscribe((res: any) => {
         res;
         // console.log('desactivar',res );
          this.bootstrapNotifyBarService.notifyWarning('Periodo desactivado correctamente');
          this.searchperfil(1,10);
        });
  }
  activarperiodo(id: any){
    var data = {
      id: this.idperiodo= id,
    }
   // console.log(data);
    this.recoservice.potactivarperiodo(data).subscribe((res: any)=>{
      res;
    //  console.log(res);
      this.activar = res;
    //  console.log('desactivar',this.activar );
      this.bootstrapNotifyBarService.notifyWarning('Periodo Activado correctamente');
          this.searchperfil(1,10);
    })
  }



}
