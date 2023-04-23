import { recoservice } from './../services/reco.service';
import { Component, Inject, OnInit,Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { AuthService } from '@core/auth/auth.service';
import { ContraService } from '@modules/contra/services/contra.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';
import {equipocelularservice} from '@modules/equipocelular/services/equipocelular.service';
import { PageEvent } from '@angular/material/paginator';
import { ListarbandejanivelDetalleResponse } from '@core/models/reco.interface';

@Component({
  selector: 'app-bandejanivel',
  templateUrl: './bandejanivel.component.html',
  styleUrls: []
})
export class BandejanivelComponent implements OnInit {

  matexpansionpanelfiltro: boolean = false;
  isLoading = false;
  public fechainicio: string = '2022-09-20T00:00:00.342Z';
  public fechafin: Date = new Date();
  formulario!: FormGroup;
   datosBasicosFormGroup!: FormGroup;
   columnas = ['stmenu','stnivel','stnombrenivel','stestado','stresponsable','stcargonivel'];
  listarbandejanivel : ListarbandejanivelDetalleResponse;
  idnivel: number =0;
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
    private equipocelularservice: equipocelularservice,
    private recoservice: recoservice,
  ) { }

  ngOnInit(): void {

    this.formulario = this.fb.group({
      fkMdEstado: [],
      fxInicio: [],
      fxFin: [],
      stmanemultifiltros: [],
    });
    this.searchperfil(1,10);
  }

  searchperfil(page: number, size:number){
    if(!this.fechainicio || !this.fechafin){
      this.bootstrapNotifyBarService.notifyWarning('Seleccione la fecha de Inicio y Fin.');
    }else{
      var data ={
        page: page,
        size: size,
       /* estado: this.formulario.controls['fkMdEstado'].value == null ? '' : this.formulario.controls['fkMdEstado'].value,*/
        nombre:'',
        fechaInicio: this.fechainicio,
        fechaFin: this.fechafin,
      };
    //  console.log('data-paginado', data);
      this.recoservice.postpaginadonivel(data).subscribe((res: any) => {
        this.listarbandejanivel = res;
      //  console.log('tabla',this.listarbandejanivel);
        this.isLoading = false;
      }, error => this.isLoading = false);

    }
  }

  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

  desactivarnivel(id:any){
    var data = {
      id: this.idnivel= id,
    }
    //console.log('idnivel-Desactivar',data );
    this.recoservice.deletenivelUO(data).subscribe((res: any) => {
      res;
      // console.log('desactivar-Concepto',res );
       this.bootstrapNotifyBarService.notifyWarning('Nivel desactivado correctamente');
       this.searchperfil(1,10);
     });

  }
  activarnivel(id: any){
    var data = {
      id: this.idnivel= id,
    }
   // console.log('idNivel-activar',data );
    this.recoservice.postactivarnivelUO(data).subscribe((res: any) => {
      res;
     //  console.log('Activar-Nivel',res );
       this.bootstrapNotifyBarService.notifyWarning('Nivel activado correctamente');
       this.searchperfil(1,10);
     });

  }

}
