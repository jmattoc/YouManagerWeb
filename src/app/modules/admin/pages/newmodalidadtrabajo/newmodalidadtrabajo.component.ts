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
import { adminservice } from '../../services/admin.service';

interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-newmodalidadtrabajo',
  templateUrl: './newmodalidadtrabajo.component.html',
  styleUrls: []
})
export class NewmodalidadtrabajoComponent implements OnInit {

  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  formularionewtipotrabajador!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  formulario!: FormGroup;
  codsolicitud: string;
  estadoactivo: number =3970;
  isLoading = false;
  stmaneestado = new FormControl('');
  stamanewcategoria = new FormControl('');
  stamanewtipotrabajador = new FormControl('');
  public showregiscateg: boolean = true;
  /*ngmodel */
  public estadoint: number;
  public newcategoriatxt: string;
  public newtipotrabajadoratxt: string;
  public idMaestroDetalle:number;
  public estadointtxt: boolean=true;

  /* variables id de control combos*/
 private idestdo:number;

 /*Listar de servicio */
 //public lstEstadoCel: any = [];
 public lstEstadonewcatgoria: any = [];
 public titulocategoria: string = 'NUEVA MODALIDAD DE TRABAJO';
 public subtitulo: string = 'Crear modalidad de trabajo';
 public isedit: boolean = false;
 public btnguar: string = 'Guardar';
 public showestado: boolean = true;

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
  ) {
    //console.log('parametro',this.activatedRoute.snapshot.paramMap.get('id'));
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null){
      this.obtenerdatosmaestrodetalle(id);
      this.isedit = true;
      this.titulocategoria ='EDITAR MODALIDAD DE TRABAJO';
      this.subtitulo ='Editar modalidad de trabajo';
      this.btnguar ='Editar';
      this.showestado = false;
    }
  }

  ngOnInit(): void {

    this.datosBasicosFormGroup = this._formBuilder.group({
    });
    this.formularionewtipotrabajador = this.fb.group({
      stmaneestado: this.stmaneestado,
      stamanewtipotrabajador: this.stamanewtipotrabajador,
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });

    this.listarestadonewcategoria();
  }
  obtenerdatosmaestrodetalle(id){
    this.adminservice.geteditaradmin(id).subscribe((res: any) => {
      //console.log('aaa', res);
      this.newtipotrabajadoratxt = res.stNombre;
      this.estadointtxt = res.blActivo;
      this.idMaestroDetalle = res.idMaestroDetalle;

    });
  }

  listarestadonewcategoria(id=31){
    this.adminservice.getlistarestadocategoria(id).subscribe((res: any) => {
      this.lstEstadonewcatgoria = res;
     // console.log('Estdo-categoria', this.lstEstadonewcatgoria);
    });
  }

  chaneestadocel(e: any){
    this.idestdo = e.value;
   // console.log('id-estado', e.value);
  }

  async guardarmodtrabajador(){
    if (this.formularionewtipotrabajador.invalid) {
      this.formularionewtipotrabajador.markAllAsTouched();
      return;
    }
    if(this.isedit){
      //console.log('idmaestrodetalle',this.idMaestroDetalle);
      var dataedit ={
        idMaestroDetalle: this.idMaestroDetalle,
        stNombre: this.newtipotrabajadoratxt,
        blActivo: this.estadointtxt,
      }
      this.adminservice.putupdatemaestrodetalle(dataedit).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifyWarning('Se Actualizo corresctamente.');
        this.router.navigate(["/administracion/modtrabajo"]);
      });
    }else{
      var data = {
        fkMaestro:4,
        stNombre:this.newtipotrabajadoratxt,
        blActivo: this.estadointtxt,
      }
      this.adminservice.postguardarmodtrabajador(data).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifyWarning('Se creo correctamente la modalidad de trabajo.');
        this.router.navigate(["/administracion/modtrabajo"]);

      });

    }


  }


}
