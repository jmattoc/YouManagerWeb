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
import { adminservice } from '../../services/admin.service';

interface Foodestado {
  value: boolean;
  viewValue: string;
};

@Component({
  selector: 'app-newcategoria',
  templateUrl: './newcategoria.component.html',
  styleUrls: []
})
export class NewcategoriaComponent implements OnInit {
  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  codsolicitud: string;
  estadoactivo: number =3970;
  isLoading = false;
  stmaneestado = new FormControl('');
  stamanewcategoria = new FormControl('');
  public showregiscateg: boolean = true;
  ideditmaestrodetalle: number;
  /*ngmodel */
  public estadoint: number;
  public newcategoriatxt: string;
  public estadointtxt: boolean =true;
  public idMaestroDetalle:number;

  /* variables id de control combos*/
 private idestdo:number;

 /*Listar de servicio */
 //public lstEstadoCel: any = [];
 public lstEstadonewcatgoria: any = [];
 public titulocategoria: string = 'NUEVA CATEGORÍA';
 public subtitulo: string = 'Crear categoría';
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
      this.titulocategoria ='EDITAR CATEGORÍA';
      this.subtitulo ='Editar categoría';
      this.btnguar ='Guardar';
      this.showestado = false;
    }

   }

  ngOnInit(): void {

    this.formularionewcategoria = this.fb.group({
      stmaneestado: this.stmaneestado,
      stamanewcategoria: this.stamanewcategoria,
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });

    this.listarestadonewcategoria();



  }
  estadocategoria: Foodestado[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'},
  ];



  obtenerdatosmaestrodetalle(id){
    this.adminservice.geteditaradmin(id).subscribe((res: any) => {
      this.newcategoriatxt = res.stNombre;
      this.estadointtxt = res.blActivo;
      this.idMaestroDetalle = res.idMaestroDetalle;
     console.log('activo', this.estadointtxt);

    });
  }
  listarestadonewcategoria(id=31){
    this.adminservice.getlistarestadocategoria(id).subscribe((res: any) => {
      this.lstEstadonewcatgoria = res;

    });
  }

  async guardarcategoria(){
    if (this.formularionewcategoria.invalid) {
      this.formularionewcategoria.markAllAsTouched();
      return;
    }
    if(this.isedit){
      var dataedit ={
        idMaestroDetalle: this.idMaestroDetalle,
        stNombre: this.newcategoriatxt,
        blActivo: this.estadointtxt,
      }
      console.log('edit', dataedit)
      this.adminservice.putupdatemaestrodetalle(dataedit).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Se Actualizo corresctamente.');
        this.router.navigate(["/puestoperfil/categoria"]);
      });
    }else{
      var data = {
        fkMaestro:2,
        stNombre:this.newcategoriatxt,
        blActivo: this.estadointtxt,
      }
      this.adminservice.postguardarcategoria(data).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Se Creo la nueva categoría.');
        this.router.navigate(["/puestoperfil/categoria"]);

      });

    }

  }

  chaneestadocel(e: any){
    this.idestdo = e.value;

  }
  btnnewcategoria(){

  }


}
