import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { OpcionService } from '../../../services/opcion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";

@Component({
  selector: 'app-bandeja-roles',
  templateUrl: './bandeja-roles.component.html'
})
export class BandejaRolesComponent implements OnInit {
  isLoading = false;  
  columnas = ['menu', 'Codigo', 'Nombre','Descripcion', 'FechaRegistro', 'Estado', 'Peso'];
  listarDto: any[] = [];
  formulario!: FormGroup;
  Nuevo:boolean=false;
  btnEliminar:boolean=false;
  ActivarDesactivar:boolean=false;
  Editar:boolean=false;
  constructor(
    public dialogo: MatDialog,
    private rolesService: RolesService,
    private opcionService: OpcionService,
    public dialog: MatDialog,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }
  inicializaControles(){
    this.formulario = this.fb.group({      
      nombre:[],
      idAplicacion : localStorage.getItem("App")
    });      
  }
  ngOnInit() {
    this.inicializaControles();
    this.opcionService.listarPermisosPorOpcionYm(this.router.url).subscribe((data: any[]) => {      
      this.Nuevo = data.includes("Nuevo");
      this.btnEliminar= data.includes("Eliminar");
      this.ActivarDesactivar= data.includes("Activar/Desactivar");
      this.Editar= data.includes("Editar");
    });
    this.listar();
  }
    listar(){
    this.rolesService.listarRoles(this.formulario.value).subscribe((data: any[]) => {                  
      this.listarDto = data;      
      this.isLoading = false;
    });
  }
  Eliminar(id:number){
    this.dialogo.open(DialogoConfirmacionComponent, {maxWidth: '25vw',maxHeight: 'auto',height: 'auto',width: '25%',
      disableClose: true,data: {titulo: `Mensaje de Confirmación`,mensaje: `¿Está seguro que desea eliminar?`}})
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        
        if (confirmado) {
          this.rolesService.eliminarRoles(id).subscribe((res:any) => {
            if(res.tipoResultado==1)
              this.bootstrapNotifyBarService.notifySuccess(res.mensaje);
            else
              this.bootstrapNotifyBarService.notifyWarning(res.mensaje);                          
            this.listar();    
          });          
        }
      });
  }
  voidActivarDesactivar(id:number,Activo : boolean){
    this.dialogo.open(DialogoConfirmacionComponent, {maxWidth: '25vw',maxHeight: 'auto',height: 'auto',width: '25%',
      disableClose: true,data: {titulo: `Mensaje de Confirmación`,mensaje: `¿Está seguro de realizar la acción?`}})
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {        
        if (confirmado) {
          this.rolesService.activarDesactivarRoles(id,!Activo).subscribe((res:any) => {
            if(res.tipoResultado==1)
              this.bootstrapNotifyBarService.notifySuccess(res.mensaje);
            else
              this.bootstrapNotifyBarService.notifyWarning(res.mensaje);                          
            this.listar();    
          });          
        }
      });

  }
  Buscar() {
    this.listar();
  }
  Limpiar() {
      this.inicializaControles();
  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
 }

}
