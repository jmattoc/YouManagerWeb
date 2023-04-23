import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import{ListarbandejaperfilResponse, ListarbandejaperfilDto, ListarbandejacategoriaResponse, ListarbandejaMaestroDetalleResponse, ListarbandejaHorariotrabajadorResponse
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
import { DateSelectionModelChange, MatDatepickerModule } from '@angular/material/datepicker';
import { DialogEditperfilpuestoComponent } from '@shared/components/dialog-editperfilpuesto/dialog-editperfilpuesto.component';
import { adminservice } from '../../services/admin.service';
import { StringifyOptions } from 'querystring';
import { ThemePalette } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Foodestado {
  value: boolean;
  viewValue: string;
};
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
@Component({
  selector: 'app-newhorariotrabajo',
  templateUrl: './newhorariotrabajo.component.html',
  styleUrls: []
})
export class NewhorariotrabajoComponent implements OnInit {
  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  codsolicitud: string;
  estadoactivo: number =3970;
  isLoading = false;
  stmaneestado = new FormControl('');
  stamanewcategoria = new FormControl('');
  stamanenombre = new FormControl('');
  stamanehouriniciolunes = new FormControl('');
  stamanehourfinlunes = new FormControl('');
  stamanehouriniciomartes = new FormControl('');
  stamanehourfinmartes = new FormControl('');
  stamanehouriniciomiercoles = new FormControl('');
  stamanehourfinmiercoles = new FormControl('');
  stamanehouriniciojueves = new FormControl('');
  stamanehourfinjueves = new FormControl('');
  stamanehourinicioviernes = new FormControl('');
  stamanehourfinviernes = new FormControl('');
  stamanehouriniciosabado = new FormControl('');
  stamanehourfinsabado = new FormControl('');
  stamanehouriniciodomingo = new FormControl('');
  stamanehourfindomingo = new FormControl('');



  public showregiscateg: boolean = true;
  ideditmaestrodetalle: number;
  /*ngmodel */
  public estadoint: number;
  public nombretxt: string;
  public newcategoriatxt: string;
  public newdescripciontxt: string;
  public estadointtxt: boolean=true;;
  public idMaestroDetalle:number;
   public myTimePicker: string;
   public Houriniciolunes: string;
   public Hourfinlunes: string;
   public Houriniciomartes: string;
   public Hourfinmartes: string;
   public Houriniciomiercoles:string;
   public Hourfinmiercoles:string;
   public Houriniciojueves:string;
   public Hourfinjueves:string;
   public Hourinicioviernes:string;
   public Hourfinviernes:string;
   public Houriniciosabado:string;
   public Hourfinsabado:string;
   public Houriniciodomingo:string;
   public Hourfindomingo:string;
   idedit: number;
/*checked */
   chcedlunes = false;
   chcedmartes = false;
   chcedmiercoles = false;
   chcedjueves = false;
   chcedviernes = false;
   chcedsabado = false;
   chceddomingo = false;



  /* variables id de control combos*/
 private idestdo:number;

 /*Listar de servicio */
 //public lstEstadoCel: any = [];
 public lstEstadonewcatgoria: any = [];
 public titulocategoria: string = 'NUEVO HORARIO DE TRABAJO';
 public subtitulo: string = 'Crear horario';
 public isedit: boolean = false;
 public btnguar: string = 'Guardar';


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
      this.listarhorarioid(id);
      this.isedit = true;
      this.titulocategoria ='EDITAR HORARIO';
      this.subtitulo ='Editar horario';
      this.btnguar ='Guardar';
    }
  }

  ngOnInit(): void {

    this.formularionewcategoria = this.fb.group({
      stmaneestado: this.stmaneestado,
      stamanewcategoria: this.stamanewcategoria,
      stamanenombre: this.stamanenombre,
      stamanehouriniciolunes: this.stamanehouriniciolunes,
      stamanehourfinlunes: this.stamanehourfinlunes,
      stamanehouriniciomartes: this.stamanehouriniciomartes,
      stamanehourfinmartes: this.stamanehourfinmartes,
      stamanehouriniciomiercoles: this.stamanehouriniciomiercoles,
      stamanehourfinmiercoles: this.stamanehourfinmiercoles,
      stamanehouriniciojueves: this.stamanehouriniciojueves,
      stamanehourfinjueves: this.stamanehourfinjueves,
      stamanehourinicioviernes: this.stamanehourinicioviernes,
      stamanehourfinviernes: this.stamanehourfinviernes,
      stamanehouriniciosabado: this.stamanehouriniciosabado,
      stamanehourfinsabado: this.stamanehourfinsabado,
      stamanehouriniciodomingo: this.stamanehouriniciodomingo,
      stamanehourfindomingo: this.stamanehourfindomingo,
      fkMdEstado: [],
      stCodigo: [],
    });


  }
  chaneestadocel(e: any){
    this.idestdo = e.value;
   // console.log('id-estado', e.value);
  }

  listarhorarioid(id){
    this.adminservice.gethorarioid(id).subscribe((res: any) => {
      //console.log('aaa', res);
      this.nombretxt = res.nombre;
      this.newdescripciontxt = res.descripcion;
      this.estadointtxt = res.activo;
      this.idedit = res.id;
     // console.log('editar-estado', this.estadointtxt);
      this.idMaestroDetalle = res.idMaestroDetalle;

      if(res.detalle.length > 0){
        for(let detalle of res.detalle){
          if(detalle.numeroDia == 1){
            this.chcedlunes = true;
            this.Houriniciolunes = detalle.horarioDesde;
            this.Hourfinlunes = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 2){
            this.chcedmartes = true;
            this.Houriniciomartes = detalle.horarioDesde;
            this.Hourfinmartes = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 3){
            this.chcedmiercoles = true;
            this.Houriniciomiercoles = detalle.horarioDesde;
            this.Hourfinmiercoles = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 4){
            this.chcedjueves = true;
            this.Houriniciojueves = detalle.horarioDesde;
            this.Hourfinjueves = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 5){
            this.chcedviernes = true;
            this.Hourinicioviernes = detalle.horarioDesde;
            this.Hourfinviernes = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 6){
            this.chcedsabado = true;
            this.Houriniciosabado = detalle.horarioDesde;
            this.Hourfinsabado = detalle.horarioHasta;
          }
          if(detalle.numeroDia == 7){
            this.chceddomingo = true;
            this.Houriniciodomingo = detalle.horarioDesde;
            this.Hourfindomingo = detalle.horarioHasta;
          }
        }
      }


    });
  }
  estadocategoria: Foodestado[] = [
    {value: true, viewValue: 'ACTIVO'},
    {value: false, viewValue: 'INACTIVO'},
  ];


  timeiniciolunes(e: any){
    this.Houriniciolunes = e;
   // console.log('Hora-lunes', e,this.Houriniciolunes );
  }
  timefinlunes(e: any){
    this.Hourfinlunes = e;
   // console.log('Hora-Fin-lunes', e,this.Hourfinlunes );
  }
  timeiniciomartes(e: any){
    this.Houriniciomartes = e;
   // console.log('Hora-MArtes', e,this.Houriniciomartes );
  }
  timefinmartes(e: any){
    this.Hourfinmartes = e;
  //  console.log('Hora-Fin-martes', e,this.Hourfinmartes );
  }
  timeiniciomiercoles(e: any){
    this.Houriniciomiercoles = e;
  //  console.log('Hora-miercoles',this.Houriniciomiercoles );
  }
  timefinmiercoles(e: any){
    this.Hourfinmiercoles = e;
   // console.log('Hora-Fin-miercoles',this.Hourfinmiercoles );
  }
  timeiniciojueves(e: any){
    this.Houriniciojueves = e;
   // console.log('Hora-jueves',this.Houriniciojueves );
  }
  timefinjueves(e: any){
    this.Hourfinjueves = e;
   // console.log('Hora-Fin-jueves',this.Hourfinjueves );
  }
  timeinicioviernes(e: any){
    this.Hourinicioviernes = e;
   // console.log('Hora-viernes',this.Hourinicioviernes );
  }
  timefinviernes(e: any){
    this.Hourfinviernes = e;
  //  console.log('Hora-Fin-viernes',this.Hourfinviernes );
  }
  timeiniciosabado(e: any){
    this.Houriniciosabado = e;
  //  console.log('Hora-sabado',this.Houriniciosabado );
  }
  timefinsabado(e: any){
    this.Hourfinsabado = e;
  //  console.log('Hora-Fin-sabado',this.Hourfinsabado );
  }
  timeiniciodomingo(e: any){
    this.Houriniciodomingo = e;
  //  console.log('Hora-domingo',this.Houriniciodomingo );
  }
  timefindomingo(e: any){
    this.Hourfindomingo = e;
   // console.log('Hora-Fin-domingo',this.Hourfindomingo );
  }

  selcttodoslosdias(e: any){
  // console.log('sect-todoslosdias', e.checked);
   if(e.checked){
    this.chcedlunes = true;
    this.chcedmartes = true;
    this.chcedmiercoles = true;
    this.chcedjueves = true;
    this.chcedviernes = true;
    this.chcedsabado = true;
    this.chceddomingo = true;
   }
   else{
    this.chcedlunes = false;
   this.chcedmartes = false;
   this.chcedmiercoles = false;
   this.chcedjueves = false;
   this.chcedviernes = false;
   this.chcedsabado = false;
   this.chceddomingo = false;
   }

  }

  changedias(e: any, dia:number){
    if(e){
      if(dia == 1){
        this.chcedlunes = true;
      }
      if(dia == 2){
        this.chcedmartes = true;
      }
      if(dia == 3){
        this.chcedmiercoles = true;
      }
      if(dia == 4){
        this.chcedjueves = true;
      }
      if(dia == 5){
        this.chcedviernes = true;
      }
      if(dia == 6){
        this.chcedsabado = true;
      }
      if(dia == 7){
        this.chceddomingo = true;
      }
    }else{
      if(dia == 1){
        this.chcedlunes = false;
      }
      if(dia == 2){
        this.chcedmartes = false;
      }
      if(dia == 3){
        this.chcedmiercoles = false;
      }
      if(dia == 4){
        this.chcedjueves = false;
      }
      if(dia == 5){
        this.chcedviernes = false;
      }
      if(dia == 6){
        this.chcedsabado = false;
      }
      if(dia == 7){
        this.chceddomingo = false;
      }
    }
  }

  async guardarcategoria(){
   //console.log('id-edit',this.idedit);
    if(this.isedit){
      var listardiasedit = [];
      if(this.chcedlunes){
        listardiasedit.push({
          numeroDia : 1, horarioDesde: this.Houriniciolunes, horarioHasta: this.Hourfinlunes});
      }
      if(this.chcedmartes){
        listardiasedit.push({numeroDia : 2, horarioDesde: this.Houriniciomartes, horarioHasta: this.Hourfinmartes});
      }
      if(this.chcedmiercoles){
        listardiasedit.push({numeroDia : 3, horarioDesde: this.Houriniciomiercoles, horarioHasta: this.Hourfinmiercoles});
      }
      if(this.chcedjueves){
        listardiasedit.push({numeroDia : 4, horarioDesde: this.Houriniciojueves, horarioHasta: this.Hourfinjueves});
      }
      if(this.chcedviernes){
        listardiasedit.push({numeroDia : 5, horarioDesde: this.Hourinicioviernes, horarioHasta: this.Hourfinviernes});
      }
      if(this.chcedsabado){
        listardiasedit.push({numeroDia : 6, horarioDesde: this.Houriniciosabado, horarioHasta: this.Hourfinsabado});
      }
      if(this.chceddomingo){
        listardiasedit.push({numeroDia : 7, horarioDesde: this.Houriniciodomingo, horarioHasta: this.Hourfindomingo});
      }
      //console.log('Actualizar-detalle-horario',listardiasedit);
      var dataedit ={
        id: this.idedit,
        nombre: this.nombretxt,
        descripcion: this.newdescripciontxt,
        detalle:listardiasedit,
        estado: this.estadointtxt,
      }
      //console.log('Data-edit',dataedit);
      this.adminservice.putupdateidhorario(dataedit).subscribe((res: any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Los datos se actualizaron correctamente.');
      });
      this.router.navigate(["/administracion/horatrabajo"]);
    }else{
      var listardias = [];
    //  console.log('Datalunes',this.chcedlunes);
      if(this.chcedlunes){
        listardias.push({
          numeroDia : 1, horarioDesde: this.Houriniciolunes, horarioHasta: this.Hourfinlunes});
      }
      if(this.chcedmartes){
        listardias.push({numeroDia : 2, horarioDesde: this.Houriniciomartes, horarioHasta: this.Hourfinmartes});
      }
      if(this.chcedmiercoles){
        listardias.push({numeroDia : 3, horarioDesde: this.Houriniciomiercoles, horarioHasta: this.Hourfinmiercoles});
      }
      if(this.chcedjueves){
        listardias.push({numeroDia : 4, horarioDesde: this.Houriniciojueves, horarioHasta: this.Hourfinjueves});
      }
      if(this.chcedviernes){
        listardias.push({numeroDia : 5, horarioDesde: this.Hourinicioviernes, horarioHasta: this.Hourfinviernes});
      }
      if(this.chcedsabado){
        listardias.push({numeroDia : 6, horarioDesde: this.Houriniciosabado, horarioHasta: this.Hourfinsabado});
      }
      if(this.chceddomingo){
        listardias.push({numeroDia : 7, horarioDesde: this.Houriniciodomingo, horarioHasta: this.Hourfindomingo});
      }
      var data = {
        nombre: this.nombretxt,
        descripcion: this.newdescripciontxt,
        detalle:listardias,
        estado: this.estadointtxt,
      }
      //console.log('Registrar-detalle-horario',data);
      this.adminservice.postnewhorariotrabajo(data).subscribe((res: any) =>{
        this.bootstrapNotifyBarService.notifySuccess('Los datos se guardaron correctamente.');
      });
      this.router.navigate(["/administracion/horatrabajo"]);

    }

  }



}
