import { bandejaperfilservice } from './../../services/solpuestoperfil.service';
import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import{ListarbandejaperfilResponse, ListarbandejaperfilDto
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
//import { ConsoleReporter } from 'jasmine';

//import { DialogNewperfilpuestoComponent } from '@shared/components/dialog-newperfilpuesto/dialog-newperfilpuesto.component';

export interface PeriodicElement {
  categoria: string;
  name: string;
  estado: string;
  position: number;
  weight: number;
  symbol: string;
  funcionesPuesto: string;
  motivoObservado: string;
  id: number;
}
interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-solicitudpuesto',
  templateUrl: './solicitudpuesto.component.html',
  styleUrls: ['./solicitudpuesto.component.css']
})
export class SolicitudpuestoComponent implements OnInit {

  matexpansionpanelfiltro: boolean = false;
  tipoContrato: MaestroDetalle[] = [];
  proyecto: tmProyecto[] = [];
  aprobar: string;
  columnas = ['menu', 'Stnombre', 'stcategoria', 'stfuncionpuesto', 'stestado', 'FxRegistro','Stobservacion' ];
  datafilter: string;
  Listarbandejaperfilpuesto: ListarbandejaperfilResponse;
  id:number=0;
  nuevasolicitud: number = 0;
  codsolicitud: string;

  Listarperfil: ListarbandejaperfilResponse;
  public fechainicio: string = '2022-08-01T00:00:00.342Z';
  public fechafin: Date = new Date();
  public ngestadoperfil: string = '';
  //Inicializacion de form group
  public showObs: boolean = false;
  public showbtnobs: boolean =false;
  public showAprob: boolean=false;
  public showdarconf: boolean = false;
  public showbtnenviar: boolean = true;
  public lockForm: boolean = null;
  public lockfuncionpuesto: boolean = null;
  public showdestado: boolean = null;
  public lockObs: boolean = null;
  public locknamepuesto: boolean = null;
  datosBasicosFormGroup!: FormGroup;
   /*Control Cliente*/
 // myControlClientePrueba = new FormControl('');
  //myControlCliente = new FormControl('');
  stmaneperfilpuesto = new FormControl('');
  fkMdEstadoperfilpuesto = new FormControl('');
  stobservacion = new FormControl('');
  stfuncionespuesto = new FormControl('');
  //ControlInmuebleSeleccionado: any;
  //ControlGrupoMantenimientoSeleccionado: any;
  formulario!: FormGroup;
  isLoading = false;

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
    private bandejaperfilservice:bandejaperfilservice,
  ) { }


  ngOnInit(): void {
     this.showdestado = false;
     this.locknamepuesto = true;
     this.contratoService.getProyectos().subscribe((res: any) => {
      this.proyecto = res;
     });

     this.codsolicitud = this.activatedRoute.snapshot.paramMap.get('code');


      //Inicializacion de form group
      this.datosBasicosFormGroup = this._formBuilder.group({
        stmaneperfilpuesto: this.stmaneperfilpuesto,
        stfuncionespuesto: this.stfuncionespuesto,
        fkMdEstadoperfilpuesto: this.fkMdEstadoperfilpuesto,
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

    estadoperfil: Foodestado[] = [
      {value: 'Aprobado', viewValue: 'Aprobado'},
      {value: 'En revisión', viewValue: 'En revisión'},
      {value: 'Observado', viewValue: 'Observado'},
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
        this.bandejaperfilservice.Postlistarpuestopaginado(data).subscribe((res: any) => {
          this.Listarperfil = res;
          this.isLoading = false;
        }, error => this.isLoading = false);
      }

    }

    onPaginateChange(event: PageEvent) {
      const pageIndex = event.pageIndex + 1;
      const pageSize = event.pageSize;
      this.searchperfil(pageIndex, pageSize);
    }

    aprobarperfil(idCategoria: any){
      //this.Listarperfil= [0].idCategoria;
     this.bandejaperfilservice.getaprobarpuesto(idCategoria).subscribe((res: any) => {
      this.aprobar = res;
      this.searchperfil(1,10);
    });
    }
    EliminarPerfil(idCategoria: any){
     this.bandejaperfilservice.getinactivar(idCategoria).subscribe((res: any) => {
      this.aprobar = res;
      this.searchperfil(1,10);
    });
    }

    Enviar(){
      this.nuevasolicitud = 1;
      this.showObs = true;
      this.lockForm = true;
      this.lockfuncionpuesto = true;
      this.showbtnobs = true;
      this.showAprob = true;
      this.showbtnenviar = false;
      this.lockObs = null;

    }
    Limpiar(){

    }
    openmodalnewpuesto(){
      this.dialogo.open(DialogNewperfilpuestoComponent, {
        maxWidth: '250vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '40%',
        disableClose: true,
        data: {
          titulo: `Nuevo Perfil de puesto`,
          //id:id,
        }

      })
        .afterClosed()

    }
    btnobservar(idCategoria: any){
      this.nuevasolicitud = 2;
      //bloquear control showObs
      this.showObs = true;
       //ocultar control lock
      this.lockObs = true;
      //conotrol nombre del puesto
      this.locknamepuesto = true;
      this.lockForm = null;
      //control funcion del puesto
      this.lockfuncionpuesto = null;
      this.showbtnenviar = true;
      this.showbtnobs = false;
      this.showAprob = false;
    }
    openPopupnewpuestoperfil(id: any, nombre:any, categoria:any, estado: any, funcionesPuesto: any, motivoObservado: any) {
      this.dialogo.open(DialogObservarperfilComponent, {
        maxWidth: '150vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '30%',
        disableClose: true,
        data: {
          titulo: `Observar Perfil`,
          id:id,
          nombre:nombre,
          estado:estado,
          funcionesPuesto:funcionesPuesto,
          motivoObservado: motivoObservado,
          categoria:categoria,

        }

      })
        .afterClosed()

    }
    openPopupeditpuestoperfil(id: any, nombre:any, categoria:any, estado: any, funcionesPuesto: any, motivoObservado: any) {
      this.dialogo.open(DialogEditperfilpuestoComponent, {
        maxWidth: '250vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '40%',
        disableClose: true,
        data: {
          titulo: `Editar Perfil`,
          id:id,
          categoria:categoria,
          nombre:nombre,
          estado:estado,
          funcionesPuesto:funcionesPuesto,
          motivoObservado: motivoObservado,

        }

      })
        .afterClosed()

    }

    watchPopupnewpuestoperfil(id: any, nombre:any, categoria:any, estado: any, funcionesPuesto: any, motivoObservado: any){
      this.dialogo.open(DialogVerperfilpuestoComponent, {
        maxWidth: '350vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '50%',
        disableClose: true,
        data: {
          titulo: `Ver Puesto Perfil`,
          id:id,
          categoria:categoria,
          nombre:nombre,
          estado:estado,
          funcionesPuesto:funcionesPuesto,
          motivoObservado: motivoObservado,

        }

      })
        .afterClosed()


    }

    btndarconformidad(){
      this.nuevasolicitud = 4;
      //conotrol nombre del puesto
      this.locknamepuesto = true;
      this.lockForm = false;
      //control funcion del puesto
      this.lockfuncionpuesto = true;
      this.showdarconf = false;
      this.showAprob = true;

    }
    btnAprobar(){
      this.nuevasolicitud = 3;
      this.lockObs = false;
      this.showbtnobs = false;
      this.showdarconf = true;
      this.showAprob = false;
    }
    editarSolicitud(){

    }

}
