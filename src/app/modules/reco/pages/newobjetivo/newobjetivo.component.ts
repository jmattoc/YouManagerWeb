import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
//import { Input } from 'hammerjs';
import { recoservice } from './../services/reco.service';
import {BandejaperiodoComponent} from '../bandejaperiodo/bandejaperiodo.component';
import { getLocaleDayNames } from '@angular/common';


@Component({
  selector: 'app-newobjetivo',
  templateUrl: './newobjetivo.component.html',
  styleUrls: []
})
export class NewobjetivoComponent implements OnInit {
  @ViewChild(BandejaperiodoComponent) child;
  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  public titulo: string = 'CONCEPTO DE OBJETIVOS DE GERENCIA';
  public subtitulo: string = 'Crear concepto';
  public isedit: boolean = false;
  public btnguar: string = 'Guardar';
  public showregiscateg: boolean = true;

  public newobjetivo: string = '';
  stamanewobjetivo = new FormControl('');
  stamaneperiodo = new FormControl('');
  public idPeriodo: number;
  public ultnombreperiodo: string;
  idconcepto: number = 0;
  idperiodo: number=0;
  nombreperiodo: string='';
  public periodotxt: string;

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
    private recoservice: recoservice,

  ) {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id != null){
      this.Obtenerdatosconcepto(id);
      this.isedit = true;
      this.titulo = 'EDITAR CONCEPTO';
      this.subtitulo = 'Editar concepto';
      this.btnguar = 'Guardar';
    }
  }

  ngOnInit(): void {

    this.formularionewcategoria = this.fb.group({
      stamanewobjetivo: this.stamanewobjetivo,
      stamaneperiodo: this.stamaneperiodo,
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });
    this.searchperfil();
    this.formularionewcategoria.controls['stamaneperiodo'].disable();

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
        this.idperiodo = res.data[0].id;
        this.periodotxt = res.data[0].nombre;
       // console.log('id y nombre',this.idperiodo, this.nombreperiodo);
      },);
  }


  Obtenerdatosconcepto(id){
   this.recoservice.geteditarconcepto(id).subscribe((res: any) => {
   // console.log('aaa', res);
    this.newobjetivo = res.nombre;
    this.idconcepto = res.id;
   // console.log('idconcepto', this.idconcepto);

  });
  }

  async guardarconcepto(){
    if (this.formularionewcategoria.invalid) {
      this.formularionewcategoria.markAllAsTouched();
      return;
    }
    if(this.isedit){
      var edit = {
        id: this.idconcepto,
        nombre: this.newobjetivo,
        idPeriodo: this.idperiodo,
      }
     // console.log('concepto guardado:', data);
      this.recoservice.putactualizarconcepto(edit).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifyWarning('Se Actualizo corresctamente.');
        this.router.navigate(["/configuracion/concepto"]);
      });

    }else{
      var data = {
        nombre:this.newobjetivo,
        idPeriodo: this.idperiodo,
      }
    //  console.log('concepto guardado:', data);
      //console.log('idperiodo-selecionado',this.idperiodo);
      this.recoservice.postregistrarconcepto(data).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Se registro correctamente el concepto.');
        this.router.navigate(["/configuracion/concepto"]);
      });
    }
  }



}
