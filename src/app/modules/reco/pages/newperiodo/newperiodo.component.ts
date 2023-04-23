import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { DialogConfirmarperiodoComponent } from '@shared/components/dialog-confirmarperiodo/dialog-confirmarperiodo.component';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { recoservice } from './../services/reco.service';

interface Foodestado {
  value: boolean;
  viewValue: string;
};


@Component({
  selector: 'app-newperiodo',
  templateUrl: './newperiodo.component.html',
  styleUrls: []
})
export class NewperiodoComponent implements OnInit {

  matexpansionpanelfiltro: boolean = false;
  formularionewcategoria!: FormGroup;

  public titulo: string = 'NUEVO PERIODO';
  public subtitulo: string = 'Crear periodo';
  public isedit: boolean = false;
  public btnguar: string = 'Guardar';
  public showregiscateg: boolean = true;
  public fechainicio: string = '2021-11-13T00:00:00.342Z';
  public fechafin: Date = new Date();
  public newperiodotxt: string = '';
  stamaneperiodo = new FormControl('');
  fxInicio = new FormControl('');
  fxFin = new FormControl('');
  stmaneestado = new FormControl('');
  estadointtxt: string='';
  public showestado: boolean = false;
  idperiodo: number = 0;
  @Input() idultimoperiodo: string='';
  @Input() ultimonombreperiodo: string = '';


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

    if(id !=null){
      this.obtenerdatos(id);
      this.isedit = true;
      this.titulo ='EDITAR PERIDO';
      this.subtitulo ='Editar Periodo';
      this.btnguar ='Guardar';
    }
  }

  estadocategoria: Foodestado[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'},
  ];


  ngOnInit(): void {
   // console.log('Id y nombreperiodo',this.idultimoperiodo, this.idperiodo);
    this.formularionewcategoria = this.fb.group({
      stamaneperiodo: this.stamaneperiodo,
      stmaneestado: this.stmaneestado,
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });


  }

  chaneestadoperiodo(e: any){

  }

  obtenerdatos(id){
   this.recoservice.geteditarperiodo(id).subscribe((res: any) => {
    //this.showestado = true;
   // console.log('aaa', res);
    this.newperiodotxt = res.nombre;
    this.estadointtxt = res.activo;
    this.fechainicio = res.fechaInicio;
    this.fechafin = res.fechaFin;
    this.idperiodo = res.id;


    });
  }
  OpenPoupinicio(){
    {
      this.dialogo.open(DialogConfirmarperiodoComponent, {
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

      });

      }
  }


  async guardarperiodo(){
    if (this.formularionewcategoria.invalid) {
      this.formularionewcategoria.markAllAsTouched();
      return;
    }
    if(this.isedit){
      var dataedit = {
        id:this.idperiodo,
        nombre: this.newperiodotxt,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
        activo: this.estadointtxt,
      }
     // console.log('DataEdit', dataedit);
      this.recoservice.putactualizarperiodo(dataedit).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifyWarning('El periodo se actualizo correctamente.');
        this.router.navigate(["/configuracion/periodo"]);
      });
    }else{
      var data = {
        nombre: this.newperiodotxt,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      }
     // console.log('datos-para-registrar', data);
      this.recoservice.postregistrarperiodo(data).subscribe((res:  any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Se creo el periodo correctamente.');
        this.router.navigate(["/configuracion/periodo"]);
      });

    }


  }

}
