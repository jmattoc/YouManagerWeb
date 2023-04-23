import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { OpcionService } from '../../../services/opcion.service';
import { FormGroup,FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-bandeja-usuario',
  templateUrl: './bandeja-usuario.component.html'
})
export class BandejaUsuarioComponent implements OnInit {
  isLoading = false;
  columnas = ['menu', 'Codigo', 'Login', 'NombreCompleto', 'Correo', 'FechaRegistro', 'Estado'];
  listarDto: any[] = [];
  formulario!: FormGroup;
  Nuevo:boolean=false;
  btnEliminar:boolean=false;
  ActivarDesactivar:boolean=false;
  Editar:boolean=false;
  constructor(
    public dialogo: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private opcionService: OpcionService,
    private fb: FormBuilder,
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
      this.btnEliminar= false;
    });
   this.listar();
  }
  listar(){    
    this.usuarioService.listarUsuarioxFiltro(this.formulario.value).subscribe((data: any[]) => {      
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
          this.usuarioService.eliminarUsuario(id).subscribe((res:any) => {
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
          this.usuarioService.activarDesactivarUsuario(id,!Activo).subscribe((res:any) => {
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
