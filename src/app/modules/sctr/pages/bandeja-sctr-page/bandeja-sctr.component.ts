import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioService } from '../../services/sctr.service';
import { Router } from '@angular/router';
import { ListarUsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-bandeja-sctr',
  templateUrl: './bandeja-sctr.component.html'
})
export class BandejaSCTRComponent implements OnInit {
  isLoading = false;  
  columnas = ['menu', 'Codigo', 'Login', 'NombreCompleto', 'Correo', 'FechaRegistro', 'Estado'];
  listarUsuarioDto: ListarUsuarioDto[] = [];
  constructor(
    public dialogo: MatDialog,
    private usuarioService: UsuarioService,
    private router: Router,
    public dialog: MatDialog,
    private bootstrapNotifyBarService: BootstrapNotifyBarService
  ) {
  }
  ngOnInit() {
   this.listar();
  }
  listar(){
    this.usuarioService.listarUsuario().subscribe((data: ListarUsuarioDto[]) => {
      this.listarUsuarioDto = data;      
      this.isLoading = false;
    });
  }
  Eliminar(id:number){
    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `¿Está seguro que desea eliminar?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        
        if (confirmado) {
          this.usuarioService.eliminarUsuario(id).subscribe((res:any) => {
            if(res.tipoResultado==1){
              this.bootstrapNotifyBarService.notifySuccess(res.mensaje);
              this.listar();
            }else{
              this.bootstrapNotifyBarService.notifyWarning(res.mensaje);
            }     
          });          
        }
      });
  }
  
  Buscar() {

  }
  Limpiar() {

  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
 }
}