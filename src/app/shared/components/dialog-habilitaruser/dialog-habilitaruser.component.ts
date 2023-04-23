import { Component,OnInit, Inject, Optional, Self, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl, NgControl, FormGroupDirective } from '@angular/forms';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AssetService } from '../../services/asset.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemePalette } from '@angular/material/core';
import { Subject,ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { vacaRoutingModule } from '../../../modules/vaca/vaca-routing.module';
import { async } from '@angular/core/testing';

export interface DialogData{
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

export interface Option {
  name: string;
  value: number;
  checked: boolean;
}

@Component({
  selector: 'app-dialog-habilitaruser',
  templateUrl: './dialog-habilitaruser.component.html',
  styleUrls: ['./dialog-habilitaruser.component.css']
})
export class DialogHabilitaruserComponent implements OnInit {
  formulario!: FormGroup;
  public nombreusertxt: string='';
  public nombrecompleto: string ='';
  public nombre: string ='';
  public ApellPaternotxt: string ='';
  public ApellMaternotxt: string = '';
  public Idperfilint:any = [];
  public Idperfilint2: any = [];
  public logintxt: string='';
  public emailtxt: string='';
  stamanenombreuser = new FormControl('');
  stamaneappaternouser = new FormControl('');
  stamaneaapmaternouser = new FormControl('');
  stmaneperfil = new FormControl('');
  stamalogin = new FormControl('');
  stamaemail = new FormControl('');
  toppings = new FormControl('');
  toppings2 = new FormControl('');
  public listarperfilapp: any = [];
  public msgrespuesta: string='';
  public isedit: boolean = false;
 public btnguar: string = 'Guardar';

 /* usuarios existentes */
 myControlSolicitante = new FormControl('');
 stmaneperfil2 = new FormControl('');
 public loginusertxt: string ='';
 public isLoading: boolean = false;
 public listarlogin: any = [];
 public codigoempleadorpta: string ='';
 public loginrpta: string='';
 public nombreloginrpta: string ='';
 public _mensajerpta: string = '';

 public showlistarperfil: boolean=false;
 public searchname: string ='';
 public idempladoselect: number=0;
 public idempleado: number=0;
 public __this = this;
 public showalerttrue: boolean = false;
 public showalertfalse: boolean= false;
 idusuario: number =0;
 showhabilitar: boolean= false;
 showcrearuser: boolean = false;
 public idsValue: string;
 checkedradio: boolean= true;
 showbtnhabilitaruser: boolean = false;
 showmsgrpta: boolean = false;

  constructor(
    public dialogo: MatDialogRef<DialogHabilitaruserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private AssetService: AssetService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.formulario = this.fb.group({
      stamanenombreuser: this.stamanenombreuser,
      stamaneappaternouser: this.stamaneappaternouser,
      stamaneaapmaternouser: this.stamaneaapmaternouser,
      stmaneperfil: this.stmaneperfil,
      stamalogin: this.stamalogin,
      stamaemail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      stmaneperfil2: this.stmaneperfil2,
     myControlSolicitante: this.myControlSolicitante,
      toppings: this.toppings,
      toppings2: this.toppings2,
     // stamaneappaternouser: this.stamaneappaternouser,

      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });
    this.flistarperfil();

    this.nombrecompleto = this.data.nombre;
    let nombres = (this.nombrecompleto).split(' ');
    this.nombre = '';
    this.ApellPaternotxt = nombres[nombres.length - 2];
    this.ApellMaternotxt = nombres[nombres.length - 1];
    for(let i = 0; i < nombres.length - 2; i++){
      this.nombre += ' ' + nombres[i];
    }
   // console.log('nombre',nombre);
    //console.log('ApellidoPaterno',Apeparterno);
    //console.log('Apellidomaterno',Apematerno);

   // console.log('NombreSplit',nombre);
    this.idempleado = this.data.idEmpleado;
    console.log('Idempleado',this.idempleado );
    //this.idempleado = this.data.idEmpleado;
    console.log('Id y Nombre empleado',this.idempleado,this.nombrecompleto);
    this.nombrecompleto
    this.showhabilitar = true;

  }
  cerrarDialogo(): void {
    this.dialogo.close(false);
  }

  flistarperfil(){
    this.AssetService.getlistarperfil().subscribe((res:any)=>{
    this.listarperfilapp = res;
    console.log('listaperfil',this.listarperfilapp);
    });
  }

  displayFnSolicitante(user: any): string {
    console.log('aaabcdf',user);
    this.idempladoselect = user.Id;
    console.log('idtrabajador',this.idempladoselect);return user ? user.Nombre: '';

  }
  getlogin(user: any){
    this.nombreloginrpta = user.NombreCompleto;
    this.loginrpta = user.Login;
    this.idusuario = user.Id;
    console.log('data-user', user);
    console.log('id-usuario', this.idusuario);
  if(user.Login == null || user.Login ==''){
    console.log('loginaa',this.loginrpta);
    this.showalertfalse = true;
    this._mensajerpta = "NO SE ENCONTRO REGISTRO, FAVOR DE SELECCIONAR LA OPCIÓN DE NUEVO USUARIO"; //
    this.showlistarperfil = false;
  }else{
    this.showalerttrue = true
    this.showlistarperfil = true;
    this._mensajerpta = this.nombreloginrpta +", SI REGISTRA LOGIN";

    //this.showalertfalse = true;

    console.log('loginelseaaa',this.loginrpta);
    console.log('respuestaaaaa',this._mensajerpta);
  }

}
  chanetrabajador(e: any){
    console.log('buscar-trabajador',e);
    this.getlogin(e);
    this.searchname = e;
    if(this.nombrecompleto == null || this.nombrecompleto ==''){
      this.showmsgrpta = true;
      this._mensajerpta =='No registra usuario, seleccionar la opción de nuevo usuario'
    }else{
      this.showmsgrpta = false;

    }

   // this.idempleados = e.Id;
    //console.log('Id-Empleados', this.idempleados);

    }

 radioChane(e: any){
      console.log('value-radio',e.value);
      if(e.value == 1){
        this.formulario.controls['myControlSolicitante'].enable();
        this.formulario.controls['stamalogin'].disable();
        this.showhabilitar = true;
        this.showcrearuser = false;
        this.showlistarperfil = true;

      }

      if(e.value == 2){
        this.showcrearuser = true;
        this.showhabilitar = false;
        this.formulario.controls['myControlSolicitante'].disable();
        this.showlistarperfil = false;
       // this.formulario.controls['toppings2'].disable();

      }

    }

  /*  reset(){
      this.idsValue = '';
    }*/

   /* Onclick(){
      if(this.nombrecompleto == null || this.nombrecompleto ==''){
        this.showmsgrpta = true;
        this._mensajerpta =='No registra usuario, seleccionar la opción de nuevo usuario'
      }else{
        this.showmsgrpta = false;

      }

    }*/
  searchloginuser(){
    this.isLoading = true;
    var _nombre: string = this.searchname;
    this.AssetService.getbuscarusertoll(_nombre).subscribe((res: any)=>{
      this.listarlogin = res;
      if(this.listarlogin == null || this.listarlogin == ''){
        this.showalertfalse = true;
      }
      if(this.nombrecompleto == null || this.nombrecompleto ==''){
        this.showmsgrpta = true;
        this._mensajerpta =='No registra usuario, seleccionar la opción de nuevo usuario'
      }else{
        this.showmsgrpta = false;
      }
      if(this.idusuario == null || this.idusuario ==undefined){
        this.showmsgrpta = true;
        this._mensajerpta =='No registra usuario, seleccionar la opción de nuevo usuario'
      }
      console.log('Listar-personal-login', this.listarlogin);
      this.isLoading = false;
    });
  }
  chaneperfil(e: any){
    //console.log('idperfiltoll', e.value);
    this.Idperfilint = e.value;
    console.log('idperfiltoll', this.Idperfilint);
  }
  chaneperfil2(e:any){
    this.Idperfilint2 = e.value;
    console.log('idperfiltoll2', this.Idperfilint2);
    this.showbtnhabilitaruser = true;

  }
  chaneUser(e: any){
    console.log('buscar-user',e);
   // this.searchname = e.value;
  }


 /* searchloginuser(){
    var _nombre: string = this.loginusertxt;
    this.AssetService.getbuscarusertoll(_nombre).subscribe((res: any)=>{
      this.listarlogin = res;
    if(this.listarlogin == null){
      this._mensajerpta = "NO SE ENCONTRO REGISTRO" //
      this.showlistarperfil= false;
      }else{
          this.codigoempleadorpta = res[0].Codigo;
          this.loginrpta = res[0].Login;
          this.nombreloginrpta = res[0].Nombre;
          console.log('toll-login',this.listarlogin);
          console.log('login',this.loginrpta);
          console.log('NOmbre-login',this.nombreloginrpta);
          this.bootstrapNotifyBarService.notifyWarning('Usuario Detectado');
          this._mensajerpta = "Login registrado de:" + this.nombreloginrpta;
          console.log('mensaje',this._mensajerpta);
          this.showlistarperfil= true;
      }
    });
  }*/


async  CrearPerfil(){
      var data ={
        login: this.logintxt,
        nombre: this.nombre,
        apellidoPaterno: this.ApellPaternotxt,
        apellidoMaterno: this.ApellMaternotxt,
        email: this.emailtxt,
        listPerfiles : this.Idperfilint,
      }
      console.log('EnviaDatoscrear user',data);
      this.AssetService.postcrearuser(data).subscribe((res:any)=>{
        console.log('respuesta',res);
        this.msgrespuesta = res.mensaje;
        this.bootstrapNotifyBarService.notifyWarning(this.msgrespuesta);
        this.dialogo.close(false);
      });
   //	LUIS ALEJANDRO CORDOVA CAPCHA	USUARIO: lcorcapcha
   //	LUIS ALFREDO HERRERA HURTADO USUARIO: lcorcapcha
  //	JAVIER ALFREDO LOARTE LEIVA

  }
  async btnhabiltiaruser(){
    var data = {
      idUsuario: this.idusuario,
      listPerfiles : this.Idperfilint2,
      idEmpleado: this.idempleado,
    }
    console.log('habilitar-data-user',data);
      this.AssetService.postdarAccesouser(data).subscribe((res: any)=>{
      this.bootstrapNotifyBarService.notifyWarning('Usuario activado correctamente');
      this.dialogo.close(false);
    });


}

}
