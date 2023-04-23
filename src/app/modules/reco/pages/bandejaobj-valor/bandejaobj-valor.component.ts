import { Component, Inject, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { ListarbandejaobjtivovalorResponse } from '@core/models/reco.interface';
import { DialogConfirmarperiodoComponent } from '@shared/components/dialog-confirmarperiodo/dialog-confirmarperiodo.component';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import { recoservice } from './../services/reco.service';
export interface DialogData {
  titulo: string;
  mensaje: string;
  id: number;
}

@Component({
  selector: 'app-bandejaobj-valor',
  templateUrl: './bandejaobj-valor.component.html',
  styleUrls: []
})
export class BandejaobjValorComponent implements OnInit {
  public fechainicio: string = '2022-11-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
  datosBasicosFormGroup!: FormGroup;
  columnas = ['stnombre','stestado',];
  codsolicitud: string;
  public lstEstadonewcatgoria: any = [];
  listarbandejaobjetivovalor:ListarbandejaobjtivovalorResponse;
  idperiodoactivado: number = 0;

  matexpansionpanelfiltro: boolean = false;
  public estadotxt: string;
  isLoading = false;

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
    private recoservice: recoservice,
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
    this.searchperfil3(1,10);
  }

  searchperfil(page: number, size:number){

  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }



  searchperfil3(page:1, size:10){
    var data = {
      page: page,
      size: size,
      activo: true,
    }
    this.recoservice.postpaginadoobjetivovalor(data).subscribe((res: any) => {
      this.listarbandejaobjetivovalor = res;
      this.idperiodoactivado = res.data[0].id;
     // console.log('id-periodo-bandeja',this.listarbandejaobjetivovalor);
      this.isLoading = false;
    },error => this.isLoading = false);

   }

   openmodalconfirmacion(){
    this.dialogo.open(DialogConfirmarperiodoComponent, {
      maxWidth: '250vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '40%',
      disableClose: true,
      data: {
        titulo: `Nuevo Objetivo`,
        id:this.idperiodoactivado,
        mensaje: '',
      }

    })
      .afterClosed()

  }

}
