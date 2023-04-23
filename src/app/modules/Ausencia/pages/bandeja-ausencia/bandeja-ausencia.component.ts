import { Component, OnInit, ViewChild } from '@angular/core';
import { StyleDirective } from '@angular/flex-layout';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ListarbandejaausenciaDetalleResponse } from '@core/models/asusencia.interface';
import { DialogHistorialAusenciaComponent } from '@shared/components/dialog-historial-ausencia/dialog-historial-ausencia.component';
import { DialogObservarAusenciaComponent } from '@shared/components/dialog-observar-ausencia/dialog-observar-ausencia.component';
import { DialogVerAusenciaComponent } from '@shared/components/dialog-ver-ausencia/dialog-ver-ausencia.component';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { Ausenciaservice } from '../../services/Ausencia.service';
import { TmAdjunto } from '@core/models/TmAdjunto-interface';
import { MatTable } from '@angular/material/table';
import { AzureService } from '@core/azure/azure.service';

export interface verDialogData{
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

}

@Component({
  selector: 'app-bandeja-ausencia',
  templateUrl: './bandeja-ausencia.component.html',
  styleUrls: ['./bandeja-ausencia.component.css']
})
export class BandejaAusenciaComponent implements OnInit {
  matexpansionpanelfiltro: boolean = true;
  dsAdjunto: TmAdjunto[] = [];
  @ViewChild(MatTable) table?: MatTable<TmAdjunto>;
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  public CIPtxt: string ='';
  stamanecip = new FormControl('');
  public apellinombrestxt: string ='';
  stamaneapellinombres = new FormControl('');
  stmanetipoAusencia = new FormControl('');
  public listartipoAusenciaxid: any = [];
  public tipoAusenciaIDtxt: number=0;
  idvaluetipoausencia: number;
  public fechaAusencia: Date = new Date();
  isLoading: boolean= false;
  public listarbandejainterface: ListarbandejaausenciaDetalleResponse;
  public listarbandejarespuesta: any[];
  public fechainicio: string = '2022-12-01T00:00:00.342Z';
  public fechafin: Date = new Date();
  public nombreempleado: string ='';
  public idempleado: number=0;

  columnas = ['menu','stcolaborador','stfxinicioauasencia','stfxfinauasencia','stcantdias','stestado','staprobador',];
  codsolicitud: string;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private Ausenciaservice: Ausenciaservice,
    private azureService: AzureService,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
      stamanecip : this.stamanecip,
      stamaneapellinombres: this.stamaneapellinombres,
      stmanetipoAusencia: this.stmanetipoAusencia,
    });
    this.searchperfil(1,10)
    this.listartipoAusenciaMaestro();
    }

   listartipoAusenciaMaestro(id=38){
    this.Ausenciaservice.getlistartipoausenciaMaestro(id).subscribe((res: any)=>{
      this.listartipoAusenciaxid = res;
     // console.log('Lista-Tipo-Ausencia', this.listartipoAusenciaxid);
      });
    }
    chanetipoAusencia(e:any){
     this.idvaluetipoausencia = e.value;
   //  console.log('value-tipoasusencia', this.idvaluetipoausencia);
    }

    searchperfil(page: number, size:number){
      if(!this.fechainicio || !this.fechafin){
        this.bootstrapNotifyBarService.notifyWarning('Seleccione la fecha de Inicio y Fin.');
      }else{
        var data ={
          page: page,
          size: size,
         /* estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,*/
         idTipoAusencia:this.idvaluetipoausencia,
          fechaInicio: this.fechainicio,
          fechaFin: this.fechafin,
        };
       // console.log('data-paginado', data);
        this.Ausenciaservice.postlistarbajndejaausencia(data).subscribe((res: any)=>{
          this.listarbandejainterface = res;
         console.log('tabla-ausencia',this.listarbandejainterface);
          this.isLoading = false;
        }, error => this.isLoading = false);
      }
    }
    onPaginateChange(event: PageEvent) {
      const pageIndex = event.pageIndex + 1;
      const pageSize = event.pageSize;
      this.searchperfil(pageIndex, pageSize);
    }

    DescargarAdjunto(id: any){
        this.idempleado = id;
        console.log('IdEmpleado', this.idempleado);
        this.Ausenciaservice.getupdatedataausencia(id).subscribe((res: any) => {
          console.log('respuesta-ausencia-adj', res);
          //this.rptempleado = res.empleado.toUpperCase();
          this.tipoAusenciaIDtxt = res.idTipoAusencia;
          this.fechainicio = res.fechaInicio;
          this.fechafin = res.fechaFin;
          this.dsAdjunto = res.listAdjuntos;

          if(this.dsAdjunto.length == 0){
            this.bootstrapNotifyBarService.notifyDanger('No registro documento adjunto'.toUpperCase() );
          }else{

            this.azureService.downloadImagefile(this.dsAdjunto[0]);
          }

          //this.azureService.downloadImagefile(this.dsAdjunto[0]);
        });

    }


    ver(id: any, codigo: string, aprobador: string,cantidadDias:any,empleado: string,estado: any,fechaInicio: string,fechaFin: string, idEmpleado:any,idEstado: number,idTipoAusencia: number,motivoRechazo: string,tipoAusencia:string, comentario: string )
    {
      //console.log('id', id);
     // this.router.navigate(["/gestionasusencia/nuevasol/"+id]);
    this.dialogo.open(DialogVerAusenciaComponent, {
      maxWidth: '350vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '50%',
      disableClose: true,
      data: {
        titulo: `VER DATOS DE AUSENCIA`,
        id:id,
        codigo: codigo,
        aprobador: aprobador,
        cantidadDias:cantidadDias,
        empleado: empleado,
        estado: estado,
        fechaInicio:fechaInicio,
        fechaFin: fechaFin,
        idEmpleado:idEmpleado,
        idEstado: idEstado,
        idTipoAusencia: idTipoAusencia,
        motivoRechazo: motivoRechazo,
        tipoAusencia:tipoAusencia,
        comentario: comentario,


      }

    });
    }
    observar(id: any, codigo: string, aprobador: string,cantidadDias:any,empleado: string,estado: any,fechaInicio: string,fechaFin: string, idEmpleado:any,idEstado: number,idTipoAusencia: number,motivoRechazo: string,tipoAusencia:string, comentario: string){
      this.dialogo.open(DialogObservarAusenciaComponent, {
        maxWidth: '350vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '50%',
        disableClose: true,
        data: {
          titulo: `RECHAZAR AUSENCIA`,
          id:id,
          codigo: codigo,
          aprobador: aprobador,
          cantidadDias:cantidadDias,
          empleado: empleado,
          estado: estado,
          fechaInicio:fechaInicio,
          fechaFin: fechaFin,
          idEmpleado:idEmpleado,
          idEstado: idEstado,
          idTipoAusencia: idTipoAusencia,
          motivoRechazo: motivoRechazo,
          tipoAusencia:tipoAusencia,
          comentario: comentario,
        }

      });
    }

    aprobarAusencia(IdSolicitudAusencia: any, empleado: string){
      this.nombreempleado= empleado;
      //console.log('id - nombre',IdSolicitudAusencia, this.nombreempleado);
      this.Ausenciaservice.postaprobarausencia(IdSolicitudAusencia).subscribe((res: any)=>{
      this.bootstrapNotifyBarService.notifySuccess("Realizo una aprobación para:  " +  this.nombreempleado.toUpperCase() );
      this.searchperfil(1,10);
     });
    }

    HistorialAusencia(id: any, idEmpleado: number, empleado: string,codigo: string){
      this.dialogo.open(DialogHistorialAusenciaComponent, {
        maxWidth: '380vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '60%',
        disableClose: true,
        data: {
          titulo: `HiSTORIAL DE AUSENCIA`,
          id:id,
          idEmpleado:idEmpleado,
          empleado:empleado,
          codigo:codigo,
        }

      });



    }


}
