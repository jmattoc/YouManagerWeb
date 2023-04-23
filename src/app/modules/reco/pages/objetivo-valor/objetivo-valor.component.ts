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
import { nodeName } from 'jquery';
//import { ChildrenItems } from '../../../../sidebar/sidebar.component';
//import { element } from 'protractor';
import { FormContraComponent } from '../../../contra/pages/form-contra/form-contra.component';
import { DecimalPipe } from '@angular/common';
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
interface Foodperiodo{
  value: number ;
  name: string;
}


/*Inicia componente de objetivo valor */
@Component({
  selector: 'app-objetivo-valor',
  templateUrl: './objetivo-valor.component.html',
  styleUrls: ['./objetivo-valor.css'],

})
export class ObjetivoValorComponent implements OnInit {
  listarconcepto: ListarbandejaconceptoDetalleResponse;
  listarbandejaobjetivovalor:ListarbandejaobjtivovalorResponse;
  listarconceptoobjvalor: any [];
  listarconcepobjactivos: any [];
  listaridperiodo: number;
  public fechainicio: string = '2022-11-20T00:00:00.342Z';
  public fechafin: Date = new Date();
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
  public responsabletxt : string = '';
  public valorobjsolestxt : string;
  objconpint: number = 0;
  public objconceptotxt: number =0;
  idobjetivoconcepto: number =0;
  public unidadmedidaidtxt : string ='';
  public pesotxt : string ='';
  public periodoidtxt : string='';
  public lstEstadoCel: any = [];
  public lstarbolobjvalor: any = [];
  idperiodoobjvalor: number;
  public periodotxt: string;
  public idPeriodo: number;
  public responsable: string;
  public lsitaroperdadormaestro: any = [];
  public lstarunidadmedidamestro: any =[];
  public lsitarobjetivosactivostemp: any = [];
idunidadorganica : number =0;
idoperador: number = 0;
idunidadmedida: number = 0;
idperiodo: number = 0;
idunidadorganica2: number =0;
idobjetivo: any;
public isupdate: boolean = false;
idperiocidadobj: number =0;
idobj: number = 0;
public showmostrarubi: boolean = false;
public UbicacionNomnbretree: string ='';


/*Datos de tree */
  private _transformer = (node: FoodNode, level: number,  ) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      nombre: node.nombre,
      level: level,

    };

  };
/*End datos de tree */


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
  ) { //this.dataSource.data = TREE_DATA;
    console.log('parametro',this.activatedRoute.snapshot.paramMap.get('id'));
    this.idobjetivo = this.activatedRoute.snapshot.paramMap.get('id');
    }

  listarvalorsignos: Food[] = [
    {value: 0, name: 'Seleccione'},
    {value: 1, name: 'MAYOR QUE'},
    {value: 2, name: 'MENOR QUE'},
    {value: 3, name: 'IGUAL QUE'},
  ];


  listarperiodo: Food[] = [
    {value: 0, name: 'Seleccione'},
    {value: 1, name: 'Mensual'},
    {value: 1, name: 'Trimestral'},
    {value: 2, name: 'Semestral'},
    {value: 3, name: 'Anual'},

  ];

  listarperidomes: Foodperiodo[] = [
    {value: 1, name: 'Mensual'},
  ];

  ngOnInit(): void {
      this.datosBasicosFormGroup = this._formBuilder.group({
      stamaneResponsable: this.stamaneResponsable,
      stmaneslecobjconcepto: this.stmaneslecobjconcepto,
      stConceptoObj: this.stConceptoObj,
      stamanevalorobjsoles: this.stamanevalorobjsoles,
      tbnamevalorsoles: this.tbnamevalorsoles,
      stmaneslecUnidadmedida: this.stmaneslecUnidadmedida,
      stamanePeso: this.stamanePeso,
      stmaneslecperiodo : this.stmaneslecperiodo,
      stmanesdebeser: this.stmanesdebeser,
    });

     this.searchperfil();
     this.searchperfil2();
     this.listaroperadormaestro();
     this.listarunidadmedida();




    this.datosBasicosFormGroup.controls['stamaneResponsable'].disable();
  }

  listaroperadormaestro(id=35){
   this.recoservice.getlistarOperador(id).subscribe((res: any) => {
    this.lsitaroperdadormaestro = res;
    console.log('ListarOperador',this.lsitaroperdadormaestro)
   });
  }
  listarunidadmedida(id=36){
    this.recoservice.getlistarUnidadMedida(id).subscribe((res: any) => {
      this.lstarunidadmedidamestro = res;
      console.log('ListarUnidadM',this.lstarunidadmedidamestro)
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
     console.log('Data-de periodo',data);
     this.recoservice.paginadoperido(data).subscribe((res: any) => {
       console.log('respuesta de data periodo',res);
       this.idPeriodo = res.data[0].id;
       this.periodotxt = res.data[0].nombre;
       console.log('id y nombre',this.idPeriodo, this.periodotxt);
       this.listartreeporid();
     }, error => console.log(error));


   }

   listartreeporid(){
       this.recoservice.getlistararbolobjetivovalor(this.idPeriodo).subscribe((res: any) => {
       this.lstarbolobjvalor = res;
       console.log('data-arbol-tree',this.lstarbolobjvalor);
       this.dataSource.data = [this.lstarbolobjvalor].map(
        function(elem: any){
          elem.nombre = elem.nombre + '|' + elem.id;
          elem.children.map(
            function(elem2: any){
              elem2.nombre = elem2.nombre + '|' + elem2.id; elem2.children.map(function(elem3: any){ elem3.nombre = elem3.nombre + '|' + elem3.id; elem3.children.map(function(elem4: any){ elem4.nombre = elem4.nombre + '|' + elem4.id; elem4.children.map(function(elem5: any){ elem5.nombre = elem5.nombre + '|' + elem5.id; return elem5; }); return elem4; }); return elem3; }); return elem2; });
              return elem;});
       this.responsabletxt = res.responsable;
       this.isLoading = false;
     }, error => this.isLoading = false);
   }



   lstresponsable(e: number, $event){
    $event.preventDefault()
   // console.log(this.arrayConvert([this.lstarbolobjvalor]), e);
    var list = this.arrayConvert([this.lstarbolobjvalor]);
    var datos = list.filter(function (elem: any){ return elem.id == e})[0];
   // console.log('mostardata', datos);
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
     // console.log('tablaaavalor y peso',this.listarconcepto);
    //  console.log('datos de data',this.lsitarobjetivosactivostemp);
      var listarobjactivos = this.lsitarobjetivosactivostemp.filter(function (elem: any){
        return elem.estado == 'Activo'
      });
      this.listarconcepobjactivos = listarobjactivos;
    //  console.log('lista-activos',this.listarconcepobjactivos);

    }, error => this.isLoading = false);

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil2();
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

  toggleNode(node:ExampleFlatNode , expand: boolean) {

    if (expand) {
     // this.isLoading = true;
    }
  }

  chanetreeobjvalor(){


  }
  chaneidobjconpceptop(e: any){
   this.idobjetivoconcepto = e.value;
  // console.log('idconceptovalor', this.idobjetivoconcepto);
   this.recoservice.getextraerdataporid(this.idobjetivo, this.idunidadorganica2, this.idobjetivoconcepto).subscribe((res: any) =>{
   //console.log('datos2',res);
    if(res != null){
    this.bootstrapNotifyBarService.notifyWarning('El objetivo cuenta con información.');
   // console.log('datos-extraidos', res);
    this.objconpint = res.idOperadorAritmetico;
    this.valorobjsolestxt = res.montoObjetivo;
    this.unidadmedidaidtxt = res.IdUnidadMedida;
    this.pesotxt = res.pesoPorcentual;
    this.periodoidtxt = res.IdPeriocidadEvaluacion;
    this.idobj = res.Id;
   // console.log('id-datos-extraidos',this.idobj  );
    this.isupdate = true;

    }else{
      this.objconpint = 0;
      this.valorobjsolestxt = null;
      this.unidadmedidaidtxt = '';
      this.pesotxt = '';
      this.periodoidtxt = '';
      this.bootstrapNotifyBarService.notifySuccess('Registre información para este objetivo.');
      this.isupdate = false;
    }
   });


  }
  chaneidobjconp(e: any){

    this.idoperador = e.value;
  //  console.log('select-operador',this.idoperador);

  }
  chaneUmedida(e:any){
    this.idunidadmedida = e.value;
  //  console.log('u.medidad', this.idunidadmedida);
  }
  chaneperiodoid(e: any){
    this.idperiocidadobj = e.value;
  //  console.log('idperiodomes', this.idperiocidadobj);

  }

  separator(numb: any) {
    var num = numb.replace(/\./g, "");
    if (!isNaN(num)) {
      num = num
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
      num = num.split("").reverse().join("").replace(/^[\.]/, "");
      numb = num;
    } else {
      alert("Solo se permiten numeros");
      num = numb.replace(/[^\d\.]*/g, "");
    }
    return num;
  }
  separador22() {
    this.valorobjsolestxt = this.separator(this.valorobjsolestxt);
  }


  async guardarobjvalor( formDirective: FormGroupDirective){
    if (this.datosBasicosFormGroup.invalid) {
      this.datosBasicosFormGroup.markAllAsTouched();
     return;
      }

      if(this.isupdate){
        var dataedit ={
          id: this.idobj,
          idObjetivo : this.idobjetivo,
          idConcepto: this.idobjetivoconcepto,
          idUnidadOrganica:this.idunidadorganica,
          idOperadorAritmetico: this.idoperador,
          montoObjetivo: this.valorobjsolestxt,
          idUnidadMedida:this.idunidadmedida,
          pesoPorcentual: this.pesotxt,
          idPeriocidadEvaluacion: this.idperiocidadobj,
        }
       // console.log('DatosUpdate',dataedit);
        this.recoservice.putupdateobjetivo(dataedit).subscribe((res:any) =>{
        //  console.log('update-obj',res);
        this.bootstrapNotifyBarService.notifyWarning('El objetivo se actualizo corresctamente.');
        this.datosBasicosFormGroup.reset(); // Reset form data
        formDirective.resetForm(); // Reset the ugly validators
        });


      }else{
        var data = {

          idobjetivo : this.idobjetivo,
          idConcepto: this.idobjetivoconcepto,
          idUnidadOrganica:this.idunidadorganica,
          idOperadorAritmetico: this.idoperador,
          montoObjetivo: this.valorobjsolestxt,
          idUnidadMedida:this.idunidadmedida,
          pesoPorcentual: this.pesotxt,
          idPeriocidadEvaluacion: this.idperiocidadobj,
        }
       // console.log('detalle',data);
        this.recoservice.postguardardetalleobjvalor(data).subscribe((res: any) =>{
          this.bootstrapNotifyBarService.notifySuccess('Se guardo correctamente el objetivo valor.');
        });
        this.datosBasicosFormGroup.reset(); // Reset form data
          formDirective.resetForm(); // Reset the ugly validators


      }

    /* var cab = {
        idPeriodo:this.idPeriodo,
        descripcion: '',

      }
      console.log('cabecera',cab);
      this.recoservice.postguardacabecera(cab).subscribe((res: any) =>{
        this.bootstrapNotifyBarService.notifyWarning('Se guardo correctamente la cabecera.');
      });*/




  }

}
/*Termina componente de objetivo valor */
