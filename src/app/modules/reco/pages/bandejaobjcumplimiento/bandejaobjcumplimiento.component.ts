import { Component, Inject, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';

@Component({
  selector: 'app-bandejaobjcumplimiento',
  templateUrl: './bandejaobjcumplimiento.component.html',
  styleUrls: []
})
export class BandejaobjcumplimientoComponent implements OnInit {
  public fechainicio: string = '2022-11-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  columnas = ['stnombre','stestado','FxRegistro'];
  codsolicitud: string;
  public lstEstadonewcatgoria: any = [];

  matexpansionpanelfiltro: boolean = false;
  public estadotxt: string;


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
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });


  }
  searchperfil(page: number, size:number){

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

}
