import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { AzureService } from '@core/azure/azure.service';

interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: []
})
export class CargosComponent implements OnInit {

  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  Listarcategorias: ListarbandejacategoriaResponse;
  public fechainicio: string = '2022-09-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  columnas = ['stcargos','stestado','FxRegistro'];
  codsolicitud: string;
  constructor(
    private contratoService: ContraService,
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private azureService: AzureService,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
  ) { }

  ngOnInit(): void {
    this.codsolicitud = this.activatedRoute.snapshot.paramMap.get('code');
    //Inicializacion de form group
    this.datosBasicosFormGroup = this._formBuilder.group({
    });

    this.formulario = this.fb.group({
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });

    this.searchperfil(1,10);
  }
  estadocargos: Foodestado[] = [
    {value: 'Activo', viewValue: 'Activo'},
    {value: 'Inactivo', viewValue: 'Inactivo'},
  ];
  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifyWarning('Seleccione las fechas y/o el estado.');
    } else{
      var data ={
        page: page,
        size: size,
        estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
      /*console.log('Data',data);
      console.log('fecinicio', this.fechainicio);
      console.log('fechafin', this.fechafin);
      console.log('Estado', this.formulario.controls['fkMdEstado'].value);*/
      /*this.bandejaperfilservice.Postlistarpuestopaginado(data).subscribe((res: any) => {
        this.Listarperfil = res;
        this.isLoading = false;
      }, error => this.isLoading = false);*/
    }

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  Limpiar(){

  }

}
