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
export interface DialogData{
  titulo: string;
  mensaje: string;
  empleado: string;
  idEmpleado:any;
  id:number;
  Login: string;
  nombre: string;
}

@Component({
  selector: 'app-dialog-habilitarusercolaboradores',
  templateUrl: './dialog-habilitarusercolaboradores.component.html',
  styleUrls: ['./dialog-habilitarusercolaboradores.component.css']
})
export class DialogHabilitarusercolaboradoresComponent implements OnInit {
  formulario!: FormGroup;
  myControlSolicitante = new FormControl('');
  stmaneperfil2 = new FormControl('');
  public loginusertxt: string ='';
  public isLoading: boolean = false;
  public listarlogin: any = [];
  public codigoempleadorpta: string ='';
  public loginrpta: string='';
  public nombreloginrpta: string ='';
  public _mensajerpta: string = '';
  public Idperfilint2: number = 0;
  public showlistarperfil: boolean=false;
  public listarperfilapp: any = [];
  public idempladoselect: number=0;
  public searchname: string ='';
  public idempleados: number=0;
  public __this = this;
  public showalerttrue: boolean = false;
  constructor(
    public dialogo: MatDialogRef<DialogHabilitarusercolaboradoresComponent>,
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

     // stamaneappaternouser: this.stamaneappaternouser,
     myControlSolicitante:this.myControlSolicitante,
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });
    this.formulario.patchValue({
      /* myControlSolicitante: {
         nombre: this.solicitud?.stUsuarioRegistro,
         Id: this.solicitud?.fkUsuarioRegistro
        // nombre: this.searchname,
       }*/
     });
    this.flistarperfil();
    this.loginrpta = this.data.Login;
    this.nombreloginrpta = this.data.nombre;

    if(this.loginrpta != null || this.loginrpta == ''){
       this.showalerttrue = true;
    }
  }
  flistarperfil(){
    this.AssetService.getlistarperfil().subscribe((res:any)=>{
    this.listarperfilapp = res;
    console.log('listaperfil',this.listarperfilapp);
    });
  }
  chaneperfil(e: any){
    console.log('idperfil', e.value);
  }
  chaneperfil2(e:any){

  }
  displayFnSolicitante(user: any): string {
    console.log('aaabcdf',user);
    this.idempladoselect = user.Id;
    console.log('idtrabajador',this.idempladoselect);return user ? user.Nombre: '';

  }
  getlogin(user: any){
      this.nombreloginrpta = user.NombreCompleto;
      this.loginrpta = user.Login;
    if(user.Login == null || user.Login ==''){
      console.log('login',this.loginrpta);
      this._mensajerpta = "NO SE ENCONTRO REGISTRO"; //
      this.showlistarperfil= false;
    }else{
      this._mensajerpta = "Login registrado de:" + this.nombreloginrpta;
      this.showlistarperfil= true;
      console.log('loginelse',this.loginrpta);
      console.log('respuesta',this._mensajerpta);
    }

  }
  chanetrabajador(e: any){
    console.log('buscar-trabajador',e);
    this.getlogin(e);
    this.searchname = e;
    this.idempleados = e.Id;
    console.log('IDEMPLEADO-SELECIOANDO-*INPUT', this.idempleados);

    }
  searchloginuser(){
    this.isLoading = true;
    var _nombre: string = this.searchname;
    this.AssetService.getbuscarusertoll(_nombre).subscribe((res: any)=>{
      this.listarlogin = res;
      console.log('Listar-personal-login', this.listarlogin);
      this.isLoading = false;
    });
  }


  cerrarDialogo(): void {
    this.dialogo.close(false);
  }


}
