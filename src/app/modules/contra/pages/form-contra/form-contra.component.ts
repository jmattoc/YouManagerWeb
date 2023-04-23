import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { ContraService } from '../../services/contra.service';
import { AssetService } from '@shared/services/asset.service';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { tmAgencia } from '@core/models/Agencia.interface';
import { TmSolicitud } from '@core/models/TmSolicitud.interface';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged, tap, switchMap, finalize, filter } from 'rxjs/operators';
import { tmProveedor } from '@core/models/tmProveedor.interface';
import { TmLogAcccion } from '@core/models/LogAccion.interface';
import { TmAdjunto } from '@core/models/TmAdjunto-interface';
import { MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalSoloFecha } from '../editar-contra/editar-contra.component';
import { trProveedorPostulante } from '@core/models/trProveedorPostulante.interface';
import { tmSolicitudComentarioProveedor } from '@core/models/tmSolicitudComentario';
import { AuthService } from '@core/auth/auth.service';
import { reqActualizarSolicitud } from '@core/models/reqActualizarSolicitud';
import { Horario } from '@core/models/adm/Horario';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoComentarionComponent } from '@shared/components/dialogo-comentario/dialogo-comentario.component';
import { AzureService } from "@core/azure/azure.service";
export interface DialogData { idSolicitud: number; stCodigo: string; stMotivo: string; }
import { UsuarioService } from "@shared/services/usuario.service";
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { NgProgress, NgProgressRef } from '@ngx-progressbar/core';
import { StepTabService } from '@modules/contra/services/StepTabService';
import { DialogNewperfilpuestoComponent } from '../../../../shared/components/dialog-newperfilpuesto/dialog-newperfilpuesto.component';

@Component({
  selector: 'app-form-contra',
  templateUrl: './form-contra.component.html',
  styleUrls: ['./form-contra.component.css'

  ]
})
export class FormContraComponent implements OnInit {

  mode = new FormControl('side');
  listaCorreo = new FormControl('');
  diasSemanaDefault: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  showFiller = false;
  dcLogAccion: string[] = ['stAccion', 'fxRegistro'];
  dsLogAccion: TmLogAcccion[] = [];
  dcSolicitudComentario: string[] = ['Comentario', 'FechaHoraSitema'];
  dsSolicitudComentario: tmSolicitudComentarioProveedor[] = [];
  dsAdjunto: TmAdjunto[] = [];
  dcAdjunto: string[] = ['stVerProveedor', 'acciones', 'stNombreArchivo', 'fxRegistro', 'Eliminar'];
  selection = new SelectionModel<TmAdjunto>(true, []);
  selectable = true;
  removable = true;
  IsVisiblePresupuesto = true;
  isVisibleReemplazado = false;
  isVisiblePostulante = false;
  IsProveedor = localStorage.getItem('role') == 'PROVEEDOR';
  VerTabHistoria = false;
  VerTabComentario = false;
  files: any[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  provCtrl = new FormControl();
  controlPostulante = new FormControl();
  allPostulantes: trProveedorPostulante[] = [];
  filteredPostulantes?: Observable<trProveedorPostulante[]>;

  filteredProvs: Observable<tmProveedor[]>;
  //provs: tmProveedor[] = [];
  allProvs: tmProveedor[] = [];


  isSolicitarAprobVisible: boolean = false;
  isConfirmarDisponibilidad: boolean = false;
  isSolicitarRqAccesos: boolean = false;
  isVisibleRegistrarRq: boolean = false;
  isVisibleRegistrarOc: boolean = false;
  isPermiteAgregarEliminarAdj: boolean = true;
  MostrarProveedorInvolucrado: boolean = false;
  isAprobRechazoVisible: boolean = false;

  showpercrearfilpuesto: boolean = true;
  isActualizacionVisible: boolean = true;
  isGuardarVisible: boolean = true;
  isDisabledProvInvolucrado: boolean = false;
  isVisibleRangoDisponibilidad: boolean = false;
  isVisibleRq: boolean = false;
  isVisibleOc: boolean = false;
  tipoSolicitud: MaestroDetalle[] = [];
  tipoContrato: MaestroDetalle[] = [];
  sueldoAnuales: MaestroDetalle[] = [];
  tipoTrabajador: MaestroDetalle[] = [];
  EstadoSubEstado: MaestroDetalle[] = [];

  asignacionesAlTalento: MaestroDetalle[] = [];
  asignacionesAdicionalesAlTalento: MaestroDetalle[] = [];
  groups: any;
  proyecto: tmProyecto[] = [];
  rol: MaestroDetalle[] = [];
  funcion: MaestroDetalle[] = [];
  perfilValido: MaestroDetalle[] = [];
  lineaContable: MaestroDetalle[] = [];
  arquetipo: MaestroDetalle[] = [];
  laptop: MaestroDetalle[] = [];
  vistoBueno: MaestroDetalle[] = [];
  listaComentario: MaestroDetalle[] = [];
  ValvistoBueno: number[] = [];
  ValdiasLaborables: string[] = [];
  agencias: tmAgencia[] = [];
  date = new FormControl(new Date());
  fxInicioDisponibilidad = new FormControl();
  stCodigoRq = new FormControl();
  stCodigoOc = new FormControl();
  clinicas: MaestroDetalle[] = [];
  fxFinDisponibilidad = new FormControl();
  fkClinicaEMO = new FormControl();
  fxSolicitudEMO = new FormControl();
  horaSolicitudEMO = new FormControl();
  serializedDate = new FormControl(new Date().toISOString());
  formulario!: FormGroup;
  fxDisponibilidadPostulante?: string;
  IsDisponibilidadPostulante: boolean = false;
  isLoading = false;
  filteredOptionsSolicitante: any;
  myControlSolicitante = new FormControl('');
  //IsVisibleAvisoPerfil: boolean = false;
  horarios: Horario[] = [];
  @Input() solicitud?: TmSolicitud;
  @Output() onGuardar: EventEmitter<TmSolicitud> = new EventEmitter();
  @ViewChild('provInput') provInput?: ElementRef<HTMLInputElement>;
  @ViewChild(MatTable) table?: MatTable<TmAdjunto>;
  constructor(
    public dialogo: MatDialog,
    private fb: FormBuilder,
    private assetService: AssetService,
    private contratoService: ContraService,
    private router: Router,
    public stepService: StepTabService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    public dialog: MatDialog,
    private azureService: AzureService,

  ) {
    this.filteredProvs = this.provCtrl.valueChanges.pipe(startWith(null), map((prov: string | null) => (prov ? this._filter(prov) : this.allProvs.slice())));
  }

  displayFnSolicitante(user: any): string {
    return user ? user.NombreCompleto : '';
  }
  searchSolicitante(): void {
    this.isLoading = true;

    this.usuarioService.obtenerUsuarios().then((data) => {
      this.filteredOptionsSolicitante = data;
      this.isLoading = false;
    });
  }
  /*
    searchPostulante(): void {
      this.isLoading = true;
      this._filterPost("");
      //cargarPostulantes();
    }
  */

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

  async ngOnInit() {

    ///this.contratoService.getMaestroDetalle(23).subscribe((res: any) => { this.asignacionesAlTalento = res; });
    //this.contratoService.getMaestroDetalle(24).subscribe((res: any) => { this.asignacionesAdicionalesAlTalento = res; });
    this.asignacionesAlTalento = await this.contratoService.getMaestroDetalleAsync(23);
    this.asignacionesAdicionalesAlTalento = await this.contratoService.getMaestroDetalleAsync(24);

    this.groups = asEnumerable(this.asignacionesAdicionalesAlTalento)
      .Select((option, index) => { return { option, index }; })
      .GroupBy(
        x => Math.floor(x.index / 3),
        x => x.option,
        (key, options) => asEnumerable(options).ToArray()
      )
      .ToArray();


    this.contratoService.getProyectos().subscribe((res: any) => { this.proyecto = res; });
    this.contratoService.getAgencias().subscribe((res: any) => { this.agencias = res; });
    this.contratoService.getMaestroDetalle(1).subscribe((res: any) => { this.tipoSolicitud = res; });
    this.contratoService.getMaestroDetalle(2).subscribe((res: any) => { this.rol = res; });
    this.contratoService.getMaestroDetalle(3).subscribe((res: any) => { this.lineaContable = res; });
    this.perfilValido = await this.contratoService.getMaestroDetalleAsync(8);
    //this.contratoService.getMaestroDetalle(8).subscribe((res: any) => { this.perfilValido = res; });

    this.contratoService.getMaestroDetalle(4).subscribe((res: any) => { this.arquetipo = res; });
    this.contratoService.getMaestroDetalle(5).subscribe((res: any) => { this.laptop = res; });
    this.contratoService.getMaestroDetalle(18).subscribe((res: any) => { this.listaComentario = res; });
    this.contratoService.getMaestroDetalle(6).subscribe((res: any) => { this.vistoBueno = res; });
    this.contratoService.getListarHorario().subscribe(data => { this.horarios = data; });
    this.contratoService.getMaestroDetalle(20).subscribe((res: any) => { this.tipoTrabajador = res; });
    this.contratoService.getMaestroDetalle(21).subscribe((res: any) => { this.tipoContrato = res; });
    this.contratoService.getMaestroDetalle(22).subscribe((res: any) => { this.sueldoAnuales = res; });
    if (this.solicitud) {

      if (this.solicitud?.stDisponibilidadPostulante) {
        this.fxDisponibilidadPostulante = this.solicitud?.stDisponibilidadPostulante;
        this.IsDisponibilidadPostulante = true;
      }
      if (this.solicitud?.fxInicioConfirmada) {
        this.fxInicioDisponibilidad = new FormControl(this.solicitud?.fxInicioConfirmada);
        this.fxFinDisponibilidad = new FormControl(this.solicitud?.fxFinConfirmada);
        this.fkClinicaEMO = new FormControl(this.solicitud?.fkClinicaEMO);
        this.fxSolicitudEMO = new FormControl(this.solicitud?.fxSolicitudEMO);
        this.horaSolicitudEMO = new FormControl(this.solicitud?.horaSolicitudEMO);
      }
      this.stCodigoRq = new FormControl(this.solicitud?.stCodigoRq);
      this.stCodigoOc = new FormControl(this.solicitud?.stCodigoOc);

      this.dsAdjunto = this.solicitud?.listAdjuntos;
      this.VerTabHistoria = !this.IsProveedor;
      this.VerTabComentario = true;
      this.IsVisiblePresupuesto = !this.IsProveedor;
      if (this.solicitud?.stReemplazado) this.isVisibleReemplazado = true;
      if (this.solicitud?.stPostulanteGanador) {
        this.isVisiblePostulante = true;
        this.controlPostulante = new FormControl({
          idPostulante: this.solicitud?.idPostulanteGanador,
          stNombre: this.solicitud?.stPostulanteGanador
        });
      }
      var IsVisiblePermiteEditarSolicitud = this.authService.getPermiteEditarSolicitud();

      if (this.asignacionesAlTalento.length > 0) {
        this.asignacionesAlTalento.forEach((x) => {
          x.disabled = true;
        });
      }
      if (this.asignacionesAdicionalesAlTalento.length > 0) {
        this.asignacionesAdicionalesAlTalento.forEach((x) => {
          x.disabled = true;
        });
      }

      var controlsAsignacionesAlTalento: any = this.asignacionesAlTalento.map(c => new FormControl(false));
      this.setCheboxes(this.asignacionesAlTalento, this.solicitud?.idsAsignaciones, controlsAsignacionesAlTalento);
      var controlsAsignacionesAdicionalesAlTalento: any = this.asignacionesAdicionalesAlTalento.map(c => new FormControl(false));
      this.setCheboxes(this.asignacionesAdicionalesAlTalento, this.solicitud?.idsAsignacionesAdicionales, controlsAsignacionesAdicionalesAlTalento);

      this.showpercrearfilpuesto = false;

      this.formulario = this.fb.group({
        myControlSolicitante: this.myControlSolicitante,
        fxRegistro: [{ value: this.solicitud?.fxRegistro, disabled: true }, [Validators.required]],
        fkMdTipoRecurso: [{ value: this.solicitud?.fkMdTipoRecurso, disabled: true }, [Validators.required]],
        IdsAsignaciones: this.fb.array(controlsAsignacionesAlTalento, this.minSelectedCheckboxes(1)),
        IdsAsignacionesAdicionales: this.fb.array(controlsAsignacionesAdicionalesAlTalento, this.minSelectedCheckboxes(1)),
        fkMdTipoTrabajador: [{ value: this.solicitud?.fkMdTipoTrabajador, disabled: true }, [Validators.required]],
        fkMdTipoContrato: [{ value: this.solicitud?.fkMdTipoContrato, disabled: true }, [Validators.required]],
        fkMdSueldoAnuales: [{ value: this.solicitud?.fkMdSueldoAnuales, disabled: true }, [Validators.required]],
        /*IdsAsignaciones: [{ disabled: true }, []],
        IdsAsignacionesAdicionales: [{ disabled: true }, []],
        */
        stNombreCliente: [{ value: this.solicitud?.stNombreCliente, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        stNombreServicio: [{ value: this.solicitud?.stNombreServicio, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        TiempoContrato: [{ value: this.solicitud?.tiempoContrato, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        stSustentoTiempoContrato: [{ value: this.solicitud?.stSustentoTiempoContrato, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        fxFechaTentativaIncorporacion: [{ value: this.solicitud?.fxFechaTentativaIncorporacion, disabled: true }, [Validators.required]],
        stReemplazado: [{ value: this.solicitud?.stReemplazado, disabled: true }, []],
        stAIP: [{ value: this.solicitud?.stAIP, disabled: false }, []],
        fkProyecto: [{ value: this.solicitud?.fkProyecto, disabled: true }, [Validators.required]],
        fkMdPerfilContratacion: [{ value: this.solicitud?.fkMdPerfilContratacion, disabled: true }, [Validators.required]],
        fkMdPerfilFuncion: [{ value: this.solicitud?.fkMdPerfilFuncion, disabled: true }, [Validators.required]],
        fkMdPerfilValido: [{ value: this.solicitud?.fkMdPerfilValido, disabled: true }, [Validators.required]],
        fkAgencia: [{ value: this.solicitud?.fkAgencia, disabled: true }, [Validators.required]],
        fxInicioLabor: [{ value: this.solicitud?.fxInicioLabor, disabled: true }, [Validators.required]],
        fxFinLabor: [{ value: this.solicitud?.fxFinLabor, disabled: true }, [Validators.required]],
        fkMdLineaContable: [{ value: this.solicitud?.fkMdLineaContable, disabled: true }, [Validators.required]],
        fkMdArqueTipo: [{ value: this.solicitud?.fkMdArqueTipo, disabled: true }, [Validators.required]],
        blSenior: [{ value: this.solicitud?.blSenior || false, disabled: true }, []],
        stLider: [{ value: this.solicitud?.stLider, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        //stLiderUsuario: [{ value: this.solicitud?.stLiderUsuario, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        stOtros: [{ value: this.solicitud?.stOtros, disabled: true }, [Validators.maxLength(50)]],
        flPresupuestoMensual: [{ value: this.solicitud?.flPresupuestoMensual, disabled: true }, [Validators.required]],
        stDescripcionDetallada: [{ value: this.solicitud?.stDescripcionDetallada, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
        idHorario: [{ value: this.solicitud?.idHorario, disabled: true }, [Validators.required]],
        rutaArchivo: [, []],
        listaComentario: [],

      });
      this.formulario.patchValue({
        myControlSolicitante: {
          NombreCompleto: this.solicitud?.stUsuarioRegistro,
          Id: this.solicitud?.fkUsuarioRegistro
        }
      });
      this.myControlSolicitante.disable();
      this.isConfirmarDisponibilidad = this.solicitud?.isConfirmarDisponibilidad;
      this.isSolicitarRqAccesos = this.solicitud?.isSolicitarRqAccesos;
      this.isVisibleRegistrarRq = this.solicitud?.isVisibleRegistrarRq;
      this.isVisibleRegistrarOc = this.solicitud?.isVisibleRegistrarOc;
      this.isPermiteAgregarEliminarAdj = this.solicitud?.isPermiteAgregarEliminarAdj;

      this.isVisibleRangoDisponibilidad = this.solicitud?.isVisibleRangoDisponibilidad;

      if (this.isVisibleRangoDisponibilidad) {

        this.contratoService.getMaestroDetalle(19).subscribe((res: any) => { this.clinicas = res;  });
     }
      this.isVisibleRq = this.solicitud?.isVisibleRq;
      this.isVisibleOc = this.solicitud?.isVisibleOc;
      //this.provs = this.solicitud?.solicitudProveedor;

      this.contratoService.getMaestroDetalleRecursivo(this.solicitud?.fkMdPerfilContratacion || 0)
        .subscribe((res: any) => {
          this.funcion = res;
          this.formulario.value.fkMdPerfilFuncion = this.solicitud?.fkMdPerfilFuncion;

        });
      //this.formulario.value.fkMdPerfilValido = this.solicitud?.fkMdPerfilValido;
      this.contratoService.listarSolicitudComentario(this.solicitud?.idSolicitud).subscribe((res: any) => { this.dsSolicitudComentario = res; });


      this.isSolicitarAprobVisible = this.solicitud?.isSolicitarAprobVisible;
      // this.isGuardarVisible=this.isSolicitarAprobVisible;
      this.isGuardarVisible = false;
      this.isAprobRechazoVisible = this.solicitud?.isAprobRechazoVisible;

      this.MostrarProveedorInvolucrado = (!this.solicitud?.isSolicitarAprobVisible) && !this.IsProveedor;

      //this.MostrarProveedorInvolucrado=true;
      this.isDisabledProvInvolucrado = false;
      /*    if (IsVisiblePermiteEditarSolicitud==false)
          this.isDisabledProvInvolucrado = (!this.isAprobRechazoVisible) || this.solicitud?.fkMdTipoRecurso == 102;
    */
      this.contratoService.getProveedores().subscribe((res: any) => { this.allProvs = res; });
      this.contratoService.getLog("TmSolicitud", this.solicitud?.idSolicitud).subscribe((res: any) => { this.dsLogAccion = res; });

      if (IsVisiblePermiteEditarSolicitud)

        this.isActualizacionVisible = true;
      else this.isActualizacionVisible = false;

    } else {
      this.myControlSolicitante.valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(500),
        //filter((name) => name.length > 2),
        tap(() => {
          // this.errorMsg = "";
          this.filteredOptionsSolicitante = [];
          this.isLoading = true;
        }),
        switchMap(value => this.usuarioService.obtenerUsuarios().finally(() => {
          this.isLoading = false
        })
        )
      ).subscribe(data => {
        this.filteredOptionsSolicitante = data;

      });

      this.isActualizacionVisible = false;
      this.formulario = this.fb.group({
        FkUsuarioRegistro: [, []],
        stUsuarioRegistro: [, []],
        myControlSolicitante: this.myControlSolicitante,
        fxRegistro: [{ value: new Date(), disabled: true }, [Validators.required]],
        fkMdTipoTrabajador: [, [Validators.required]],
        fkMdTipoContrato: [, [Validators.required]],
        fkMdSueldoAnuales: [, [Validators.required]],
        IdsAsignaciones: this.fb.array([], [Validators.required]),
        IdsAsignacionesAdicionales: this.fb.array([], [Validators.required]),
        stNombreCliente: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        stNombreServicio: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        TiempoContrato: [, [Validators.required]],
        stSustentoTiempoContrato: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        fxFechaTentativaIncorporacion: [, [Validators.required]],
        blEnviarAprobacion: [],
        fkMdTipoRecurso: [{ value: 100, disabled: false }, [Validators.required]],
        stReemplazado: [],
        stAIP: [],
        fkProyecto: [, [Validators.required]],
        fkMdPerfilContratacion: [, [Validators.required]],
        fkMdPerfilFuncion: [, [Validators.required]],
        fkMdPerfilValido: [, [Validators.required]],
        fkAgencia: [, [Validators.required]],
        fxInicioLabor: [[Validators.required]],
        fxFinLabor: [, [Validators.required]],
        fkMdLineaContable: [, [Validators.required]],
        fkMdArqueTipo: [, [Validators.required]],
        //fkParticipacion: [, [Validators.required]],
        // StVbOutsourcing: [, [Validators.required]],
        blSenior: [false, []],
        stLider: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        //stLiderUsuario: [, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        stOtros: [, [Validators.required, Validators.maxLength(50)]],
        flPresupuestoMensual: [, [Validators.required]],
        stDescripcionDetallada: [, [Validators.required, Validators.minLength(3), Validators.maxLength(1000)]],
        // horaInicio: [{ value: "08:30" , disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        // horaFin: [{ value: "18:30" , disabled: false }, [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        // diasLaborables: [{ value: this.diasSemanaDefault , disabled: false }, [Validators.required]],
        idHorario: [, [Validators.required]],
        rutaArchivo: [, []]
      });

      this.formulario.patchValue({
        myControlSolicitante: {
          NombreCompleto: localStorage.getItem('NombreCompleto'),
          Id: localStorage.getItem('Id')
        }
      });

    }
    this.filteredPostulantes = this.controlPostulante.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filterPost(name) : this.allPostulantes.slice())),
    );
  }


  minSelectedCheckboxes(min = 1) {

    const validator: ValidatorFn = (formArray: AbstractControl) => {

      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }
  setCheboxes(listCargados: any, listSeleccionado: String, controls: any) {
    let arraSeleccionado: any[] = listSeleccionado.split(",");
    for (let index = 0; index < arraSeleccionado.length; index++) {
      for (let index1 = 0; index1 < listCargados.length; index1++) {
        if (parseInt(arraSeleccionado[index]) == listCargados[index1].inCodigo) {
          listCargados[index1].completed = true;
          controls[index1].setValue(true);
        }
      }
    }
  }
  //https://gist.github.com/Kaidanov/678d200d0425402c92c164fcd00192ec
  updateChkbxArray(chk, isChecked, key) {

    const chkArray = <FormArray>this.formulario.get(key);
    if (isChecked) {
      //sometimes inserts values already included creating double records for the same values -hence the defence
      if (chkArray.controls.findIndex(x => x.value == chk.inCodigo) == -1)
        chkArray.push(new FormControl({ inCodigo: chk.inCodigo, description: chk.stNombre }));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == chk.inCodigo);
      chkArray.removeAt(idx);
    }
  }

  displayFn(user: trProveedorPostulante): string {
    return user && user.stNombre ? user.stNombre : '';
  }
  private _filterPost(name: string): trProveedorPostulante[] {
    const filterValue = name.toLowerCase();
    return this.allPostulantes.filter(option => option.stNombre?.toLowerCase().includes(filterValue));
  }

  cargarPostulantes() {
    this.contratoService.getPostulantesGanadores().subscribe((res: any) => {
      this.allPostulantes = res;
    });
  }
  onTipoRecursoChange(tr: { value: any; }) {
    const tipoAmpliacion = 102;
    const tipoReemplazo = 101;
    this.isVisibleReemplazado = tr.value == tipoReemplazo;
    this.isVisiblePostulante = tr.value == tipoAmpliacion;

    if (this.isVisiblePostulante)
      if (this.allPostulantes.length == 0) this.cargarPostulantes();

    if (this.isVisibleReemplazado) {
      this.formulario.controls['stReemplazado'].setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
    } else {
      this.formulario.controls['stReemplazado'].setValidators([]);
    }
  }
  onProyectoChange(pro: { value: any; }) {
    let proyectoSelect = this.proyecto.find(a => a.idProyecto == pro.value);
    this.formulario.controls['stLider'].setValue(proyectoSelect?.stPersonaLider);

  }
  onRolChange(rl: { value: any; }) {
    this.contratoService.getMaestroDetalleRecursivo(rl.value).subscribe((res: any) => { this.funcion = res; });

  }
  onFuncionChange(pf: { value: any; }) {
    this.contratoService.getMestroDetallexId(pf.value).subscribe((res: MaestroDetalle) => {
      this.formulario.controls['stDescripcionDetallada'].setValue(res.stDescripcion);
    });
  }


  onSelect(event: any) {


    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `Este archivo será visualizado por el proveedor?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: boolean) => {
        if (event.addedFiles.length > 10) {
          this.bootstrapNotifyBarService.notifyWarning("No se pueden agregar más de 10 archivos a la vez");
        } else {
          for (const file of event.addedFiles) {
            if (this.isFileSizeAllowed(file.size)) {
              if (this.files.length < 10) {
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
                if (this.solicitud) {
                  const blob = new Blob([file], { type: file.type });
                  const response = await this.azureService.uploadFile(blob, file.name);
                  adj.stNombreArchivoRuta = response.uuidFileName;
                  adj.IdRegistro = this.solicitud.idSolicitud,
                    this.assetService.postTmAdjunto(adj)
                      .subscribe((res: any) => {
                        adj.idAdjunto = res.idAdjunto;
                        this.dsAdjunto.push(adj);
                        this.table?.renderRows();
                      })

                } else
                  this.dsAdjunto.push(adj);

                this.uploadFilesSimulator(0);
              } else {
                this.bootstrapNotifyBarService.notifyWarning("Se permiten un máximo de 10 archivos.");
              }
            } else {
              this.bootstrapNotifyBarService.notifyWarning("El tamaño máximo de un archivo permitido es de 2 mb, los archivos con un tamaño superior a 2 mb se descartan.");
            }
          }



        }
      });

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
      if (index === this.dsAdjunto.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {

          if (this.dsAdjunto[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {

            this.dsAdjunto[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  /*
    onFileSelected(event: any, nombrePropiedad: string) {

      //const blMarca = confirm("Este archivo será visualizado por el proveedor?")
      this.dialogo.open(DialogoConfirmacionComponent, {
        maxWidth: '25vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '25%',
        disableClose: true,
        data: {
          titulo: `Mensaje de Confirmación`,
          mensaje: `Este archivo será visualizado por el proveedor?`
        }
      })
        .afterClosed()
        .subscribe(async (confirmado: boolean) => {
          const file = event.target.files[0];
          if (file) {
            const formData = new FormData;
            formData.append('file', file);
            this.assetService.subirArchivo(formData)
              .subscribe((res: any) => {


                let adj: TmAdjunto = {
                  stUsuarioRegistro: localStorage.getItem("NombreCompleto") || "",
                  fxRegistro: new Date(),
                  stNombreArchivo: file.name,
                  stNombreArchivoRuta: res.ruta,
                  stVerProveedor: confirmado ? "SI" : "NO",
                  blMarca: confirmado
                }

                if (this.solicitud) {
                  adj.IdRegistro = this.solicitud.idSolicitud,
                    this.assetService.postTmAdjunto(adj)
                      .subscribe((res: any) => {
                        adj.idAdjunto = res.idAdjunto;
                        this.dsAdjunto.push(adj);
                        this.table?.renderRows();
                      })
                } else {
                  //this.dsAdjunto.push({ stUsuarioRegistro: localStorage.getItem("NombreCompleto") || "", fxRegistro: new Date(), stNombreArchivo: file.name, stNombreArchivoRuta: res.ruta, stVerProveedor: confirmado ? "SI" : "NO", blMarca: confirmado });
                  //this.table?.renderRows();
                }



              })
          }
        });

    }*/
  async guardar() {

    if (this.isVisiblePostulante) {
      if (this.controlPostulante.value) {
        this.formulario.value.idPostulanteGanador = this.controlPostulante.value.idPostulante
      } else {
        this.bootstrapNotifyBarService.notifyWarning('Para el tipo AMPLIACIÓN es obligatorio seleccionar el Postulante');
        //alert("Para el tipo AMPLIACIÓN es obligatorio seleccionar el Postulante");
        this.formulario.markAllAsTouched();
        return;
      }
    }
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if (this.formulario.value.diasLaborables) {
      this.formulario.value.diasLaborables = this.formulario.value.diasLaborables.join(',');
    }
    else
      this.formulario.value.diasLaborables = null;

    if (this.formulario.value.IdsAsignaciones !== null) {
      this.formulario.value.IdsAsignaciones = this.formulario.value.IdsAsignaciones.length > 0 ? this.formulario.value.IdsAsignaciones.map(x => { return x.inCodigo }).join(",") : "";
    }
    if (this.formulario.value.IdsAsignacionesAdicionales !== null) {
      this.formulario.value.IdsAsignacionesAdicionales = this.formulario.value.IdsAsignacionesAdicionales.length > 0 ? this.formulario.value.IdsAsignacionesAdicionales.map(x => { return x.inCodigo }).join(",") : "";
    }
    if (this.formulario.value.myControlSolicitante !== null) {
      this.formulario.value.FkUsuarioRegistro = parseInt(this.formulario.value.myControlSolicitante.Id);
      this.formulario.value.stUsuarioRegistro = this.formulario.value.myControlSolicitante.NombreCompleto;
    }
    if (!this.solicitud)
      this.formulario.value.blEnviarAprobacion = true;

    //var listArchivoBlobStorage: any = [];
    if (!this.solicitud) {
      if (this.dsAdjunto.length > 0) {
        for await (const item of this.dsAdjunto) {
          const blob = new Blob([item.file], { type: item.file.type });
          const response = await this.azureService.uploadFile(blob, item.file.name);
          item.stNombreArchivoRuta = response.uuidFileName;
        }
      }
    }


    //this.formulario.value.listAdjuntos = listArchivoBlobStorage;
    this.formulario.value.listAdjuntos = this.dsAdjunto;
    this.onGuardar.emit(this.formulario.value);
  }
  confirmarDisponibilidad() {
    this.dialog.open(ModalSoloFecha, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: this.solicitud!.idSolicitud
    });
  }
  solicitarExamenMedicoOcupacional() {
    //this.stepService.NextTab(2);
    if(this.fxInicioDisponibilidad.value==null){
      this.bootstrapNotifyBarService.notifyDanger('Fecha Inicio Disponibilidad es obligatorio');
      return;
    }
    if(this.fxFinDisponibilidad.value==null){
      this.bootstrapNotifyBarService.notifyDanger('Fecha fin Disponibilidad es obligatorio');
      return;
    }
    if(this.fkClinicaEMO.value==null){
      this.bootstrapNotifyBarService.notifyDanger('Clinica EMO es obligatorio');
      return;
    }
    if(this.fxSolicitudEMO.value==null){
      this.bootstrapNotifyBarService.notifyDanger('Fecha cita EMO es obligatorio');
      return;
    }
    if(this.horaSolicitudEMO.value==null){
      this.bootstrapNotifyBarService.notifyDanger('Hora cita es obligatorio');
      return;
    }

    this.formulario = this.fb.group({
      IdSolicitud: this.solicitud?.idSolicitud,
      fkMdClinicaEMO: this.fkClinicaEMO.value,
      fxCitaClinicaEMO: this.fxSolicitudEMO.value,
      HoraCitaClinicaEMO: this.horaSolicitudEMO.value,
    });

    this.contratoService.solicitarExamenMedicoOcupacional(this.formulario.value).subscribe(data => {
      this.bootstrapNotifyBarService.notifySuccess('Solicitud enviada correctamente');
      this.router.navigate(['/contrato', 'reg'])
    });
  }
  solicitarRqAccesos() {
    if (!this.fxInicioDisponibilidad.value || !this.fxFinDisponibilidad.value) {
      alert("Ingrese el rango de disponibilidad");
    } else {
      const stAIP: string = this.formulario.controls['stAIP'].value;
      this.formulario = this.fb.group({
        IdSolicitud: this.solicitud?.idSolicitud,
        fxInicioConfirmada: this.fxInicioDisponibilidad.value,
        fxFinConfirmada: this.fxFinDisponibilidad.value,
        stAIP: stAIP
      });
      this.contratoService.postSolicitarRqAccesos(this.formulario.value).subscribe(data => {
        this.bootstrapNotifyBarService.notifySuccess('Solicitud enviada correctamente');
        this.router.navigate(['/contrato', 'reg'])
      });
    }
  }
  registrarRqAccesos() {
    if (this.stCodigoRq.value) {
      this.contratoService.getRegistrarRq(this.solicitud!.idSolicitud, this.stCodigoRq.value)
        .subscribe(data => {
          this.bootstrapNotifyBarService.notifySuccess('Número de Rq registrado correctamente');
          //this.snackBar.open('Número de Rq registrado correctamente', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.router.navigate(['/contrato', 'reg'])
        });
    } else {
      alert("Ingrese el número de Rq");
    }
  }
  registrarOc() {
    if (this.stCodigoOc.value) {
      this.contratoService.getRegistrarOc(this.solicitud!.idSolicitud, this.stCodigoOc.value)
        .subscribe(data => {
          this.bootstrapNotifyBarService.notifySuccess('Número de oc registrado correctamente');
          //this.snackBar.open('Número de oc registrado correctamente', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.router.navigate(['/contrato', 'reg'])
        });
    } else {
      alert("Ingrese el número de orden de compra");
    }
  }
  SolicitarAprobacion() {
    this.contratoService.SolicitarAprobacion(this.solicitud!.idSolicitud)
      .subscribe(data => {
        this.bootstrapNotifyBarService.notifySuccess('Solicitud enviada para su aprobación');
        //this.snackBar.open('Solicitud enviada para su aprobación', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['/contrato', 'reg'])
      });
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
  /*
    add(event: MatChipInputEvent): void {
      const value = this.allProvs.find(p => p.idProveedor = parseInt(event.value));
      if (value) {
        this.provs.push(value);
      }

      // Clear the input value
      event.chipInput!.clear();
      this.provCtrl.setValue(null);
    }

    remove(prov: tmProveedor): void {
      const index = this.provs.indexOf(prov);
      if (index >= 0) this.provs.splice(index, 1);
    }*/

  /*
  selected(event: MatAutocompleteSelectedEvent): void {
    const value = this.allProvs.find(p => p.idProveedor == parseInt(event.option.value));
    if (value) this.provs.push(value);
    if (this.provInput != undefined) this.provInput.nativeElement.value = '';
    this.provCtrl.setValue(null);
  }
  */
  private _filter(value: string): tmProveedor[] {
    if (this.isNumber(value)) {
      return this.allProvs.filter(p => p.idProveedor == parseInt(value));
    } else {
      const filterValue = value.toLowerCase();
      return this.allProvs.filter(p => p.stNombre.toLowerCase().includes(filterValue));
    }
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
  openPopupnewpuestoperfil() {
    this.dialog.open(DialogNewperfilpuestoComponent, {
      maxWidth: '150vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '30%',
      disableClose: true,
      data: {
        titulo: `Solicitud de Perfil`,
      }
     })
  }
  closePopup() {
    //this.solicitud?
    // this.displayStyle = "none";
    var modalComentarios = (document.getElementById("modalComentarios")) as HTMLFormElement;
    modalComentarios.style.display = "none";
  }
  guardarComentario() {
    var btnGuardarComentario = (document.getElementById("btnGuardarComentario")) as HTMLInputElement;
    btnGuardarComentario.disabled = true;

    var stComentario = (document.getElementById("stComentario")) as HTMLInputElement;
    //HTMLSelectElement
    this.formulario = this.fb.group({
      Comentario: stComentario.value,
      IdSolicitud: this.solicitud?.idSolicitud
      // ,
      // listaCorreo: this.listaCorreo.value

      // if (this.formulario.value.StVbOutsourcing) {
      //   this.formulario.value.StVbOutsourcing = this.formulario.value.StVbOutsourcing.join(',');
      // }
      // else
      //   this.formulario.value.StVbOutsourcing = null;

    });

    //subscribe((res: any) => { this.dsLogAccion = res; });
    this.contratoService.crearComentarioSolicitud(this.formulario.value).subscribe(data => {
      //this.snackBar.open('Comentario agregado correctamente', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
      this.bootstrapNotifyBarService.notifySuccess('Comentario agregado correctamente');
      btnGuardarComentario.disabled = false;
      this.closePopup();
      window.location.reload();
    });
  }

  actualizarSolicitud() {


    var btnActualizarSolicitud = (document.getElementById("btnActualizarSolicitud")) as HTMLInputElement;
    btnActualizarSolicitud.disabled = true;

    var cmbEstado = (document.getElementById("cmbEstado")) as HTMLSelectElement;
    var cmbEstadovalue = cmbEstado.options[cmbEstado.selectedIndex].value;
    var cmbEstadotext = cmbEstado.options[cmbEstado.selectedIndex].text;

    var cmbSubEstado = (document.getElementById("cmbSubEstado")) as HTMLSelectElement;
    // var cmbSubEstadovalue = cmbSubEstado.options[cmbSubEstado.selectedIndex].value;
    // var cmbSubEstadotext = cmbSubEstado.options[cmbSubEstado.selectedIndex].text;

    var stAIP = this.formulario.controls['stAIP'].value;


    var fkMdArqueTipo = this.formulario.controls['fkMdArqueTipo'].value;
    var fkParticipacion = this.formulario.controls['fkParticipacion'].value;
    var fkMdTipoRecurso = this.formulario.controls['fkMdTipoRecurso'].value;

    var fxInicioLabor = this.formulario.controls['fxInicioLabor'].value;
    var fxFinLabor = this.formulario.controls['fxFinLabor'].value;
    var flPresupuestoMensual = this.formulario.controls['flPresupuestoMensual'].value;
    var stLider = this.formulario.controls['stLider'].value;
    //var stLiderUsuario = this.formulario.controls['stLiderUsuario'].value;
    var stOtros = this.formulario.controls['stOtros'].value;
    var stDescripcionDetallada = this.formulario.controls['stDescripcionDetallada'].value;

    var fkAgencia = this.formulario.controls['fkAgencia'].value;
    //var provsInvolucrados =  this.formulario.controls['provsInvolucrados'].value;
    var StVbOutsourcing = this.formulario.controls['StVbOutsourcing'].value[0].toString();

    var fkMdPerfilContratacion = this.formulario.controls['fkMdPerfilContratacion'].value;
    //var blSenior = this.formulario.controls['blSenior'].value;
    var fkMdPerfilFuncion = this.formulario.controls['fkMdPerfilFuncion'].value;
    var fkMdPerfilValido = this.formulario.controls['fkMdPerfilValido'].value;

    var fkMdLineaContable = this.formulario.controls['fkMdLineaContable'].value;
    var fkProyecto = this.formulario.controls['fkProyecto'].value;

    var stCodigoRq = this.stCodigoRq.value;
    var stCodigoOc = this.stCodigoOc.value;

    //var listProveedor: tmProveedor[] = this.provs;

    /*    //var controlPostulante= this.controlPostulante.value
       //this.fxInicioDisponibilidad.value || !this.fxFinDisponibilidad.value
      // this.stCodigoRq = new FormControl(this.solicitud?.fxFinLabor);
   */

    var fomrDataSent: reqActualizarSolicitud = {
      IdSolicitud: this.solicitud?.idSolicitud,
      // FkMdEstadoContratacion: parseInt(cmbEstadovalue),
      // fkMdSubEstadoContratacion: parseInt(cmbSubEstadovalue),

      stAIP: stAIP,
      StOtros: stOtros,

      FkMdArqueTipo: fkMdArqueTipo,
      fkParticipacion: fkParticipacion,

      FkMdTipoRecurso: fkMdTipoRecurso,
      FxInicioLabor: fxInicioLabor,
      FxFinLabor: fxFinLabor,
      FlPresupuestoMensual: flPresupuestoMensual,
      StLider: stLider,
      //StLiderUsuario: stLiderUsuario,
      StDescripcionDetallada: stDescripcionDetallada,
      FkAgencia: fkAgencia,
      StVbOutsourcing: StVbOutsourcing,
      //BlSenior: blSenior,
      FkMdPerfilContratacion: fkMdPerfilContratacion,
      FkMdPerfilFuncion: fkMdPerfilFuncion,
      FkMdPerfilValido: fkMdPerfilValido,

      FkMdLineaContable: fkMdLineaContable,
      FkProyecto: fkProyecto,
      stCodigoRq: stCodigoRq,
      stCodigoOc: stCodigoOc,
      fxInicioConfirmada: this.fxInicioDisponibilidad.value,
      fxFinConfirmada: this.fxFinDisponibilidad.value,

      //listProveedor: this.provs
    }

    var suyupppp = "";

    /*
        this.formulario = this.fb.group({
          IdSolicitud: this.solicitud?.idSolicitud,
          FkMdEstadoContratacion: cmbEstadovalue,
          fkMdSubEstadoContratacion: cmbSubEstadovalue,
          stAIP:stAIP ,
          StOtros:stOtros,

          FkMdArqueTipo:fkMdArqueTipo,
          fkParticipacion:fkParticipacion,

          FkMdTipoRecurso:fkMdTipoRecurso,
          FxInicioLabor:fxInicioLabor,
          FxFinLabor:fxFinLabor,
          FlPresupuestoMensual:flPresupuestoMensual,
          StLider:stLider,
          StLiderUsuario: stLiderUsuario,
          StDescripcionDetallada: stDescripcionDetallada,
          fkAgencia: fkAgencia,
          StVbOutsourcing: StVbOutsourcing,
          blSenior: blSenior,
          fkMdPerfilContratacion:fkMdPerfilContratacion,
          fkMdPerfilFuncion: fkMdPerfilFuncion,
          fkMdPerfilValido: fkMdPerfilValido,

          fkMdLineaContable: fkMdLineaContable,
          fkProyecto: fkProyecto,
          stCodigoRq: stCodigoRq,
          stCodigoOc: stCodigoOc,
          fxInicioConfirmada: this.fxInicioDisponibilidad.value,
          fxFinConfirmada: this.fxFinDisponibilidad.value,

          listProveedor: this.provs

        });
        */

    var suyuijojokmo = "";
    this.contratoService.actualizarSolicitud_cont(fomrDataSent).subscribe(data => {
      this.bootstrapNotifyBarService.notifySuccess('Solicitud actualizada correctamente');
      //this.snackBar.open('solicitud actualizada correctamente', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
      btnActualizarSolicitud.disabled = false;
      window.location.reload();
    });
  }
}


@Component({
  selector: 'Rechazar-contra',
  templateUrl: 'Dialog-Rechazar-contra.component.html',
})
export class DialogRechazarContraComponent {
  constructor(
    public dialogRef: MatDialogRef<FormContraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
