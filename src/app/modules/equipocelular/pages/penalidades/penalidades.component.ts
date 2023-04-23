import { Component, Inject, OnInit,Input, Self, Optional, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import { FormGroup, FormBuilder, Validators, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { ThemePalette } from '@angular/material/core';
import {equipocelularservice} from '@modules/equipocelular/services/equipocelular.service';
import { MatSelect } from '@angular/material/select';
import { Subject,ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { runInThisContext } from 'vm';
import { DialogoConfirmaregistrocelularComponent } from '@shared/components/dialogo-confirmaregistrocelular/dialogo-confirmaregistrocelular.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-penalidades',
  templateUrl: './penalidades.component.html',
  styleUrls: ['./penalidades.component.css']
})
export class PenalidadesComponent implements OnInit {
  columnas = [ 'StFecha', 'stAccion', 'stCipUsuario','stNombreUsuario', 'stAutorizador', 'stCeco','StProyectogerencia' ]

  columnas2 = [ 'StFecha', 'stAccion', 'stCipUsuario','stNombreUsuario', 'stAutorizador', 'stCeco','StProyectogerencia' ]
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
