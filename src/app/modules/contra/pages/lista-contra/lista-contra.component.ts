import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ContraService } from '../../services/contra.service';
import { Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-lista-libros',
  templateUrl: './lista-contra.component.html'  
})
export class ListaLibrosComponent implements OnInit {
  isLoading = false;
  matexpansionpanelfiltro: boolean = false;
  IsProveedor = false;
  columnas = ['menu', 'StCodigo', 'stTipoRecurso', 'stEstado', 'stUsuarioRegistro', 'fxInicioLabor', 'stPerfil', 'FxRegistro'];
  SolicitudPage: ListarSolicitudResponse;
  tipoContrato: MaestroDetalle[] = [];
  proyecto: tmProyecto[] = [];
  estado: MaestroDetalle[] = [];
  formulario!: FormGroup;
  constructor(
    private contratoService: ContraService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public as: AuthService,
  ) {
    this.IsProveedor = this.as.isProveedor();
  }

  ngOnInit(): void {
    this.contratoService.getMaestroDetalle(1).subscribe((res: any) => { this.tipoContrato = res; });
    this.contratoService.getMaestroDetalle(9).subscribe((res: any) => { this.estado = res; });
    this.contratoService.getProyectos().subscribe((res: any) => {

      this.proyecto = res;
    });

    this.formulario = this.fb.group({
      fkMdTipoRecurso: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });
    this.Buscar();
  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.Buscar(pageIndex, pageSize);
  }

  AnularSolicitud(record: ListarSolicitudDto) {
    const ok = confirm('¿Está seguro de anular esta solicitud?');
    if (ok) {
      this.contratoService.Anular(record.idSolicitud)
        .subscribe(() => {
          this.snackBar.open('Solicitud anulada', 'Ok', { duration: 3 * 1000, horizontalPosition: 'center', verticalPosition: 'top' });
          this.Buscar();
        });
    }
  }
  editarSolicitud(record: ListarSolicitudDto) {
    this.router.navigate(['/contrato', 'reg', record.idSolicitud,'editar']);
  }
  Buscar(page: number = 1, size: number = 10) {
    this.isLoading = true;
    this.contratoService.getSolicitudes(this.formulario.value, page, size)
      .subscribe(data => {
        this.isLoading = false;
        this.SolicitudPage = data;
        //this.SolicitudPage.records = null;
      }, error => this.isLoading = false);
  }
  Limpiar() {
    this.ngOnInit();
  }
}
