import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { AssetService } from '@shared/services/asset.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tmProveedor } from '@core/models/tmProveedor.interface';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { trProveedorPostulante } from '@core/models/trProveedorPostulante.interface';
import { ModalFechaComponent } from '../modal-fecha/modal-fecha.component';
import { AuthService } from '@core/auth/auth.service';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoRechazoEntrevistaComponent } from '@shared/components/dialogo-rechazoentrevista/dialogo-rechazoentrevista.component';
import { AzureService } from "@core/azure/azure.service";
import { StepTabService } from '@modules/contra/services/StepTabService';

@Component({
  selector: 'app-editar-contra',
  templateUrl: './editar-contra.component.html',
  styleUrls: [
  ]
})

export class EditarContraComponent implements OnInit {
  IsVisibleEditarTarifa = true;
  IsVisiblePermiteEditarSolicitud = true;
  formData!: FormGroup;
  public demo1TabIndex = 2;
  displayedColumns: string[] = ['stNombre', 'urlCv', 'flPresupuestoMensual', 'stGradoInstruccion', 'stResultado', 'inPrioridad', 'stDisponibilidad', 'fxFechaEntrevista', 'stLugarEntrevista', 'stEstado', 'stMotivoRechazo', 'Acciones'];
  displayedColumns2: string[] = ['menu', 'stEstado', 'stNombre', 'stDocumento', 'urlCv', 'flPresupuestoMensual', 'stGradoInstruccion', 'stDisponibilidad', 'fxFechaEntrevista', 'stLugarEntrevista', 'stMotivoRechazo', 'stResultado', 'inPrioridad'];

  dsPostulantes: trProveedorPostulante[] = [];
  IsProveedor = localStorage.getItem('role') == 'PROVEEDOR';
  // selectProv?: tmProveedor;
  idProveedorSelect: number = -1;
  solicitud?: TmSolicitud
  allProvs: tmProveedor[] = [];
  id: number = 0;

  constructor(

    public stepService: StepTabService,
    private fb: FormBuilder,
    private contratoService: ContraService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private azureService: AzureService,
    //private snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private assetService: AssetService,
    private authService: AuthService
  ) {
    
    this.stepService.StepTab = 0;
  }
  CargarPostulantes() {
    this.contratoService.getPostulantes(this.idProveedorSelect, this.id).subscribe((res: any) => {

      this.dsPostulantes = res;
    });
  }
  ngOnInit(): void {
    //alert("adad");

    this.IsVisiblePermiteEditarSolicitud = this.authService.getPermiteEditarSolicitud();

    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.contratoService.getSolicitud(this.id).subscribe((data: any) => {

      this.solicitud = data;
      if (this.solicitud?.solicitudProveedor != undefined && this.solicitud?.solicitudProveedor.length > 0) {
        this.allProvs = this.solicitud?.solicitudProveedor || [];
        this.idProveedorSelect = this.allProvs[0].idProveedor;
        // this.selectProv=this.allProvs[0];
        if (this.allProvs.length)
          this.CargarPostulantes();
      }
    });
  }
  actualizar(sol: TmSolicitud) {

    this.contratoService.actualizarSolicitud(this.solicitud!.idSolicitud, sol)
      .subscribe(data => {
        this.bootstrapNotifyBarService.notifySuccess('Actualización correcta');
        //this.router.navigate(['/contrato', 'reg']);
      });
  }
  AgregarPostulante() {
    const dialogRef = this.dialog.open(PostulanteContraComponent, {
      maxWidth: '40vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '40%',
      disableClose: true,
      data: { fkSolicitud: this.solicitud!.idSolicitud, fkProveedor: this.idProveedorSelect }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.CargarPostulantes();
    });
  }
  descargarArchivo(ruta: string) {


    this.azureService.downloadImagefilePersonalizado(ruta);
    /*this.assetService.descargarArchivo(ruta)
      .subscribe(blob => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = ruta;
        a.click();
        URL.revokeObjectURL(objectUrl);
      })*/
  }
  abrirUrl(linkPerfil: string) {
    window.open(linkPerfil);
  }
  solicitarEntrevista(record: trProveedorPostulante) {
    const dialogRef = this.dialog.open(ModalFechaComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: { titulo: "Ingrese fecha de entrevista", id: record.idPostulante, accion: "solicitarEntrevista" },
    });
    dialogRef.afterClosed().subscribe(result => { this.CargarPostulantes(); });
  }
  EditarTarifaSOlicitud(record: trProveedorPostulante) {
    var stpresup = (document.getElementById("txt_" + record.idPostulante)) as HTMLInputElement;
    this.formData = this.fb.group({
      idPostulante: record.idPostulante,
      flPresupuestoMensual: stpresup.value,
    });

    this.contratoService.actualizarSolicitud_TarifaPostulante(this.formData.value).subscribe(data => {
      this.bootstrapNotifyBarService.notifySuccess('Tarifa actualizada correctamente');
      window.location.reload();
    });
  }
  RechazarEntrevista(record: trProveedorPostulante) {
    this.dialog.open(DialogoRechazoEntrevistaComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Motivo de Rechazo`,
      }
    })
      .afterClosed()
      .subscribe(async (res: any) => {

        if (res.respuesta) {
          this.contratoService.getRechazarEntrevista(record.idPostulante, res.txtComentario || "")
            .subscribe(data => {
              this.bootstrapNotifyBarService.notifySuccess('Postulante rechazado correctamente');
              this.CargarPostulantes();
            });
        }
      });
  }
  IngresarFeedBackEntrevista(record: trProveedorPostulante) {
    const dialogRef = this.dialog.open(FeedbackEntrevista, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: { id: record.idPostulante },
    });
    dialogRef.afterClosed().subscribe(result => { this.CargarPostulantes(); });
  }
  AprobarEntrevista(record: trProveedorPostulante) {

    const dialogRef = this.dialog.open(ModalFechaComponent, {
      maxWidth: '28vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '28%',
      disableClose: true,
      data: { titulo: "Confirmar la entrevista", id: record.idPostulante, accion: "AprobarEntrevista", fecha: record.fxFechaEntrevista },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.CargarPostulantes();
    });
  }
  seleccionarGanador(record: trProveedorPostulante) {
    this.dialog.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de confirmacion`,
        mensaje: `Si elige al candidato como ganador, se cerrará el reclutamiento.  Desea continuar?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        if (confirmado) {
          this.contratoService.getSeleccionarGanador(record.idPostulante)
            .subscribe((res: any) => {
              this.bootstrapNotifyBarService.notifySuccess('Se cerró el proceso de reclutamiento correctamente.');
              this.CargarPostulantes();
              //this.router.navigate(['/contrato', 'reg']);//
            });
        }
      });
  }
  onProveedorChange(pv: { value: any; }) {
    this.idProveedorSelect = pv.value;
    this.CargarPostulantes();
  }

  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}

@Component({
  selector: 'FeedbackEntrevista-contra',
  templateUrl: 'FeedbackEntrevista-contra.component.html',
})
export class FeedbackEntrevista {
  stResultadoEntrevista: string;
  inPrioridad: string;
  esElegido: boolean;
  constructor(
    public dialogRef: MatDialogRef<EditarContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private contratoService: ContraService,
    public dialogo: MatDialog,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    //private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.stResultadoEntrevista = "Cumple expectativas";
    this.inPrioridad = "1";
    this.esElegido = false;
  }
  guardar() {
    if (this.esElegido) {
      this.dialogo.open(DialogoConfirmacionComponent, {
        maxWidth: '25vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '25%',
        disableClose: true,
        data: {
          titulo: `Mensaje de confirmacion`,
          mensaje: `Si elige al candidato,se cerrará el reclutamiento, Desea continuar?`
        }
      })
        .afterClosed()
        .subscribe(async (confirmado: Boolean) => {
          if (confirmado) {
            this.contratoService.getDarFeedback(this.data.id, this.stResultadoEntrevista, parseInt(this.inPrioridad), this.esElegido)
              .subscribe((res: any) => {
                this.bootstrapNotifyBarService.notifySuccess('feedback registrado');
                this.onNoClick();
                /*if (this.esElegido)
                  this.router.navigate(['/contrato', 'reg']);*/
              });
          }
        });

    } else {
      this.contratoService.getDarFeedback(this.data.id, this.stResultadoEntrevista, parseInt(this.inPrioridad), this.esElegido)
        .subscribe((res: any) => {
          this.bootstrapNotifyBarService.notifySuccess('feedback registrado');
          this.onNoClick();
          //this.router.navigate(['/contrato', 'reg']);          
        });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'Postulante-contra',
  templateUrl: 'Postulante-contra.component.html',
})
export class PostulanteContraComponent implements OnInit {

  formPustulante!: FormGroup;
  formData!: FormGroup;
  Disponibilidad: MaestroDetalle[] = [];
  srcFoto?: string = "assets/img/User-Profile.png";
  urlFotoAux: string = "";
  urlCvAux?: string = "";
  IsProcesando: boolean = false;
  constructor(
    private azureService: AzureService,
    public dialogRef: MatDialogRef<EditarContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: trProveedorPostulante,
    private contratoService: ContraService,
    private fb: FormBuilder,
    private assetService: AssetService,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    //private snackBar: MatSnackBar,

  ) { }
  ngOnInit(): void {
    this.contratoService.getMaestroDetalle(11).subscribe((res: any) => { this.Disponibilidad = res; });

    this.formPustulante = this.fb.group({
      stNombre: [, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      stGradoInstruccion: [, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      linkPerfil: [, [Validators.maxLength(200)]],
      inEdad: [, [Validators.required]],
      fkMdDisponibilidad: [, [Validators.required]],
      stNroDocumento: [, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      flPresupuestoMensual: [, [Validators.required]],
      urlFoto: [],
      urlCv: []
    });
  }

  async onFileSelected(event: any, nombrePropiedad: string) {
    const file = event.target.files[0];
    if (file) {
      /*const formData = new FormData();
      formData.append('file', file);
      this.assetService.subirArchivo(formData)
        .subscribe((asset: any) => {*/

      this.formPustulante.controls[nombrePropiedad].setValue(file.name);
      const blob = new Blob([file], { type: file.type });
      const response = await this.azureService.uploadFile(blob, file.name);
      //item.stNombreArchivoRuta = response.uuidFileName;

      if (nombrePropiedad == "urlFoto") {
        this.urlFotoAux = response.uuidFileName;
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.srcFoto = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else
        this.urlCvAux = response.uuidFileName;


      //});
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  guardar() {
    this.IsProcesando = true;
    if (this.formPustulante.value.urlFoto != "")
      this.formPustulante.value.urlFoto = this.urlFotoAux;
    if (this.formPustulante.value.urlCv != "")
      this.formPustulante.value.urlCv = this.urlCvAux;
    this.formPustulante.value.fkSolicitud = this.data.fkSolicitud;
    this.formPustulante.value.fkProveedor = this.data.fkProveedor;
    this.contratoService.crearPostulante(this.formPustulante.value)
      .subscribe(data => {
        /*this.snackBar.open('Postulante agregado correctamente', 'Ok', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });*/

        this.bootstrapNotifyBarService.notifySuccess('Postulante agregado correctamente');

        this.onNoClick();
        this.IsProcesando = false;
      });
  }
}

@Component({
  selector: 'modalSoloFecha-contra',
  templateUrl: 'modalSoloFecha-contra.component.html',
})
export class ModalSoloFecha {
  fecha?: Date;
  date = new FormControl(new Date());
  constructor(
    public dialogRef: MatDialogRef<EditarContraComponent>,
    private contratoService: ContraService,
    //private snackBar: MatSnackBar,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public idSolicitud: number,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  guardar() {
    if (this.fecha) {
      this.contratoService.getConfirmarDisponibilidad(this.idSolicitud, this.fecha?.toDateString())
        .subscribe(data => {
          this.bootstrapNotifyBarService.notifySuccess('Disponibilidad confirmada correctamente');
          //this.snackBar.open('Disponibilidad confirmada correctamente', 'Ok', {duration: 3 * 1000,horizontalPosition: 'center',verticalPosition: 'top'});
          //this.router.navigate(['/contrato', 'reg']);
          this.onNoClick();
        });
    }
    else {
      this.bootstrapNotifyBarService.notifySuccess('Ingrese la fecha de conformidad');
      //alert("Ingrese la fecha de conformidad");
    }
  }
}