import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { timeStamp } from 'console';
import { recoservice } from './../services/reco.service';
interface Foodestado {
  value: number;
  viewValue: number;
};

@Component({
  selector: 'app-newnivel',
  templateUrl: './newnivel.component.html',
  styleUrls: []
})
export class NewnivelComponent implements OnInit {
  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  public titulo: string = 'UNIDADES DE EVALUACIÓN';
  public subtitulo: string = 'Crear Unidades';
  public isedit: boolean = false;
  public btnguar: string = 'Guardar';
  public showregiscateg: boolean = true;
  public newobjetivo: string = '';
  stamanewobjetivo = new FormControl('');
  stmanenivel = new FormControl('');
  stmanenivelsuperior = new FormControl('');
  stamaemonbrenivel = new FormControl('');
  stamaneresponsable = new FormControl('');
  stamanecargo = new FormControl('');
  public niveltxt: string ='';
  public nivelinferiortxt: number  =0;
  public newnombreniveltxt: string = '';
  public neworesponsabletxt: string = '';
  public newcargotxt: string = '';
  public idvaluenivel: number =0;
  public idvaluenivelsuper: number=0;
  public shownivelsuper: boolean=false;
  idnivel: string;
  idconcepto: number = 0;
  idperiodo: number=0;
  nombreperiodo: string='';
  public periodotxt: string;
  public lstnivelinferior: any [];


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
      this.idnivel = id;
      console.log('id-nivel-a modificar',this.idnivel);
      this.Obtenerdatosniveles(id);
      this.isedit = true;
      this.titulo = 'EDITAR UNIDAD ORGANICA';
      this.subtitulo = 'Editar nivel';
      this.btnguar = 'Guardar';
      this.shownivelsuper = true;
     // this.formularionewcategoria.controls['stmanenivelsuperior'].enable();
    }
   }

  listartiponivel: Foodestado[] = [
    {value: 1, viewValue: 1},
    {value: 2, viewValue: 2},
    {value: 3, viewValue: 3},
    {value: 4, viewValue: 4},
    {value: 5, viewValue: 5},
  ];



  ngOnInit(): void {

    this.formularionewcategoria = this.fb.group({
      stamanewobjetivo: this.stamanewobjetivo,
      stmanenivel: this.stmanenivel,
      //stmanenivelsuperior: this.stmanenivelsuperior,
      stmanenivelsuperior: [],
      stamaemonbrenivel: this.stamaemonbrenivel,
      stamaneresponsable: this.stamaneresponsable,
      stamanecargo: this.stamanecargo,
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
    });
    this.searchperfil();
    //this.formularionewcategoria.controls['stmanenivelsuperior'].disable();

  }

  Obtenerdatosniveles(id){
    this.recoservice.geteditarunidadOrgnivel(id).subscribe((res: any) => {
    // console.log('datos-editar', res);
     this.niveltxt = res.nivelUO;
     //this.nivelinferiortxt = res.
     this.newnombreniveltxt = res.nombre;
     this.neworesponsabletxt = res.responsable;
     this.newcargotxt = res.cargo;


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
       this.idperiodo = res.data[0].id;
       this.periodotxt = res.data[0].nombre;
     //  console.log('id y nombre',this.idperiodo, this.nombreperiodo);
     },);
 }

 listarnivelsuperior(id:any){
  this.recoservice.getobtenerinferiores(id).subscribe((res: any) => {
   this.lstnivelinferior = res;
 // console.log('nivel-inferior', this.lstnivelinferior);
  this.formularionewcategoria.controls['stmanenivelsuperior'].enable();
 });
 }

  chanenivel(e: any){
   // console.log('Valor-de-Nivel', e.value);
   this.idvaluenivel = e.value;
   if(e.value== 1){
    this.shownivelsuper=false;
   }
   else{
    this.shownivelsuper=true;
      this.listarnivelsuperior(e.value);

     }
   }


  chanenivelsuper(e: any){
  //  console.log('Valor-de-Nivel-Super', e.value);
    this.idvaluenivelsuper = e.value;

  }

  async guardarnivel(){
    if (this.formularionewcategoria.invalid) {
      this.formularionewcategoria.markAllAsTouched();
     return;
      }
      if(this.isedit){
        var edit = {
          id:this.idnivel,
        nombre: this.newnombreniveltxt,
        idPeriodo: this.idperiodo,
        idNivelSuperior:this.idvaluenivelsuper,
        responsable: this.neworesponsabletxt,
        cargo: this.newcargotxt,
        nivelUO: this.niveltxt,
        activo: true,
        }
      //  console.log('edit a guardar',edit);
        this.recoservice.puteditarUOnivel(edit).subscribe((res:  any) =>{
       //   console.log('datos actualizados-ok',res);
          this.bootstrapNotifyBarService.notifySuccess('La unidad organica se actualizo correctamente.');
          this.router.navigate(["/configuracion/niveles"]);
        });

      }else{
        var data ={
          nombre: this.newnombreniveltxt,
          idPeriodo: this.idperiodo,
          idNivelSuperior:this.idvaluenivelsuper,
          responsable: this.neworesponsabletxt,
          cargo: this.newcargotxt,
          nivelUO: this.niveltxt,
          activo: true,
        }
      //  console.log('datos a guardar',data);
        this.recoservice.postguardarnivel(data).subscribe((res:  any) =>{
        //  console.log('respuesta-datos',res);
          this.bootstrapNotifyBarService.notifySuccess('La unidad organica se registro correctamente.');
          this.router.navigate(["/configuracion/niveles"]);
        });

      }



  }

}
