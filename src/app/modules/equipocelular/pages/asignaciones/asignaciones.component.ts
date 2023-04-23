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
import { DialogModalasignacionesComponent } from '@shared/components/dialog-modalasignaciones/dialog-modalasignaciones.component';
import { listarpersonalasignadoResponse } from '../../../../core/models/activos.interface';
import { DialogModaldevolucionesComponent } from '@shared/components/dialog-modaldevoluciones/dialog-modaldevoluciones.component';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.component.html',
  styleUrls: ['./asignaciones.component.css']
})
export class AsignacionesComponent implements OnInit {
   @Input() idactivo:string='';
   @Input() codigoActivo: string = '';
    idempleasignados: number = 0;
    estado:string;
   listarpersonal: listarpersonalasignadoResponse;
   showbtnasignar: boolean = true;
   showbtndevolver: boolean = false;
   columnas = [ 'stmenu','stnombre', 'stAccion', 'stfecharegistro' ]
   columnas2 = [ 'StFecha', 'stAccion', 'stCipUsuario','stNombreUsuario', 'stAutorizador', 'stCeco','StProyectogerencia' ]
  isLoading = false;
  datosvacios: number;

  constructor(
    private contratoService: ContraService,
    private equipocelularservice: equipocelularservice,
    private router: Router,
    public dialog: MatDialog,
    public dialogo: MatDialog,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    //private fb: FormBuilder,
    public as: AuthService,
    private activatedRoute: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    @Optional() @Self() public ngControl: NgControl
  ) { }

  ngOnInit(): void {
    //console.log('idrecibido', this.idactivo, this.codigoActivo);
    this.searchperfil(1,10);
    //console.log('ID-empleado', this.idempleasignados);
    this.datosdevuelvos();
  }

  OpenPoupasignar(){

      this.dialogo.open(DialogModalasignacionesComponent, {
        maxWidth: '250vw',
        maxHeight: 'auto',
        height: 'auto',
        width: '45%',
        disableClose: true,
        data: {
          titulo: `ASIGNAR`,
          idactivo:this.idactivo,
          idempleado:this.idempleasignados,


        }
      });

  }
  OpenPoupdevolver(){
    this.dialogo.open(DialogModaldevolucionesComponent, {
      maxWidth: '250vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '45%',
      disableClose: true,
      data: {
        titulo: `DEVOLVER`,
        idactivo:this.idactivo,
        codigoactivo:this.codigoActivo,
        idempleado:this.idempleasignados,

      }
    });

  }
  searchperfil(page: number, size:number){
      var data ={
        page: page,
        size: size,
        idActivo: this.idactivo,
               };
      this.equipocelularservice.postmovimientopaginado(data).subscribe((res: any) => {
        this.listarpersonal = res;
        this.datosvacios = res.data[''];
        this.idempleasignados = res.data[0].idempleado;
        this.estado= res.data[0].accion;
        //console.log('ID-empleado', this.idempleasignados);
        if(res.data.length == 0 || res.data['']){
          this.showbtndevolver =false;
        }else{
          this.showbtndevolver =true;
        }
       // console.log('asignados',this.listarpersonal);
        if(this.estado == 'Devolución' || this.estado == ''){
         // console.log('Accion2:',this.estado);
          this.showbtndevolver =false;
        }
        this.isLoading = false;
      }, error => this.isLoading = false);
  }

  datosdevuelvos(){

  }


  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.searchperfil(pageIndex, pageSize);
  }

}
