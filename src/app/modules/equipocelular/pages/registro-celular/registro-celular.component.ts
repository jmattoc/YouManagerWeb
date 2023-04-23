import { Component, Inject, OnInit,Input, Self, Optional, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NgControl, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { ThemePalette } from '@angular/material/core';
import {equipocelularservice} from '@modules/equipocelular/services/equipocelular.service';
import { MatSelect } from '@angular/material/select';
import { Subject,ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { DialogoConfirmaregistrocelularComponent } from '@shared/components/dialogo-confirmaregistrocelular/dialogo-confirmaregistrocelular.component';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormContraComponent } from '../../../contra/pages/form-contra/form-contra.component';
import { DialogInicioActivoComponent } from '@shared/components/dialog-inicio-activo/dialog-inicio-activo.component';
import { BlockBlobQueryOptions } from '@azure/storage-blob';



interface Food {
  value: string;
  viewValue: string;
};
interface Foodcel {
  value: string;
  viewValue: string;
};
export interface DialogData {
  titulo: string;
  mensaje: string;
  codigocel: string;
  categoria:string;
  nombre: string;
  estado: string;
  funcionesPuesto: string;
  motivoObservado: string;
  id:number;
  idcodigoactivo: string;
}
export interface Task {
  id:string;
  name: string;
  completed: boolean;
  color: ThemePalette;
  selected: boolean;
  subtasks?: Task[];
  subtaskstwo?: Task[];
}

@Component({
  selector: 'app-registro-celular',
  templateUrl: './registro-celular.component.html',
  styleUrls: [],
})

export class RegistroCelularComponent implements OnInit, AfterViewInit, OnDestroy {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;


  protected _onDestroy = new Subject<void>();

  ngAfterViewInit() {
    this.filtermarcacel();
    this.filtermarcalaptop();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  currentDate = new Date();
  matexpansionpanelfiltro: boolean = false;
  datosBasicosFormGroup!: FormGroup;
  datosBasicosFormGroupdirec!: FormGroupDirective;
  datosCpuBasicosFormGroup!:FormGroup;
  idmarcacel = 1;
  stamanecodregistro =new FormControl('');
  stamanecodinventario = new FormControl('');
  stamanemonitorpc = new FormControl('');
  stamanecodinventariocpu = new FormControl('');
  stamanefechaalta = new FormControl('');
  stmanetmo = new FormControl('');
  stmanetamanolaptop = new FormControl('');
  stmanememorialaptop = new FormControl('');
  stmanediscodurolaptop = new FormControl('');
  stmaneserielaptop = new FormControl('');
  stmanecapmemoriapc = new FormControl('');
  stmanediscoduro = new FormControl('');
  stmanetipocpu = new FormControl('');
  stmaneestado = new FormControl('');
  stmanemarcalaptop = new FormControl('');
  stmanetipoactivo = new FormControl('');
  stmanetipoactivog = new FormControl('');
  stmanemarcacelular = new FormControl('');
  stmanemodelocelular = new FormControl('');
  stmanememorycard = new FormControl('');
  stmanenroserie = new FormControl('');
  stmaneacesorioscelu = new FormControl('');
  stmanecheckedacce =new FormControl('')
  stmaneimei = new FormControl('');
  stmanemaoperador = new FormControl('');
  stmanenrosim = new FormControl('');
  stmanetarifa = new FormControl('');
  stmanecategoria = new FormControl('');
  stmaneaccesorioslaptop = new FormControl('');
  stmaneaccesorioslaptop1 = [false];
  stmaneaccesorioslaptop2 = [false];
  stmaneaccesorioslaptop3 = [false];
  stmaneaccesorioscpu = new FormControl('');º
  stmaneaccesorioscpu1 = [false];
  stmaneaccesorioscpu2 = [false];
  stmaneaccesorioscpu3 = [false];
  public marcalaptopFilterCtrl: FormControl = new FormControl();
  public marcacelFilterCtrl : FormControl = new FormControl();
  public modelocelFilterCtrl : FormControl = new FormControl();
  isLoading = false;


  public maxDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  public minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());

  public lstEstadoCel: any = [];
  public lstmarcalaptop1: any = [];
  public lsttipocpulaptop: any = [];
  public lsttipoactivo: any = [];
  public lstoperadorcel: any = [];
  public filterlstequipocelular: any =new ReplaySubject(1);
  public filterlstmodelocelular: any =new ReplaySubject(1);
  public filterlstmarcalaptop: any = new ReplaySubject(1);

  public lstmarcalaptop: any [];
  public lstequipocelular: any [];
  public lstmodelocelular: any = [];
  public lstmodeloscelulartemp: any = [];
  public lstcategoriaemplecel: any [];
  public idtipo:number;

 /*ngmodel */
 public discodurolaptoptxt: string;
 public codinventariotxt: string;
 public selectobtionlaltop: string;
 public selectIdmarcatxt: string;
 public codinventariocputxt: string;
 public fechaaltatxt: Date = new Date();
 public tmotxt: string;
 public tamanolaptoptxt: string;
 public memorialaptoptxt: string;
 public estadoint: number;
 idtipoactivopclaptop: number=0;
 idactivocelular:number;
 idactivolaptop:number;
 public tipoactivo: number;
 public stmarcacelular: number;
 public stmodelocelular: number;
 public capMemory: string;
 public nroSerie: string;
 public emaitxt: string;
 public idOperador: number;
 public nrosimtxt: string;
 public tarifaplana: string;
 public idcategoriaint: number;
public iduser: number = 0;
public tituloinventario: string='';
public titulolegend: string='';
public monitortxt: string;
public capacmemoriatxt: string;
public discodurotxt: string;
public tipocputxt: string;
public colorlaptoptxt: string;
public serielaptoptxt: string;
 //public iduser = localStorage.getItem('id');
 /* variables id de control combos*/
 private idestdo:number;
 private idmarcalaptop: number;
 public idactivo:number;
 public idtipoactivo:number = 0;
 private idmarcacelu: number;
 private idmodelocelu: number;
 private idoperadorcelular: number;
 private idcateogira: number;
 private accesorios: string;
 /*Off on*/
 public showasignaciones: boolean = false;
 public showpenalidades: boolean = false;
 public showregiscel: boolean = false;
 public showregistrarcpulaptop: boolean=false;
 public showtipoactivo: number;
 public showdatossecundarios: boolean= false;
 public showdatosequipo: boolean = false;
 public showdatosoperador: boolean = false;
 public showcontroltipoactivo: boolean = false;
 public showmattoolbarcodigoactivo:boolean = false;
/* edit registro activos*/
idedit : number;

 public lstEstadonewcatgoria: any = [];
 public titulo: string = 'INVENTARIO DE ACTIVO';
 public codautogenerado: string ='';
 public nombretipo: string;
 public subtitulo: string = 'Registrar activos';
 public isedit: boolean = false;
 public isver: boolean = false;
 public btnguar: string = 'Guardar';
 public showbtneditar: boolean = false;
 public showbtnguardar: boolean = false;

 public isLoadData: boolean = false;
 public id: string='';
 task: Task = {
  id:"",
  selected: false,
  name: 'Todos los Accesorios',
  completed: false,
  color: 'primary',
  subtasks: [
    {id :"3967" ,name: 'Cargador de Batería', completed: false, color: 'primary', selected: false},
    {id :"3968", name: 'Audifonos', completed: false, color: 'accent', selected: false},
    {id :"3969",name: 'Lápiz táctil', completed: false, color: 'warn', selected: false},
  ],
  subtaskstwo: [
    {id :"4006",name: 'Cargador de Bateria', completed: false, color: 'warn', selected: false},
    {id :"4002" ,name: 'Teclado', completed: false, color: 'primary', selected: false},
    {id :"4003",name: 'Mouse', completed: false, color: 'warn', selected: false},
  ],
};

allComplete: boolean = true;


/*probando rama harold */
  constructor(

    private contratoService: ContraService,
    private equipocelularservice: equipocelularservice,
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    //private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    @Optional() @Self() public ngControl: NgControl
  ) {
     //console.log('parametro',this.activatedRoute.snapshot.paramMap.get('id'));
     const id = this.activatedRoute.snapshot.paramMap.get('id');
     this.id= id;
     //this.idcodigoactivo = this.codautogenerado;

     if(id != null){
      this.obtenerdatosActivos(id);
      this.showmattoolbarcodigoactivo = true;
      this.isedit = true;
      this.titulo ='VER ACTIVO';
      this.subtitulo ='Ver activo';
      this.btnguar ='Guardar';
      this.showbtnguardar = false;
      this.showbtneditar = true;
      this.showasignaciones = true;
      this.showpenalidades = true;
      }else{
          this.OpenPoupinicio();
          this.showbtnguardar= true;
        }

    }

  ngOnInit(): void {

   // console.log('id-uer', this.iduser);
   this.marcalaptopFilterCtrl.valueChanges
   .pipe(takeUntil(this._onDestroy)).subscribe(() =>{this.filtermarcalaptop});

    this.marcacelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtermarcacel();
      });
      this.modelocelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtermodelocel();
      });

    this.stmanemarcacelular.setValue(this.listarequipocelular);
    this.stmanemarcalaptop.setValue(this.listarmarcalaptop);



    this.datosBasicosFormGroup = this._formBuilder.group({
      stamanecodinventario:  this.stamanecodinventario,
      stamanefechaalta: this.stamanefechaalta,
      stmanetmo:this.stmanetmo,
      stmaneestado:this.stmaneestado,
      stmanetipoactivo: this.stmanetipoactivo,
      stmanemarcalaptop: this.stmanemarcalaptop,
      stmanetipoactivog: this.stmanetipoactivog,
      stmanemarcacelular:this.stmanemarcacelular,
      stmanemodelocelular:this.stmanemodelocelular,
      stmanememorycard:this.stmanememorycard,
      stmanenroserie:this.stmanenroserie,
      stmaneacesorioscelu: this.stmaneacesorioscelu,
      stmanecheckedacce:this.stmanecheckedacce,
      stmaneimei:this.stmaneimei,
      stmanemaoperador:this.stmanemaoperador,
      stmanenrosim:this.stmanenrosim,
      stmanetarifa:this.stmanetarifa,
      stmanecategoria:this.stmanecategoria,
      stamanemonitorpc: this.stamanemonitorpc,
      stmanecapmemoriapc: this.stmanecapmemoriapc,
      stmanediscoduro: this.stmanediscoduro,
      stmanetipocpu: this.stmanetipocpu,
      stmanetamanolaptop: this.stmanetamanolaptop,
      stmanediscodurolaptop: this.stmanediscodurolaptop,
      stmanememorialaptop: this.stmanememorialaptop,
      stmaneserielaptop: this.stmaneserielaptop,
      stmaneaccesorioslaptop: this.task.subtaskstwo,
      stmaneaccesorioslaptop1: this.stmaneaccesorioslaptop1,
      stmaneaccesorioslaptop2: this.stmaneaccesorioslaptop2,
      stmaneaccesorioslaptop3: this.stmaneaccesorioslaptop3,
      stmaneaccesorioscpu: this.task.subtasks,
      stmaneaccesorioscpu1: this.stmaneaccesorioscpu1,
      stmaneaccesorioscpu2: this.stmaneaccesorioscpu2,
      stmaneaccesorioscpu3: this.stmaneaccesorioscpu3,
    });
    this.lsitarestadoscelular();
    this.listaroperadorcelular();
    this.listarequipocelular();
    this.listarmodelocelular();
    this.listarcategoriaempleadocel();
    this.listartipoactivo();
    this.listaractivocpulaptops();
    this.listarmarcalaptop();

  }


  btneditarguardar(){
    //console.log('parametroedit',this.activatedRoute.snapshot.paramMap.get('id'));
  }



  lsitarestadoscelular (id=25){
  this.equipocelularservice.getlistarestdocelular(id)
  .subscribe((res: any) => {
    this.lstEstadoCel = res;
    //console.log('Estdo-Cel', this.lstEstadoCel);
  });
  }

  listarmarcalaptop(id=34){
    this.equipocelularservice.getlistarmarcalaptops(id)
    .subscribe((res: any) => {
      this.lstmarcalaptop = res;
      this.filterlstmarcalaptop.next(this.lstmarcalaptop.slice());
     // console.log('marca-laptop', this.lstmarcalaptop);
    });

  }
  listaractivocpulaptops(id=33){
    this.equipocelularservice.getlistartipodeactivocpulaptop(id)
    .subscribe((res: any) => {
      this.lsttipocpulaptop = res;
      //console.log('cpu o laptop', this.lsttipocpulaptop);
    });
  }
  listartipoactivo(id = 32){
    this.equipocelularservice.getlistartipoactivo(id).subscribe((res: any) => {
      this.lsttipoactivo = res;
      //console.log('TipoActivo', this.lsttipoactivo);
    });

  }
  protected filtermarcalaptop(){
    var __this = this;
    if (!this.lstmarcalaptop) {
      return;
    }
    let search = this.marcalaptopFilterCtrl.value;
    if (!search) {
      this.filterlstmarcalaptop.next(this.lstmarcalaptop.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filterlstmarcalaptop.next(
      __this.lstmarcalaptop.filter(function (elem: any) {
        return elem.stNombre.toLowerCase().indexOf(search) > -1;
      })
    );
  }
  protected filtermarcacel(){
    var __this = this;
    if (!this.lstequipocelular) {
      return;
    }
    let search = this.marcacelFilterCtrl.value;
    if (!search) {
      this.filterlstequipocelular.next(this.lstequipocelular.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filterlstequipocelular.next(
      __this.lstequipocelular.filter(function (elem: any) {
        return elem.stNombre.toLowerCase().indexOf(search) > -1;
      })
    );
  }

  protected filtermodelocel(){
    var __this = this;
    if (!this.lstmodelocelular) {
      return;
    }
    let search = this.modelocelFilterCtrl.value;
    if (!search) {
      this.filterlstmodelocelular.next(this.lstmodelocelular.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filterlstmodelocelular.next(
      __this.lstmodelocelular.filter(function (elem: any) {
        return elem.stNombre.toLowerCase().indexOf(search) > -1;
      })
    );
  }
  listaroperadorcelular(id=26){
    this.equipocelularservice.getlistoperadorcelular(id).subscribe((res: any) => {
      this.lstoperadorcel = res;
      //console.log('Operador-Cel', this.lstoperadorcel);
    });

  }
  listarequipocelular(id=27){
    this.equipocelularservice.getlistequipocelular(id).subscribe((res: any) => {
      this.lstequipocelular = res;
      this.filterlstequipocelular.next(this.lstequipocelular.slice());
      //console.log('Euipocel', this.lstequipocelular);
    });
  }
  listarmodelocelular(id=28){
    this.equipocelularservice.getlistarmodelocelular(id)
    .subscribe((res: any) => {
      this.lstmodelocelular = res;
      this.lstmodeloscelulartemp = res;
      this.filterlstmodelocelular.next(this.lstmodelocelular.slice());
      //console.log('categoria', this.lstmodelocelular);
    });

  }
  listarcategoriaempleadocel(id=29){
    this.equipocelularservice.getlistarcategoriaempleadocel(id).subscribe((res: any) => {
      this.lstcategoriaemplecel = res;
      //console.log('modelocelular', this.lstcategoriaemplecel);
    });

  }
  chanemarcacel(e: any){
   // console.log('id-marcacelu', e.value);
    this.idmarcacelu = e.value;
   // console.log('modelo', this.lstmodeloscelulartemp);
   this.lstmodelocelular = this.lstmodeloscelulartemp.filter(function (elem: any){return elem.fkMaestroDetalle == e.value});
   this.filterlstmodelocelular.next(this.lstmodelocelular.slice());
   //console.log('modelo2', this.lstmodelocelular);

  }
  chanemodelocel(e: any){
    this.idmodelocelu = e.value;
   // console.log('idmodelo-celu', e.value);

  }
  editarcontrol(){
      if(this.idtipo== 1){
        this.datosBasicosFormGroup.controls['stmanemarcacelular'].enable();
        this.datosBasicosFormGroup.controls['stmanemodelocelular'].enable();
        this.datosBasicosFormGroup.controls['stmanememorycard'].enable();
        this.datosBasicosFormGroup.controls['stmanenroserie'].enable();
        this.datosBasicosFormGroup.controls['stmaneacesorioscelu'].enable();
        this.datosBasicosFormGroup.controls['stmaneimei'].enable();
        this.datosBasicosFormGroup.controls['stmanemaoperador'].enable();
        this.datosBasicosFormGroup.controls['stmanenrosim'].enable();
        this.datosBasicosFormGroup.controls['stmanetarifa'].enable();
        this.datosBasicosFormGroup.controls['stmanecategoria'].enable();
        this.datosBasicosFormGroup.controls['stamanecodinventario'].enable();
        this.datosBasicosFormGroup.controls['stamanefechaalta'].enable();
        this.datosBasicosFormGroup.controls['stmanetmo'].enable();
        this.datosBasicosFormGroup.controls['stmaneestado'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].enable();
      }else{
        this.idtipoactivo =2;
        this.nombretipo = "LAPTOP";
        this.datosBasicosFormGroup.controls['stamanecodinventario'].enable();
        this.datosBasicosFormGroup.controls['stamanefechaalta'].enable();
        this.datosBasicosFormGroup.controls['stmanetmo'].enable();
        this.datosBasicosFormGroup.controls['stmaneestado'].enable();
        this.datosBasicosFormGroup.controls['stmanemarcalaptop'].enable();
        this.datosBasicosFormGroup.controls['stmanetamanolaptop'].enable();
        this.datosBasicosFormGroup.controls['stmanediscodurolaptop'].enable();
        this.datosBasicosFormGroup.controls['stmanememorialaptop'].enable();
        this.datosBasicosFormGroup.controls['stmaneserielaptop'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].enable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].enable();

      }
    this.showbtneditar=false;
    this.showbtnguardar=true;
  }
  obtenerdatosActivos(id){
    this.isLoadData = true;
    var __this = this;
    this.equipocelularservice.postidactivo(id).subscribe((res: any) => {
      //console.log('aaa', res);
      this.idedit = res.id;
      this.idtipo = res.tipo;
      this.codautogenerado = res.codigo;
      this.codinventariotxt = res.codigoInventario;
      this.fechaaltatxt = res.fechaAlta;
      this.tmotxt = res.tmoMeses;
      this.estadoint = res.idEstado;
      var accesorioschk = res.accesorioAdicional.split(',');
     // console.log(accesorioschk);
      if(accesorioschk[0] != ''){
        this.task.subtasks.map(function(elem){ elem.selected = (accesorioschk[0].toString() == elem.id ? true : elem.selected); return elem; });

        this.task.subtaskstwo.map(function(elem){ elem.selected = (accesorioschk[0].toString() == elem.id ? true : elem.selected); return elem; });

        if(accesorioschk[0] == '3967')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].setValue(true);
        if(accesorioschk[0] == '3968')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].setValue(true);
        if(accesorioschk[0] == '3969')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].setValue(true);

        if(accesorioschk[0] == '4006')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].setValue(true);
        if(accesorioschk[0] == '4002')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].setValue(true);
        if(accesorioschk[0] == '4003')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].setValue(true);
      }
      if(accesorioschk[1] != ''){
        this.task.subtasks.map(function(elem){ elem.selected = (accesorioschk[1].toString() == elem.id ? true : elem.selected); return elem; });

        this.task.subtaskstwo.map(function(elem){ elem.selected = (accesorioschk[1].toString() == elem.id ? true : elem.selected); return elem; });

        if(accesorioschk[1] == '3967')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].setValue(true);
        if(accesorioschk[1] == '3968')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].setValue(true);
        if(accesorioschk[1] == '3969')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].setValue(true);

        if(accesorioschk[1] == '4006')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].setValue(true);
        if(accesorioschk[1] == '4002')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].setValue(true);
        if(accesorioschk[1] == '4003')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].setValue(true);
      }
      if(accesorioschk[2] != ''){
        this.task.subtasks.map(function(elem){ elem.selected = (accesorioschk[2].toString() == elem.id ? true : elem.selected); return elem; });

        this.task.subtaskstwo.map(function(elem){ elem.selected = (accesorioschk[2].toString() == elem.id ? true : elem.selected); return elem; });

        if(accesorioschk[2] == '3967')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].setValue(true);
        if(accesorioschk[2] == '3968')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].setValue(true);
        if(accesorioschk[2] == '3969')
          this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].setValue(true);

        if(accesorioschk[2] == '4006')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].setValue(true);
        if(accesorioschk[2] == '4002')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].setValue(true);
        if(accesorioschk[2] == '4003')
          this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].setValue(true);
      }

      if(this.idtipo== 1){
        this.idtipoactivo =1;
        this.stmarcacelular = res.idMarca;
        this.stmodelocelular = res.idModelo;
        this.capMemory = res.capMemory;
        this.nroSerie = res.nroSerie;
        this.emaitxt = res.emei;
        this.idOperador = res.idOperador;
        this.nrosimtxt = res.nroSim;
        this.tarifaplana = res.planTarifa;
        this.idcategoriaint = res.idCategoria;
        this.nombretipo = "CELULAR";
        this.datosBasicosFormGroup.controls['stmanemarcacelular'].disable();
        this.datosBasicosFormGroup.controls['stmanemodelocelular'].disable();
        this.datosBasicosFormGroup.controls['stmanememorycard'].disable();
        this.datosBasicosFormGroup.controls['stmanenroserie'].disable();
        this.datosBasicosFormGroup.controls['stmaneacesorioscelu'].disable();
        this.datosBasicosFormGroup.controls['stmaneimei'].disable();
        this.datosBasicosFormGroup.controls['stmanemaoperador'].disable();
        this.datosBasicosFormGroup.controls['stmanenrosim'].disable();
        this.datosBasicosFormGroup.controls['stmanetarifa'].disable();
        this.datosBasicosFormGroup.controls['stmanecategoria'].disable();
        this.datosBasicosFormGroup.controls['stamanecodinventario'].disable();
        this.datosBasicosFormGroup.controls['stamanefechaalta'].disable();
        this.datosBasicosFormGroup.controls['stmanetmo'].disable();
        this.datosBasicosFormGroup.controls['stmaneestado'].disable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].disable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].disable();
        this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].disable();
      }else{
         this.idtipoactivo =2;
         this.selectIdmarcatxt = res.idMarca;
         this.serielaptoptxt = res.nroSerie;
         this.tamanolaptoptxt = res.accesorioAdicional.split(',')[2];
         this.discodurolaptoptxt = res.accesorioAdicional.split(',')[3]
         this.selectobtionlaltop = res.accesorioAdicional.split(',')[1]
         this.memorialaptoptxt = res.capMemory;
         this.nombretipo = "LAPTOP";
         this.datosBasicosFormGroup.controls['stamanecodinventario'].disable();
         this.datosBasicosFormGroup.controls['stamanefechaalta'].disable();
         this.datosBasicosFormGroup.controls['stmanetmo'].disable();
         this.datosBasicosFormGroup.controls['stmaneestado'].disable();
         this.datosBasicosFormGroup.controls['stmanemarcalaptop'].disable();
         this.datosBasicosFormGroup.controls['stmanetamanolaptop'].disable();
         this.datosBasicosFormGroup.controls['stmanediscodurolaptop'].disable();
         this.datosBasicosFormGroup.controls['stmanememorialaptop'].disable();
         this.datosBasicosFormGroup.controls['stmaneserielaptop'].disable();
         this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop'].disable();
         this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].disable();
         this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].disable();
         this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].disable();


      }

      setTimeout(function(){
        __this.isLoadData = false;
      }, 500);
    });

  }
  chanelidtipoactivo(e: any){
    this.idtipoactivo = e.value;
    //console.log('celu',this.idtipoactivo);
    if(this.idtipoactivo == 1){
      this.tituloinventario ='Registrar equipo Celular';
       this.titulolegend ='CATACTERISTICAS DE CELULARES';
       this.datosBasicosFormGroup.controls['stmanemarcalaptop'].disable();
       this.datosBasicosFormGroup.controls['stmanetamanolaptop'].disable();
       this.datosBasicosFormGroup.controls['stmanediscodurolaptop'].disable();
       this.datosBasicosFormGroup.controls['stmanememorialaptop'].disable();
       this.datosBasicosFormGroup.controls['stmaneserielaptop'].disable();
       this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop'].disable();
       /*CONTROLS PC ENABLED */
       this.datosBasicosFormGroup.controls['stmanemarcacelular'].enable();
      this.datosBasicosFormGroup.controls['stmanemodelocelular'].enable();
      this.datosBasicosFormGroup.controls['stmanememorycard'].enable();
      this.datosBasicosFormGroup.controls['stmanenroserie'].enable();
      this.datosBasicosFormGroup.controls['stmaneacesorioscelu'].enable();
      this.datosBasicosFormGroup.controls['stmaneimei'].enable();
      this.datosBasicosFormGroup.controls['stmanemaoperador'].enable();
      this.datosBasicosFormGroup.controls['stmanenrosim'].enable();
      this.datosBasicosFormGroup.controls['stmanetarifa'].enable();
      this.datosBasicosFormGroup.controls['stmanecategoria'].enable();
      this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop1'].enable();
      this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop2'].enable();
      this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop3'].enable();
     }
     if(this.idtipoactivo == 2){
      //console.log('laptop',this.idtipoactivo);
      this.tituloinventario ='Registrar Laptops';
      this.titulolegend ='CARACTERISTICAS DE LAPTOPS';
      this.datosBasicosFormGroup.controls['stmanemarcacelular'].disable();
      this.datosBasicosFormGroup.controls['stmanemodelocelular'].disable();
      this.datosBasicosFormGroup.controls['stmanememorycard'].disable();
      this.datosBasicosFormGroup.controls['stmanenroserie'].disable();
      this.datosBasicosFormGroup.controls['stmaneacesorioscelu'].disable();
      this.datosBasicosFormGroup.controls['stmaneimei'].disable();
      this.datosBasicosFormGroup.controls['stmanemaoperador'].disable();
      this.datosBasicosFormGroup.controls['stmanenrosim'].disable();
      this.datosBasicosFormGroup.controls['stmanetarifa'].disable();
      this.datosBasicosFormGroup.controls['stmanecategoria'].disable();
      /*CONTROLS LAPTOP ENABLED */
      this.datosBasicosFormGroup.controls['stmanemarcalaptop'].enable();
       this.datosBasicosFormGroup.controls['stmanetamanolaptop'].enable();
       this.datosBasicosFormGroup.controls['stmanediscodurolaptop'].enable();
       this.datosBasicosFormGroup.controls['stmanememorialaptop'].enable();
       this.datosBasicosFormGroup.controls['stmaneserielaptop'].enable();
       this.datosBasicosFormGroup.controls['stmaneaccesorioslaptop'].enable();
       this.datosBasicosFormGroup.controls['stmaneaccesorioscpu1'].enable();
       this.datosBasicosFormGroup.controls['stmaneaccesorioscpu2'].enable();
       this.datosBasicosFormGroup.controls['stmaneaccesorioscpu3'].enable();
    }
    //console.log('Titulo-caractetisticas', this.titulolegend);
  }
  chaneestadocel(e: any){
    this.idestdo = e.value;
    //console.log('id-estado', e.value);
  }
  chaemarcalaptop(e:any){
    //console.log('idmarcalaptop1', e);
    this.idmarcalaptop = e.value;
   // console.log('idmarcalaptop', e.value);
  }

  OpenPoupinicio(){
    {
      this.dialogo.open(DialogInicioActivoComponent, {
        maxWidth: '150vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '25%',
        disableClose: true,
        data: {
          titulo: `Acitvos`,
        }
      })
      .afterClosed().subscribe(result => {
        //console.log(result);
        if(result == 1){this.idtipoactivopclaptop = 1
          this.chanelidtipoactivo({value: 1});
        }
        if(result == 2){this.idtipoactivopclaptop = 2
          this.chanelidtipoactivo({value: 2});
        }
      });

      }
  }

  chaneoperdorel(e: any){
   this.idoperadorcelular = e.value;
   //console.log('id-Operador', e.value);
  }
  chanecategoriacel(e: any){
    this.idcateogira = e.value;
   // console.log('id-categoria', e.value);
  }
  chanecselect(e: any){
   // console.log('selectrario1', e.value);
  }

  updateAllCompletetwo(e: any, id:string) {
    //console.log('selectrario',e, id);
    this.task.subtaskstwo.map(function(elem: any){
      if(elem.id == id) elem.selected = e;
      else elem.selected = elem.selected;
      return elem;
    });
   // console.log(this.task.subtaskstwo);
    this.allComplete = this.task.subtaskstwo != null && this.task.subtaskstwo.every(t => t.completed);
    //console.log('selectrario1',e, id);
  }
  someCompletetwo(): boolean {
    if (this.task.subtaskstwo == null) {
      return false;
    }
    return this.task.subtaskstwo.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAlltwo(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtaskstwo == null) {
      return;
    }
    this.task.subtaskstwo.forEach(t => (t.completed = completed));
  }
  updateAllComplete(e: any, id:string) {
   // console.log('selectrario',e, id);
      this.task.subtasks.map(function(elem: any){
        if(elem.id == id) elem.selected = e;
        else elem.selected = elem.selected;
        return elem;
      });
      //console.log(this.task.subtasks);
      this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
      //console.log('selectrario1',e, id);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }
  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => (t.completed = completed));
  }

  async guardarcel( formDirective: FormGroupDirective) {
       if (this.datosBasicosFormGroup.invalid) {
        this.datosBasicosFormGroup.markAllAsTouched();
       return;
        } //editar avtivos:
       if(this.isedit){
       var ck = this.task.subtasks.filter(function(elem: any){ return elem.selected == true }),
       ckstring = ck.map(function(elem: any){ return (elem.selected ? elem.id : '') }).toString();
       //console.log(ckstring);
       var cks = this.task.subtaskstwo.filter(function(elem: any){ return elem.selected == true }),
       ckstringtwo = cks.map(function(elem: any){ return (elem.selected ? elem.id : '') }).toString();
        var idmarca = 0;
       if(this.idmarcacelu!= null){
        idmarca = this.idmarcacelu;
       }else{
        idmarca = this.idmarcalaptop;
        }
       var capmemory: string;
       if(this.idtipoactivo ==2 ){capmemory= this.memorialaptoptxt;}
       //if(this.idtipoactivo ==1){capmemory =this.capacmemoriatxt;   }  //capmemory
       if(this.idtipoactivo ==1){capmemory = this.capMemory;}
        //console.log('idtipo', this.idtipo);
       var dataedit = {
        id:this.idedit,
        codigoInventario: this.codinventariotxt,
        fechaAlta: this.fechaaltatxt,
        tmoMeses: this.tmotxt,
        idEstado: this.estadoint,
        idMarca: idmarca,
        idModelo: this.idmodelocelu,
        capMemory: capmemory,
        nroSerie: (this.nroSerie==undefined ? '':this.nroSerie) +""+(this.serielaptoptxt== undefined ?'': this.serielaptoptxt ),
        emei: this.emaitxt,
        accesorioAdicional: ckstring +","+ckstringtwo +","+
        (this.tamanolaptoptxt ==undefined ? '' : this.tamanolaptoptxt) +","+
        (this.discodurolaptoptxt == undefined ?'':this.discodurolaptoptxt)+","+(this.monitortxt == undefined ? '' : this.monitortxt)+","+
        (this.discodurotxt == undefined ? '' :this.discodurotxt)+","+
        (this.tipocputxt == undefined ? '' : this.tipocputxt),
        idOperador: this.idoperadorcelular,
        nroSim: this.nrosimtxt,
        planTarifa: this.tarifaplana,
        idCategoria: this.idcateogira,
        usuarioRegistro: 0,
        tipo:this.idtipoactivo,
        }
        this.equipocelularservice.putupdateactivos(dataedit).subscribe((res:  any) =>{
          this.bootstrapNotifyBarService.notifySuccess('Se Actualizo corresctamente.');
          this.router.navigate(["/activos/bandequipo"]);
        });
       }
        else{
          var ck = this.task.subtasks.filter(function(elem: any){ return elem.selected == true }),
           ckstring = ck.map(function(elem: any){ return (elem.selected ? elem.id : '') }).toString();
           //console.log(ckstring);
           var cks = this.task.subtaskstwo.filter(function(elem: any){ return elem.selected == true }),
           ckstringtwo = cks.map(function(elem: any){ return (elem.selected ? elem.id : '') }).toString();
          var idmarca = 0;
          if(this.idmarcacelu!= null){
           idmarca = this.idmarcacelu;
          }else{
          idmarca = this.idmarcalaptop;
          }
         var capmemory: string;
          if(this.idtipoactivo ==2 ){capmemory= this.memorialaptoptxt;}
           //if(this.idtipoactivo ==1){capmemory =this.capacmemoriatxt;   }  //capmemory
          if(this.idtipoactivo ==1){capmemory = this.capMemory;}
          var data={
          codigoInventario: this.codinventariotxt,
          fechaAlta: this.fechaaltatxt,
          tmoMeses: this.tmotxt,
          idEstado: this.idestdo,
          idMarca: idmarca,
          idModelo: this.idmodelocelu,
          capMemory: capmemory,
          nroSerie: (this.nroSerie==undefined ? '':this.nroSerie) +""+(this.serielaptoptxt== undefined ?'': this.serielaptoptxt ),
          emei: this.emaitxt,
          accesorioAdicional: ckstring +","+ckstringtwo +","+
          (this.tamanolaptoptxt ==undefined ? '' : this.tamanolaptoptxt) +","+
          (this.discodurolaptoptxt == undefined ?'':this.discodurolaptoptxt)+","+(this.monitortxt == undefined ? '' : this.monitortxt)+","+
          (this.discodurotxt == undefined ? '' :this.discodurotxt)+","+
          (this.tipocputxt == undefined ? '' : this.tipocputxt),
          idOperador: this.idoperadorcelular,
           nroSim: this.nrosimtxt,
          planTarifa: this.tarifaplana,
          idCategoria: this.idcateogira,
          usuarioRegistro: 0,
          tipo:this.idtipoactivo,
        }
        //console.log('Datos que envio',data);
        this.equipocelularservice.postguardardata(data).subscribe((res:  any) => {
        this.isLoading = false;
       //console.log('response',res.mensaje);
       const dialogRef =this.dialogo.open(DialogoConfirmaregistrocelularComponent, {
        maxWidth: '150vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '30%',
        disableClose: true,
        data: {
          titulo: `Activo`,
          mensaje:'Los datos se guardaron correctamente, '+'  se genero el codigo: ' +   res.codigo  + ' de inventario.',
        }
       })
       this.showcontroltipoactivo = true;
       dialogRef.afterClosed().subscribe(result => {
        //console.log(result);
        this.showasignaciones = true;
        this.showregiscel = true;
        this.showpenalidades = true;
        this.datosBasicosFormGroup.reset(); // Reset form data
        formDirective.resetForm(); // Reset the ugly validators

       // this.datosBasicosFormGroup.resetForm()
         });

        }, error => this.isLoading = false);
        }
     }



}
