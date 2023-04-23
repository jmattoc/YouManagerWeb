import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
//import { ContraService } from '../../services/contra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListarSolicitudDto, ListarSolicitudResponse } from '@core/models/TmSolicitud.interface';
import{ListarbandejaperfilResponse, ListarbandejaperfilDto, ListarbandejacategoriaResponse
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
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { DialogEditperfilpuestoComponent } from '@shared/components/dialog-editperfilpuesto/dialog-editperfilpuesto.component';
import { adminservice } from '../../services/admin.service';

interface Foodestado {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-newcrgos',
  templateUrl: './newcargos.component.html',
  styleUrls: []
})
export class NewcargosComponent implements OnInit{
  matexpansionpanelnewcategoria: boolean = false;
  formularionewcategoria!: FormGroup;
  estadoactivo: number =3970;
  codsolicitud: string;
  isLoading = false;
  stmaneestado = new FormControl('');
  stamanewcategoria = new FormControl('');
  stamanewcargo = new FormControl('');
  public showregiscateg: boolean = true;
  /*ngmodel */
  public estadoint: number;
  public newcategoriatxt: string;
  public newcargotxt: string;

  /* variables id de control combos*/
 private idestdo:number;

 /*Listar de servicio */
 //public lstEstadoCel: any = [];
 public lstEstadonewcatgoria: any = [];
 public lstEstados: any [];

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
) { }

  ngOnInit(): void {

    this.formularionewcategoria = this.fb.group({
      stmaneestado: this.stmaneestado,
      stamanewcategoria: this.stamanewcategoria,
      stamanewcargo: this.stamanewcargo,
      fkMdEstado: [],
      stCodigo: [],
      fkMdEstadoContratacion: [],
      fkProyecto: [],
      fxInicio: [],
      fxFin: [],
    });
    this.listarestados();
  }
  listarestados(id=31){
    this.adminservice.getlistarestadocategoria(id).subscribe((res: any) => {
      this.lstEstados = res;
     // console.log('Estdo-categoria', this.lstEstados);
    });
  }


  async guardarcargos(){
    if (this.formularionewcategoria.invalid) {
      this.formularionewcategoria.markAllAsTouched();
      return;
    }
   /* var data = {
      fkMaestro:2,
      stNombre:this.newcategoriatxt
    }*/

  }
  chaneestadocargo(e: any){
    this.idestdo = e.value;
   // console.log('id-estado', e.value);
  }

}
