//import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, Inject, OnDestroy } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { AzureService } from '@core/azure/azure.service';
import { TmLogAcccion } from '@core/models/LogAccion.interface';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { UsuarioService } from '@shared/services/usuario.service';
import * as moment from 'moment';
import { threadId } from 'worker_threads';
import { Ausenciaservice } from '../../services/Ausencia.service';
import { timeStamp } from 'console';
import { ListartrabajadorespaginadoResponse } from '@core/models/activos.interface';
import { tmProveedor } from '@core/models/tmProveedor.interface';
import { TmAdjunto } from '@core/models/TmAdjunto-interface';
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { AssetService } from '@shared/services/asset.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { tmSolicitudComentarioProveedor } from '@core/models/tmSolicitudComentario';
import { DialogoComentarionComponent } from '@shared/components/dialogo-comentario/dialogo-comentario.component';
import { DialogRechazarContraComponent } from '@modules/contra/pages/form-contra/form-contra.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { map, startWith, debounceTime, distinctUntilChanged, tap, switchMap, finalize, filter } from 'rxjs/operators';
import { AdjuntoCloudElement } from '@core/models/administracion.model';



@Component({
  selector: 'app-newausencia',
  templateUrl: './newausencia.component.html',
  styleUrls: ['./newausencia.component.css']
})
export class NewausenciaComponent implements OnInit, OnDestroy {
  mode = new FormControl('side');
  public listartrabajadorespaginado: ListartrabajadorespaginadoResponse;
  public listartrabajador:any = [];
  public searchname: string ='';
  public btnguar: string = 'Guardar';
  public CIPtxt: string = '';
  public apellinombrestxt : string = '';
  public txtaprobador: string ='';
  progressRef!: NgProgressRef;
  stamanecip = new FormControl('');
  stamaneapellinombres = new FormControl('');
  stmanetipoAusencia = new FormControl('');
  stamaneaprobador = new FormControl('');
  myControlSolicitante = new FormControl('');
  stamanecomentario = new FormControl('');
  stamaneAppNombResp = new FormControl('');
  formulario!: FormGroup;
  public listartipoAusenciaxid: any = [];
  public listarestadoausencia: any = [];
  public tipoAusenciaIDtxt: number=0;
  public idestadovalue: number = 0;
  idvaluetipoausencia: number =0;
  public fechainicio: Date = new Date ();
  public fechafin: Date = new Date();
  public fxRegistroadj: Date = new Date();
  isLoadingAdjuntosGenerales: boolean = false;
  showsoldiasausenciatxt: boolean = false;
  public mostrasdias: number =0;
  @Input() solicitud?: TmSolicitud;
  dsLogAccion: TmLogAcccion[] = [];
  dsAdjunto: TmAdjunto[] = [];
  files: any[] = [];
  isLoading = false;
  filteredOptionsSolicitante: any;
  public nombretrabajador: any;
  public estadotxt: string = 'Solicitud';
  public respEstado: number=150;
  public idempladoselect: number=0;
  public rptempleado: string ='';
  public rptempleadoid: number =0;
  public txtcomentario: string ='';
  public idempleados: number=0;
  public respuestamensaje: string ='';
  public respuestamensajeedit: string = '';
  public isedit: boolean = false;
  public showregiscateg: boolean = true;
  public titulo: string = 'SOLICITUD DE AUSENCIA';
  public subtitulo: string = 'Crear ausencia';
  idausencia: number;
  public showinputnombres: boolean = true;
  public showbtnadjdocument: boolean = false;
  public idAprobadorjefe: number;

  codigo_Empleado: string='';
  @ViewChild('provInput') provInput?: ElementRef<HTMLInputElement>;
  @ViewChild(MatTable) table?: MatTable<TmAdjunto>;
  VerTabHistoria = false;
  VerTabComentario = false;
  dcAdjunto: string[] = ['stVerProveedor', 'acciones', 'stNombreArchivo', 'fxRegistro', 'Eliminar'];
  selection = new SelectionModel<TmAdjunto>(true, []);
  selectable = true;
  removable = true;
  dcLogAccion: string[] = ['stAccion', 'fxRegistro'];
  dcSolicitudComentario: string[] = ['Comentario', 'FechaHoraSitema'];
  dsSolicitudComentario: tmSolicitudComentarioProveedor[] = [];
  value: number = 0;
  isSubmitted: boolean = false;
  flagContenedorAdjunto: boolean = false;
  showbtnadjdoc: boolean = true;
  isShowing: boolean = false;
  flagContenedorEquipo: boolean = false;
  //public dia: Date = obj.getDate();
  listAdjuntosGenerales: AdjuntoCloudElement[] = [];
  public checkedtrue: boolean= false;
 public showradiobtn: boolean = false;

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
    private usuarioService: UsuarioService,
    private azureService: AzureService,
    private assetService: AssetService,
    private contratoService: ContraService,
    private ngProgress: NgProgress,
  ) {

    const id =  this.activatedRoute.snapshot.paramMap.get('id');

    if(id != null){
      this.idausencia = parseInt(id);
     // console.log('id-ausencia',this.idausencia);

      this.Obtenerdatosconcepto(id);
      this.isedit = true;
      this.titulo = 'EDITAR AUSENCIA';
      this.subtitulo = 'Editar ausencia';
      this.btnguar = 'Guardar';
      this.showsoldiasausenciatxt = true;
      this.showinputnombres = false;
     // this.isSubmitted = true;
     this.showbtnadjdoc = true;
     this.isShowing = false;
              }
     }

     public downloadImage(row: any) {

      this.azureService.downloadImagefile(row);
    }
     public deleteImageGenerales(row: any) {

      this.dialogo.open(DialogoConfirmacionComponent, {
        maxWidth: '25vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '25%',
        data: {
          titulo: `Mensaje de Confirmación`,
          mensaje: `¿Esta seguro que desea eliminar?`
        }
      })
        .afterClosed()
        .subscribe(async (confirmado: Boolean) => {
          if (confirmado) {
            this.azureService.deleteImage(row.stNombreArchivoRuta, () => {

              const index = this.dsAdjunto.indexOf(row);
              if (index >= 0) {
                this.dsAdjunto.splice(index, 1);
                this.table?.renderRows();
              }
              if (row.idAdjunto) {
                this.assetService.deleteTmAdjunto(row.idAdjunto).subscribe((res: any) => { });
              }
            })
          }
        });
    }

     ngOnDestroy(): void {
      this.ngProgress.destroyAll();
    }


 async ngOnInit(){
    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
      stamanecip : this.stamanecip,
      stamaneapellinombres: this.stamaneapellinombres,
      stmanetipoAusencia: this.stmanetipoAusencia,
      stamaneaprobador: this.stamaneaprobador,
      myControlSolicitante: this.myControlSolicitante,
      stamanecomentario: this.stamanecomentario,
      stamaneAppNombResp: this.stamaneAppNombResp,

    });
    this.listartipoAusenciaMaestro();
    this.listarestadoAusencia();
    this.bootstrapNotifyBarService.notifyWarning("Debe adjuntar un documento de sustento de ser necesario");
    this.formulario.controls['stamaneAppNombResp'].disable();
    this.formulario.controls['stamaneaprobador'].disable();
    //this.dsAdjunto = this.solicitud?.listAdjuntos;
    this.formulario.patchValue({
     /* myControlSolicitante: {
        nombre: this.solicitud?.stUsuarioRegistro,
        Id: this.solicitud?.fkUsuarioRegistro
       // nombre: this.searchname,
      }*/
    });
    this.progressRef = this.ngProgress.ref();
    this.progressRef.state.subscribe((state: any) => {
      this.value = state.value;
    });

  }
  searchSolicitante(page: number,size: number): void {
    this.isLoading = true;
    var data = {
      page: page,
      size: size,
      nombre: this.searchname,
      }
         this.Ausenciaservice.postpaginadotrabajador(data).subscribe((res: any) => {
         this.listartrabajador = res.data;
        // console.log('listar-trabajadores',this.listartrabajador);
         this.isLoading = false;
         }, error => this.isLoading = false);
  }
  displayFnSolicitante(user: any): string {
   // console.log('aaabcdf',user);
    this.idempladoselect = user.id;
  //  console.log('idtrabajador',this.idempladoselect);
    return user ? user.nombre: '';

  }


  chanetrabajador(e: any){
   // console.log('buscar-trabajador',e);
    this.searchname = e;
    this.idempleados = e.id;
  //  console.log('IDEMPLEADO-SELECIOANDO-*INPUT', this.idempleados);
    this.txtaprobador = e.personaLider;

    }

  listartipoAusenciaMaestro(id=38){
    this.Ausenciaservice.getlistartipoausenciaMaestro(id).subscribe((res: any)=>{
      this.listartipoAusenciaxid = res;
     // console.log('Lista-Tipo-Ausencia', this.listartipoAusenciaxid);
      });
    }
    listarestadoAusencia(id=39){
      this.Ausenciaservice.getlistarEstadoAusenciaMaestro(id).subscribe((res:any)=>{
      this.listarestadoausencia = res;
    //  console.log('Estado-Ausencia', this.listarestadoausencia);
      });
    }
  chanetipoAusencia(e: any){
      this.idvaluetipoausencia= e.value;
      console.log('tipo-ausencia-value', this.idvaluetipoausencia);

     //this.bootstrapNotifyBarService.notifyWarning("Debe adjuntar un documento de sustento.");
      if(this.idvaluetipoausencia == 4034){
        this.bootstrapNotifyBarService.notifyWarning("Seleccionara por defecto permiso de medio día. NO ES OBLIGATORIO ADJUNTAR DOCUMENTO");
        this.showradiobtn = true;
       /* this.formulario.controls['fxInicio'].disable();
        this.formulario.controls['fxFin'].disable();*/
        //this.showbtnadjdocument = true;
      }else{ //this.showbtnadjdocument = false;
        this.formulario.controls['fxInicio'].enable();
        this.formulario.controls['fxFin'].enable();
        this.showradiobtn = false;
       }
    }
    chaneEstado(e: any){
      this.idestadovalue = e.value;
     // console.log('IdEstado', this.idestadovalue);

    }
    Obtenerdatosconcepto(id){
      this.Ausenciaservice.getupdatedataausencia(id).subscribe((res: any) => {
       console.log('respuesta-ausencia', res);
       this.rptempleado = res.empleado.toUpperCase();
       this.rptempleadoid = res.idEmpleado;
       this.tipoAusenciaIDtxt = res.idTipoAusencia;
       this.fechainicio = res.fechaInicio;
       this.fechafin = res.fechaFin;
       this.txtcomentario = res.comentario;
       this.mostrasdias = res.cantidadDias;
       this.codigo_Empleado = res.codigo;
       this.txtaprobador = res.aprobador;
       this.dsAdjunto = res.listAdjuntos;
       this.idAprobadorjefe = res.idAprobador;
     //  console.log('nombre-respuesta',  this.rptempleado);
     //  console.log('Idempleado-respuesta',  this.rptempleadoid);
     //  console.log('IdtipoAusencia-respuesta',  this.tipoAusenciaIDtxt);
     //  console.log('codigoEmpleado-a editar', this.codigo_Empleado);
     });
     }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
      var dstar = moment(dateRangeStart.value, 'D/MM/YYYY').subtract(1, 'd'),
          dend = moment(dateRangeEnd.value, 'D/MM/YYYY'),
          //day = moment().day(),
          totaldays = dend.diff(dstar, 'days');
         // console.log(dateRangeStart.value, dstar);
        //  console.log(dateRangeEnd.value, dend);
         // console.log('dia', day);
        //  console.log('total de dias',totaldays);
          this.mostrasdias = totaldays;
          this.showsoldiasausenciatxt = true;
    }

  /*  dateRangeChange(){
     const timeStamp1 = this.fechainicio.getTime();
     const timeStamp2 = this.fechafin.getTime();
     const diff_Time = Math.abs(timeStamp1 - timeStamp2);
     const diff_Days = Math.ceil(diff_Time / (1000 * 60 * 60 * 24));
     console.log(diff_Time + "milliseconds");
     console.log(diff_Days + diff_Time);
     this.mostrasdias = diff_Days;
     this.showsoldiasausenciatxt = true;

    }*/
  /* dateRangeChange(){
     console.log('Fecha de inicio', this.fechainicio)
     const timeStamp1 = this.fechainicio.getTime();
     const timeStamp2 = this.fechafin.getTime();
     const diferencia = ((timeStamp1 - timeStamp2));
     const diferenciaEnDias = diferencia / 86400000;
     console.log(diferenciaEnDias); // 365
     this.mostrasdias = diferenciaEnDias;
     this.showsoldiasausenciatxt = true;
     console.log('Fecha de Fin', this.fechafin)
    }*/


    /* onSelect(event: any) {
      if (event.addedFiles.length > 1) {
        this.bootstrapNotifyBarService.notifyWarning("No se pueden agregar más de 1 archivos a la vez");
      } else {
        for (const file of event.addedFiles) {
          if (this.isFileSizeAllowed(file.size)) {

            if (this.files.length < 1) {
              event.addedFiles.forEach((x: any) => {
                x.progress = 0;
              });
              this.files.push(file);
              this.uploadFilesSimulator(0);

            } else {
              this.bootstrapNotifyBarService.notifyWarning("Se permiten un máximo de 1 archivos.");
              //this.toastr.error("Maximum 6 files are allowed.");
            }
          } else {
            this.bootstrapNotifyBarService.notifyWarning("El tamaño máximo de un archivo permitido es de 2 mb, los archivos con un tamaño superior a 2 mb se descartan.");
            //this.toastr.error("Max size of a file allowed is 1mb, files with size more than 1mb are discarded.");
          }
        }
      }
    } */

    onSelect(event: any) {
      this.dialogo.open(DialogoConfirmacionComponent, {
        maxWidth: '25vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '25%',
        disableClose: true,
        data: {
          titulo: `Mensaje de Confirmación`,
          mensaje: `Este archivo será visualizado por su jefe inmediato?`
        }
      })
        .afterClosed()
        .subscribe(async (confirmado: boolean) => {
          if (event.addedFiles.length > 1) {
            this.bootstrapNotifyBarService.notifyWarning("No se pueden agregar más de 1 archivos a la vez");
          } else {
            this.progressRef.start();
            for (const file of event.addedFiles) {
              if (this.isFileSizeAllowed(file.size)) {
                if (this.files.length < 1) {
                  event.addedFiles.forEach((x: any) => {
                    x.progress = 0;

                  });
                  let adj: TmAdjunto = {
                    stUsuarioRegistro: localStorage.getItem("NombreCompleto") || "",
                    fxRegistro: new Date(),
                    stNombreArchivo: file.name,
                    tamanio: file.size,
                    progress: 0,
                    file: file,
                    nombreExtension: "." + file.name.split(".").pop(),
                    //stNombreArchivoRuta: res.ruta,
                    stVerProveedor: confirmado ? "SI" : "NO",
                    blMarca: confirmado
                  }
                  this.progressRef.complete();
                  if (this.idausencia) {
                    this.progressRef.start();
                    const blob = new Blob([file], { type: file.type });
                    const response = await this.azureService.uploadFile(blob, file.name);
                    adj.stNombreArchivoRuta = response.uuidFileName;
                    adj.IdRegistro = this.idausencia;
                    adj.stNombreTabla="SolicitudAusencia";
                      this.assetService.postTmAdjunto(adj)
                        .subscribe((res: any) => {
                          adj.idAdjunto = res.idAdjunto;
                          this.dsAdjunto.push(adj);
                          this.table?.renderRows();
                        })
                        this.progressRef.complete();
                  } else
                    this.dsAdjunto.push(adj);

                  this.uploadFilesSimulator(0);
                } else {
                  this.bootstrapNotifyBarService.notifyWarning("Se permiten un máximo de 1 archivos.");
                }
              } else {
                this.bootstrapNotifyBarService.notifyWarning("El tamaño máximo de un archivo permitido es de 2mb, los archivos con un tamaño superior a 2 mb se descartan.");
              }
            }



          }
        });

    }

    onRemove(event: any) {
      this.files.splice(this.files.indexOf(event), 1);
    }
    isFileSizeAllowed(size: any) {
      let isFileSizeAllowed = false;
      if (size < 2000000) {
        isFileSizeAllowed = true;
      }
      return isFileSizeAllowed;
    }
    uploadFilesSimulator(index: number) {
      setTimeout(() => {
        if (index === this.files.length) {
          return;
        } else {
          const progressInterval = setInterval(() => {
            if (this.files[index].progress === 100) {
              clearInterval(progressInterval);
              this.uploadFilesSimulator(index + 1);
            } else {
              this.files[index].progress += 5;
            }
          }, 200);
        }
      }, 1000);
    }
    /**
 /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
 formatBytes(bytes: any, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      return;
    }
    this.files.splice(index, 1);
  }


 /* public deleteImageGenerales(row: any) {
    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `¿Esta seguro que desea eliminar?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        if (confirmado) {
          this.azureService.deleteImage(row.stNombreArchivoRuta, () => {

            const index = this.dsAdjunto.indexOf(row);
            if (index >= 0) {
              this.dsAdjunto.splice(index, 1);
              this.table?.renderRows();
            }
            if (row.idAdjunto) {
              this.assetService.deleteTmAdjunto(row.idAdjunto).subscribe((res: any) => { });
            }
          })
        }
      });
  } */

  btnAdjuntos_Click(){
   // this.isLoadingAdjuntosGenerales = true;
    this.flagContenedorAdjunto = false;


  }
  eliminarArchivo(record: TmAdjunto) {
    const ok = confirm('¿Está seguro de eliminar el archivo?');
    if (ok) {

      this.assetService.deleteArchivo(record.stNombreArchivoRuta || "")
        .subscribe((res: any) => {
          const index = this.dsAdjunto.indexOf(record);
          if (index >= 0) {
            this.dsAdjunto.splice(index, 1);
            this.table?.renderRows();
          }
          if (record.idAdjunto) {
            this.assetService.deleteTmAdjunto(record.idAdjunto).subscribe((res: any) => { });
          }
        })
    }
  }
  private isNumber(value: string | number): boolean {
    return ((value != null) &&
      (value !== '') &&
      !isNaN(Number(value.toString())));
  }
  displayStyle = "none";


  openPopup() {
    this.dialogo.open(DialogoComentarionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Nuevo comentario`,
      }
    })
      .afterClosed()
      .subscribe(async (res: any) => {

        if (res.respuesta) {
          this.formulario = this.fb.group({
            Comentario: res.txtComentario,
            IdSolicitud: this.solicitud?.idSolicitud
          });
          this.contratoService.crearComentarioSolicitud(this.formulario.value).subscribe(data => {
            this.bootstrapNotifyBarService.notifySuccess('Comentario agregado correctamente');
          });
        }
      });


    //this.displayStyle = "block";
    /*var modalComentarios = (document.getElementById("modalComentarios")) as HTMLFormElement;
    modalComentarios.style.display = "block";*/

  }
  Rechazar() {
    const dialogRef = this.dialog.open(DialogRechazarContraComponent, {
      maxWidth: '30vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '30%',
      disableClose: true,
      data: { stCodigo: this.solicitud!.stCodigo },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.contratoService.RechazarSolicitud(this.solicitud!.idSolicitud, result)
          .subscribe(data => {
            this.bootstrapNotifyBarService.notifySuccess('Solicitud rechazada');
            //this.snackBar.open('Solicitud rechazada', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
            this.router.navigate(['/contrato', 'reg']);
          });
      }
    });
  }
  descargarArchivo(record: TmAdjunto) {
    this.assetService.descargarArchivo(record.stNombreArchivoRuta || "")
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = record.stNombreArchivoRuta || "";
        a.click();
        URL.revokeObjectURL(objectUrl);
      })
  }

  Aprobar() {
    /*if (this.provs.length == 0) {
      alert("Seleccione un proveedor para la aprobación");
      this.formulario.markAllAsTouched();
    } else {
      */

    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Registro de Talento`,
        mensaje: `¿Está seguro de realizar la aprobación?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        if (confirmado) {

          let arrIdProveedor: number[] = [];
          //this.provs.forEach(a => arrIdProveedor.push(a.idProveedor));
          const arrProveedor: string = arrIdProveedor.join(',');
          const stAIP: string = this.formulario.controls['stAIP'].value;
          this.formulario = this.fb.group({
            IdSolicitud: this.solicitud?.idSolicitud,
            arrProveedor: arrProveedor
          });

          /* this.contratoService.AprobarSolicitud(this.formulario.value)
             .subscribe(data => {
               this.router.navigate(['/contrato', 'reg']);
               this.snackBar.open('Solicitud aprobada', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
             });*/

          this.contratoService.AprobarSolicitud(this.formulario.value).subscribe(data => {
            this.bootstrapNotifyBarService.notifySuccess('Solicitud aprobada');
            setTimeout(() => {
              this.router.navigate(['/contrato', 'reg']);
            }, 3000)

          });
        }
      });

    /*var rpta = confirm("Está seguro de realizar la aprobación?");
    if (rpta) {


    }*/
    //}
  }
  radioChane(e: any){
    var _valueradiobtn = e.value;
    console.log('valor de raio boton',_valueradiobtn);

  }
   async guardarAusencia(){
    // console.log('clic boton guardar');
     if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
     return;
      }
      if(this.isedit){
        this.progressRef.start();
     /*  var listAdjuntosedi: any [];
       if (this.dsAdjunto.length > 0){
        for await (const item of this.dsAdjunto){
          const blob = new Blob([item.file], { type: item.file.type });
          const response = await this.azureService.uploadFile(blob, item.file.name);
          item.stNombreArchivoRuta = response.uuidFileName;
        }
      }*/

      var edit = {
        id:this.idausencia,
        //idEmpleado: this.idempleados,
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
        idTipoAusencia:this.tipoAusenciaIDtxt,
       // idEstado: this.idestadovalue,
       // idAprobador: this.idAprobadorjefe,
        comentario: this.txtcomentario,
        }
        // console.log('datos-editar',edit)
        this.Ausenciaservice.putactualizarAusencia(edit).subscribe((res: any)=>{
         // console.log('respuesta-edit',res);
          this.respuestamensajeedit = res.mensaje;
          this.bootstrapNotifyBarService.notifyWarning(this.respuestamensajeedit);
          this.router.navigate(["/gestionasusencia/bandausencia"]);
        });
        this.progressRef.complete();
      }else{
        this.progressRef.start();
        var listAdjuntos: any =  [];
        if (this.dsAdjunto.length > 0){
          for await (const item of this.dsAdjunto){
            const blob = new Blob([item.file], { type: item.file.type });
            const response = await this.azureService.uploadFile(blob, item.file.name);
            item.stNombreArchivoRuta = response.uuidFileName;
          }
        }

       /* var diasotros: number =0;
        if(this.idvaluetipoausencia==4034){
          diasotros = 0.5
        }else{

        }*/

        var data = {

                    idEmpleado: this.idempleados,
                    fechaInicio: this.fechainicio,
                    fechaFin: this.fechafin,
                    idTipoAusencia: this.idvaluetipoausencia,
                    comentario: this.txtcomentario,
                    listAdjuntos: this.dsAdjunto,
                  }
       // console.log('Datos a enviar de ausencia',data);
        this.Ausenciaservice.postguardarausencia(data).subscribe((res: any)=>{
         // console.log('respuesta',res);
          this.respuestamensaje = res.mensaje;
         // console.log('Mensaje de respuesta',this.respuestamensaje);
          this.bootstrapNotifyBarService.notifySuccess('Se registro correctamente');
          this.router.navigate(["/gestionasusencia/bandausencia"]);
        });
        this.progressRef.complete();
      }


    }

}
