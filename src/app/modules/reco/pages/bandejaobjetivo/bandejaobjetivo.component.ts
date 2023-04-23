import { ListarbandejaconceptoDetalleResponse } from './../../../../core/models/reco.interface';

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
import { recoservice } from '../services/reco.service';

interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-bandejaobjetivo',
  templateUrl: './bandejaobjetivo.component.html',
  styleUrls: []
})
export class BandejaobjetivoComponent implements OnInit {
  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  listarconcepto: ListarbandejaconceptoDetalleResponse
  public fechainicio: string = '2022-11-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
   datosBasicosFormGroup!: FormGroup;
   columnas = ['stmenu','stnombre','stestado','FxRegistro'];
   idconcepto: number =0;
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

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
    });
    this.searchperfil(1,10);
  }


  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifyWarning('Seleccione la fecha de Inicio y Fin.');
    }else{
      var data ={
        page: page,
        size: size,
       /* estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,*/
        nombre:'',
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
     // console.log('data-paginado', data);
      this.recoservice.postpaginadoconcepto(data).subscribe((res: any) => {
        this.listarconcepto = res;
       // console.log('tabla',this.listarconcepto);
        this.isLoading = false;
      }, error => this.isLoading = false);

    }
  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  desactivarconcepto(id: any){
    var data = {
      id: this.idconcepto= id,
    }
   // console.log('idconcepto-Desactivar',data );
    this.recoservice.deleteconcepto(data).subscribe((res: any) => {
      res;
     //  console.log('desactivar-Concepto',res );
       this.bootstrapNotifyBarService.notifyWarning('Concepto de objetivo desactivado correctamente');
       this.searchperfil(1,10);
     });
  }
  activarconcepto(id: any){
    var data = {
      id: this.idconcepto= id,
    }
   // console.log('idconcepto-activar',data );
    this.recoservice.postactivarobjetos(data).subscribe((res: any) => {
      res;
      // console.log('Activar-Concepto',res );
       this.bootstrapNotifyBarService.notifyWarning('Concepto de objetivo activado correctamente');
       this.searchperfil(1,10);
     });
  }




}
