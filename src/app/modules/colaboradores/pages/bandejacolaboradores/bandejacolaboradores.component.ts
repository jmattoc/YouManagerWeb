import { Component, OnInit } from '@angular/core';
import { StyleDirective } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ListarbandejaColaboradoresDetalleResponse } from '@core/models/Colaboradores.interface';
import { DialogHabilitaruserComponent } from '@shared/components/dialog-habilitaruser/dialog-habilitaruser.component';
import { DialogHabilitarusercolaboradoresComponent } from '@shared/components/dialog-habilitarusercolaboradores/dialog-habilitarusercolaboradores.component';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { environment } from 'src/environments/environment';
import {Colaboradorservice} from '../../services/Colaboradores.service';

export interface verDialogData{
  titulo: string;
  mensaje: string;
  codigo: string;
  aprobador: string;
  cantidadDias:any;
  empleado: string;
  estado: any;
  fechaInicio:string;
  fechaFin: string;
  idEmpleado:any;
  idEstado: number;
  idTipoAusencia: number;
  motivoRechazo: string;
  tipoAusencia:string;
  comentario: string;
  id: number;
  Login: string;
  nombre: string;

}

@Component({
  selector: 'app-bandejacolaboradores',
  templateUrl: './bandejacolaboradores.component.html',
  styleUrls: ['./bandejacolaboradores.component.css']
})
export class BandejacolaboradoresComponent implements OnInit {
  matexpansionpanelfiltro: boolean = true;
  public listartrabajadoresv2: ListarbandejaColaboradoresDetalleResponse;
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  codsolicitud: string='';
  public CIPtxt: string ='';
  public nroDni: string ='';
  stamanecip = new FormControl('');
  public apellinombrestxt: string ='';
  stamaneapellinombres = new FormControl('');
  stamanedni = new FormControl('');
  isLoading: boolean= false;
  columnas = ['stmenu','stsolicitud','stcodigo','stnombre','stnroDocumento','stpersonaLider','stcorreoCorporativo','sttelefonoCorporativo','login'];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Colaboradorservice: Colaboradorservice,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
      stamanecip : this.stamanecip,
      stamaneapellinombres: this.stamaneapellinombres,
      stamanedni: this.stamanedni,

    });
    this.searchperfil(1,10);
  }

  searchperfil(page: number, size:number){
    this.isLoading = true;
      var data={
        page: page,
        size: size,
        nombre: this.apellinombrestxt,
        nroDocumento:this.nroDni,
        cip: this.CIPtxt,
      }
      console.log('data-paginado-trabaj', data);
      this.Colaboradorservice.postpaginadotrabajador(data).subscribe((res: any)=>{
        this.isLoading = false;
      this.listartrabajadoresv2 = res;
      console.log('tablav',this.listartrabajadoresv2);
      }, error => this.isLoading = false);


  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  CrearUser(id: any, nombre: string){
    this.dialogo.open(DialogHabilitaruserComponent, {
      maxWidth: '350vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '50%',
      disableClose: true,
      data: {
        titulo: `HABILITAR USUARIO`,
        nombre: nombre,
        idEmpleado:id,

      }

    });


  }
  HabilitarUser(id: any, empleado: string, Login: string){
    this.dialogo.open(DialogHabilitarusercolaboradoresComponent, {
      maxWidth: '350vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '50%',
      disableClose: true,
      data: {
        titulo: `HABILITAR USUARIO`,
        empleado: empleado,
        idEmpleado:id,
        Login:Login,

      }

    });
  }

  verSolicitud(idSolicitud: number){
   var url = `${localStorage.getItem('dominioweb')}/contrato/reg/${idSolicitud}/editar`
    window.open(url, '_blank').focus();
  }

}
