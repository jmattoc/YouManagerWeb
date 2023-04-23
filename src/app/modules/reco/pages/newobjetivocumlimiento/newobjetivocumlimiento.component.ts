import {Component, Inject, OnInit,Input, Self, Optional, AfterViewInit, OnDestroy, ViewChild, Injectable, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NgControl, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@core/auth/auth.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { ThemePalette } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Subject,ReplaySubject, BehaviorSubject, Observable, merge } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { BlockBlobQueryOptions } from '@azure/storage-blob';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import {MatTreeModule} from '@angular/material/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { recoservice } from './../services/reco.service';
import { ListarbandejaconceptoDetalleResponse, ListarbandejaobjtivovalorResponse } from '@core/models/reco.interface';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';

interface FoodNode {
  nombre: string;
children?: FoodNode[];
}


/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  nombre: string;
  level: number;
}
interface Food {
  value: number;
  name: string;
};

@Component({
  selector: 'app-newobjetivocumlimiento',
  templateUrl: './newobjetivocumlimiento.component.html',
  styleUrls: ['./newobjetivocumplimiento.css']
})
export class NewobjetivocumlimientoComponent implements OnInit {
  listarconcepto: ListarbandejaconceptoDetalleResponse;
  listarbandejaobjetivovalor:ListarbandejaobjtivovalorResponse;
  listarconceptoobjvalor: any [];
  listarconcepobjactivos: any [];
  listaridperiodo: number;
  public fechainicio: string = '2022-11-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  public fechamesactual: Date = new Date()
  public isLoading = false;
  columnas = ['stConceptoObj','stDebeser','stvalor','stUmedida','stpeso'];
  datosBasicosFormGroup!: FormGroup;
  public subtitulo: string = 'Registrar valor';
  public btnguar: string = 'Guardar';
  stamaneResponsable = new FormControl('');
  stmaneslecobjconcepto = new FormControl('');
  stmanesdebeser = new FormControl('');
  stConceptoObj = new FormControl('');
  stamanevalorobjsoles = new FormControl('');
  tbnamevalorsoles = new FormControl('');
  stmaneslecUnidadmedida = new FormControl('');
  stmaneslecperiodo = new FormControl('');
  stamanePeso = new FormControl('');
  stamanevalorresult = new FormControl('');
  stmanesledebeser = new FormControl('');
  stmanechecktrue = new FormControl('');
  stmanecheckfalse = new FormControl('');
  public responsabletxt : string = '';
  public valorobjsolestxt : string;
  objconpint: number = 0;
  public objconceptotxt: number =0;
  idobjetivoconcepto: number =0;
  public unidadmedidaidtxt : string ='';
  public pesotxt : string ='';
  public periodoidtxt : number=0;
  public lstEstadoCel: any = [];
  public lstarbolobjvalor: any = [];
  idperiodoobjvalor: number;
  public periodotxt: string;
  public idPeriodo: number;
  public responsable: string;
  public lsitaroperdadormaestro: any = [];
  public lstarunidadmedidamestro: any =[];
  public lsitarobjetivosactivostemp: any = [];
  public listarmeses: any = [];
 idunidadorganica : number =0;
 idoperador: number = 0;
 idunidadmedida: number = 0;
 idperiodo: number = 0;
 idunidadorganica2: number =0;
 idobjetivo: any;
 public isupdate: boolean = false;
 idperiocidadobj: number =0;
 idobj: number = 0;
 public checkedtrue: boolean= false;
 public checkedfalse: boolean= false;
 public valorresulttxt: string ='';
  idperiodoactivado: number = 0;
  idmes: number =0;
  showbtnguardar :boolean = true;
  chaneevalmesvalue: number =0;
  public valueradioboton: boolean;
  public UbicacionNomnbretree: string ='';

  public showmostrarubi: boolean = false;


/*Datos de tree */
private _transformer = (node: FoodNode, level: number,  ) => {
  return {
    expandable: !!node.children && node.children.length > 0,
    nombre: node.nombre,
    level: level,

  };

};

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    //private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
   // @Optional() @Self() public ngControl: NgControl
   private recoservice: recoservice,
  ) {//this.dataSource.data = TREE_DATA;
   // console.log('parametro',this.activatedRoute.snapshot.paramMap.get('id'));
    this.idobjetivo = this.activatedRoute.snapshot.paramMap.get('id');
    }

  listarvalorsignos: Food[] = [
    {value: 0, name: 'Seleccione'},
    {value: 1, name: 'MAYOR QUE'},
    {value: 2, name: 'MENOR QUE'},
    {value: 3, name: 'IGUAL QUE'},
  ];



  listarUnidadmedida: Food[] =[
    {value: 0, name: 'Seleccione'},
    {value: 1, name: 'MIL'},
    {value: 2, name: 'UNIDAD'},
    {value: 3, name: 'PORCENTAJE'},
  ];
  listarmesano: Food[] = [
    {value: 0, name: 'Seleccione'},
    {value: 1, name: 'Enero'},
    {value: 2, name: 'Febrero'},
    {value: 3, name: 'Marzo'},
    {value: 4, name: 'Abril'},
    {value: 5, name: 'Mayo'},
    {value: 6, name: 'Junio'},
    {value: 7, name: 'Julio'},
    {value: 8, name: 'Agosto'},
    {value: 9, name: 'Setiembre'},
    {value: 10, name: 'Octubre'},
    {value: 11, name: 'Noviembre'},
    {value: 12, name: 'Diciembre'},

  ];


  ngOnInit(): void {
    this.datosBasicosFormGroup = this._formBuilder.group({
      stamaneResponsable: this.stamaneResponsable,
      stmaneslecobjconcepto: this.stmaneslecobjconcepto,
      stmanesledebeser: this.stmanesledebeser,
      stamanevalorobjsoles: this.stamanevalorobjsoles,
      stmaneslecUnidadmedida: this.stmaneslecUnidadmedida,
      stamanePeso: this.stamanePeso,
      stmaneslecperiodo : this.stmaneslecperiodo,
      stamanevalorresult : this.stamanevalorresult,
      stmanechecktrue : this.stmanechecktrue,
      stmanecheckfalse : this.stmanecheckfalse,
    });
    this.obtenerMesActual();
     this.searchperfil();
     this.searchperfil2();
     this.searchperfil3(1,10);
     this.listaroperadormaestro();
     this.listarunidadmedida();
     this.listarmesesmaestro();
    this.datosBasicosFormGroup.controls['stamaneResponsable'].disable();
    this.datosBasicosFormGroup.controls['stamanePeso'].disable();
    this.datosBasicosFormGroup.controls['stmaneslecUnidadmedida'].disable();
    this.datosBasicosFormGroup.controls['stamanevalorobjsoles'].disable();
    this.datosBasicosFormGroup.controls['stmanesledebeser'].disable();
    this.datosBasicosFormGroup.controls['stmaneslecperiodo'].disable();
  }

  obtenerMesActual(){
    const fecha = new Date();
    //console.log('fechaActual', fecha);
    const anoActual = fecha.getFullYear();
    //console.log('AñoActual', anoActual);
    var mesActual = fecha.getMonth();
    this.periodoidtxt = mesActual;
   // console.log('periodo', this.periodoidtxt)
   // console.log('MesActual-1', mesActual);
   // console.log(moment().subtract(1, 'M').format());
    const fechaymes = moment().subtract(1, 'M').format();
  }

  listaroperadormaestro(id=35){
    this.recoservice.getlistarOperador(id).subscribe((res: any) => {
     this.lsitaroperdadormaestro = res;
    // console.log('ListarOperador',this.lsitaroperdadormaestro)
    });
   }
   listarunidadmedida(id=36){
    this.recoservice.getlistarUnidadMedida(id).subscribe((res: any) => {
      this.lstarunidadmedidamestro = res;
     // console.log('ListarUnidadM',this.lstarunidadmedidamestro)
     });
    }

    listarmesesmaestro(id=37){
      this.recoservice.getlistarMesesMaestro(id).subscribe((res: any) =>{
        this.listarmeses = res;
       // console.log('ListarMeses',this.listarmeses)
      });

    }

  searchperfil(){
    var fechainicio = '2020-01-30T00:00:00.342Z';
    var fechafin = new Date();
     var data ={
       page: 1,
       size: 10,
       activo: true,
       fechaInicio: fechainicio,
       fechaFin:fechafin,
     };
    // console.log('Data-de periodo',data);
     this.recoservice.paginadoperido(data).subscribe((res: any) => {
      // console.log('respuesta de data periodo',res);
       this.idPeriodo = res.data[0].id;
       this.periodotxt = res.data[0].nombre;
     //  console.log('id y nombre',this.idPeriodo, this.periodotxt);
       this.listartreeporid();
     }, error => console.log(error));
  }
  listartreeporid(){
    this.recoservice.getlistararbolobjetivovalor(this.idPeriodo).subscribe((res: any) => {
    this.lstarbolobjvalor = res;
   // console.log('data-arbol-tree',this.lstarbolobjvalor);
    //this.isLoading = true;
    this.dataSource.data = [this.lstarbolobjvalor].map(
     function(elem: any){
       elem.nombre = elem.nombre + '|' + elem.id;
       elem.children.map(
         function(elem2: any){
           elem2.nombre = elem2.nombre + '|' + elem2.id; elem2.children.map(function(elem3: any){ elem3.nombre = elem3.nombre + '|' + elem3.id; elem3.children.map(function(elem4: any){ elem4.nombre = elem4.nombre + '|' + elem4.id; elem4.children.map(function(elem5: any){ elem5.nombre = elem5.nombre + '|' + elem5.id; return elem5; }); return elem4; }); return elem3; }); return elem2; });
           return elem;});
    this.responsabletxt = res.responsable;
    //this.isLoading = false;
  }, error => this.isLoading = false);
 }

 lstresponsable(e: number, $event){
  $event.preventDefault()
 // console.log(this.arrayConvert([this.lstarbolobjvalor]), e);
  var list = this.arrayConvert([this.lstarbolobjvalor]);
  var datos = list.filter(function (elem: any){ return elem.id == e})[0];
 // console.log('mostardataaaa', datos);
  this.responsabletxt = datos.responsable;
  this.idunidadorganica = datos.id;
  this.UbicacionNomnbretree = datos.nombre.split('|')[0];
 // console.log('ID-u-Organica',this.idunidadorganica);
  this.idunidadorganica2 =  this.idunidadorganica;
 // console.log('id-uo2',this.idunidadorganica2);
  this.showmostrarubi = true;
}
arrayConvert(json){
  var arr = [];
  for(let item of json){
    var _item = JSON.parse(JSON.stringify(item));

    delete _item['children'];
     arr.push(_item);

     for(let item2 of item.children){
      var _item2 = JSON.parse(JSON.stringify(item2));

      delete _item2['children'];
       arr.push(_item2);
       for(let item3 of item2.children){
        var _item3 = JSON.parse(JSON.stringify(item3));

        delete _item3['children'];
         arr.push(_item3);
         for(let item4 of item3.children){
          var _item4 = JSON.parse(JSON.stringify(item4));

         delete _item4['children'];
         arr.push(_item4);

         for(let item5 of item4.children){
          var _item5 = JSON.parse(JSON.stringify(item5));

          delete _item5['children'];
          arr.push(_item5);
         }
         }

       }
     }
  }
  return arr;
}

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  searchperfil2(){
    var data ={
    page: 1,
    size: 10,
   /* estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,*/
    nombre:'',
    fechaInicio: this.fechainicio,
    fechaFin: this.fechafin,
  };
 // console.log('data-paginado-ejemplo', data);
  this.recoservice.postpaginadoconcepto(data).subscribe((res: any) => {
    this.listarconceptoobjvalor = res.data;
    this.listarconcepto = res;
    this.lsitarobjetivosactivostemp = res.data;
   // console.log('tablaaa-cumplimiento',this.listarconcepto);
   // console.log('datos de data',this.lsitarobjetivosactivostemp);
    var listarobjactivos = this.lsitarobjetivosactivostemp.filter(function (elem: any){
      return elem.estado == 'Activo'
    });
    this.listarconcepobjactivos = listarobjactivos;
   // console.log('lista-activos',this.listarconcepobjactivos);

  }, error => this.isLoading = false);

}

searchperfil3(page:1, size:10){
  var data = {
    page: page,
    size: size,
    activo: true,
  }
  this.recoservice.postpaginadoobjetivovalor(data).subscribe((res: any) => {
    this.listarbandejaobjetivovalor = res;
    this.idperiodoactivado = res.data[0].id;
   // console.log('id-periodo-bandeja',this.listarbandejaobjetivovalor);
    this.isLoading = false;
  },error => this.isLoading = false);

 }
onPaginateChange(event: PageEvent) {
  const pageIndex = event.pageIndex + 1;
  const pageSize = event.pageSize;
  this.searchperfil2();
}

  chaneidobjconpceptop(e: any){
    this.valorresulttxt =''
    this.idobjetivoconcepto = e.value;
   // console.log('idconceptovalor', this.idobjetivoconcepto);
    this.recoservice.getextraerdataporid(this.idperiodoactivado, this.idunidadorganica2, this.idobjetivoconcepto).subscribe((res: any) =>{
   //  console.log('datos2',res);
     if(res != null){
    // this.bootstrapNotifyBarService.notifySuccess('Falta seleccionar registros de objetivo cumplimiento.');
     this.obtenerMesActual();
   //  console.log('datos-extraidos', res);
     this.objconpint = res.idOperadorAritmetico;
     this.valorobjsolestxt = res.montoObjetivo;
     this.unidadmedidaidtxt = res.IdUnidadMedida;
     this.pesotxt = res.pesoPorcentual;
     //this.periodoidtxt = res.IdPeriocidadEvaluacion;
     this.idobj = res.Id;
   //  console.log('id-datos-extraidos',this.idobj  );
     this.recoservice.getobtenerdatosobjcumplimiento(this.idobj, this.periodoidtxt).subscribe((res: any) =>{
     // console.log('result-valor',res );
       if( res != null){this.valorresulttxt = res.CumplimientoValor;
      //  console.log('result-valor',this.valorresulttxt );
        if(res.CumpleObjetivo){
      //    console.log('Resul-radio-aaa',res.CumpleObjetivo );
          this.checkedtrue= true;
          this.checkedfalse= false;
        } else{
          this.checkedtrue= false;
          this.checkedfalse= true;
        }
       // console.log('Resul-radio',res.CumpleObjetivo );

        this.bootstrapNotifyBarService.notifyWarning('Se encontro el valor resultado registrado para este objetivo');}
        if(res == null){
         // this.valorresulttxt ='';
        }


     });
     this.isupdate = true;
     this.showbtnguardar = true;
     }else{
       this.bootstrapNotifyBarService.notifyDanger('El Objetivo seleccionado no cuenta con información necesaria. Iremos a la bandeja de objetivo valor. Seleccione el Boton "CANCELAR"');
       this.objconpint = 0;
       this.valorobjsolestxt = null;
       this.unidadmedidaidtxt = '';
       this.pesotxt = '';
       //this.periodoidtxt = 0;
      // this.router.navigate(["/reco/objvalor"]);
      this.obtenerMesActual();
       this.showbtnguardar = false;
       this.isupdate = false;
     }
    });


   }





  chaneidobjconp(e: any){
  }
  chaneUmedida(e:any){
  }
  chaneevalmes(e: any){
    this.chaneevalmesvalue = e.value;
   // console.log('Selec-mes', this.chaneevalmesvalue);

  }


  onchagetrue(e:any){

   if(e== true){
     e = 1 ;
    // console.log('true1',e);

   }else{
    e= false;
   }
  }
  onchagefalse(e:any){
  //  console.log('NO',e);
    if(e== true){
      e = 2;
    //  console.log('true2',e);
    }else{
     e= false;
    }
  }
  radioChane(e:any){
 // this.valueradioboton =e.value;
  if(e.value == 'true'){
    this.valueradioboton = true;
  }else{
    this.valueradioboton = false;
    }

//  console.log('Value-Radio',this.valueradioboton);
  }

  async  guardarobjcumplimineto(formDirective: FormGroupDirective){
    if (this.datosBasicosFormGroup.invalid) {
      this.datosBasicosFormGroup.markAllAsTouched();
     return;
      }
      var data = {
        idObjetivoDetalle: this.idobj,
        mescumplimiento: this.periodoidtxt,
        cumplimientoValor: this.valorresulttxt,
        cumpleObjetivo: this.valueradioboton,
      }
     // console.log('datos-cumplimento', data);
      this.recoservice.postguardarobjcumplimiento(data).subscribe((res: any) => {
        this.bootstrapNotifyBarService.notifySuccess('Los datos de cumplimiento se guardo correctamente.');
        this.datosBasicosFormGroup.reset(); // Reset form data
        formDirective.resetForm();



      });


  }

}
