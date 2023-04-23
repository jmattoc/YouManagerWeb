import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import{ListarbandejaperfilResponse, ListarbandejaperfilDto, ListarbandejacategoriaResponse, ListarbandejaMaestroDetalleResponse
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
import { adminservice } from '../../services/admin.service';
import { StringifyOptions } from 'querystring';
interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: []
})
export class CategoriasComponent implements OnInit {
  matexpansionpanelfiltro: boolean = false;

  isLoading = false;
  Listarcategorias: ListarbandejaMaestroDetalleResponse;
  public fechainicio: string = '2022-09-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  columnas = ['menu','stnombre','stestado','FxRegistro'];
  codsolicitud: string;
  public lstEstadonewcatgoria: any = [];
  listarMaestroDetalle: ListarbandejaMaestroDetalleResponse;
  public estadotxt: string;
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
    private adminservice : adminservice,
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
    this.listarestadonewcategoria();




  }
  estadocategoria: Foodestado[] = [
    {value: 'true', viewValue: 'ACTIVO'},
    {value: 'false', viewValue: 'INACTIVO'},
  ];
  listarestadonewcategoria(id=31){
    this.adminservice.getlistarestadocategoria(id).subscribe((res: any) => {
      this.lstEstadonewcatgoria = res;

    });
  }

  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifyWarning('Seleccione la fecha de Inicio y Fin.');
    } else{
      var data ={
        page: page,
        size: size,
        estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,
        fkMaestro: 2,
        nombre:'',
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
      /*console.log('Data',data);
      console.log('fecinicio', this.fechainicio);
      console.log('fechafin', this.fechafin);
      console.log('Estado', this.formulario.controls['fkMdEstado'].value);*/
      this.adminservice.paginadomaestrodetalle(data).subscribe((res: any) => {
        this.Listarcategorias = res;
        console.log('tabla',this.Listarcategorias);
        this.isLoading = false;
      }, error => this.isLoading = false);

    }

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  Inactivar(id: any){
    console.log('datos que envia',id);
    this.adminservice.deletemaestrodetalle(id).subscribe((res: any) =>{
      console.log('datos de respuesta',res);
      this.searchperfil(1,10);
      this.bootstrapNotifyBarService.notifyWarning("Se Inactivo la cátegoria");
    });
    }
    Activar(id: any){
    this.adminservice.GetActivar(id).subscribe((res: any)=>{
      this.searchperfil(1,10);
      this.bootstrapNotifyBarService.notifySuccess("Se activo correctamente la cátegoria");
    });
    }

  newcategoriaadmin(){

  }
  updateestadomaestrodetalle(estado: string){
    if(estado = "true") return "Activo";
    if(estado="false") return "Inactivo";
    return "";
  }


}


