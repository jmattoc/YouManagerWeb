import { Component, OnInit } from '@angular/core';
import { AplicacionService } from '../../../services/aplicacion.service';
import { OpcionService } from '../../../services/opcion.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder } from '@angular/forms';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";

@Component({
  selector: 'app-bandeja-aplicaciones',
  templateUrl: './bandeja-aplicacion.component.html'
})
export class BandejaAplicacionComponent implements OnInit {
  isLoading = false;  
  columnas = ['menu', 'Codigo', 'Nombre','Descripcion', 'Estado', 'CodigoAcceso'];
  listarDto: any[] = [];
  formulario!: FormGroup;
  Nuevo:boolean=false;
  Editar:boolean=false;
  constructor(
    public dialogo: MatDialog,
    private aplicacionesService: AplicacionService,
    private opcionService: OpcionService,
    public dialog: MatDialog,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }
  inicializaContaplicaciones(){
    this.formulario = this.fb.group({});      
  }
  ngOnInit() {
    this.inicializaContaplicaciones();
    console.log(this.router.url);
    this.opcionService.listarPermisosPorOpcionYm(this.router.url).subscribe((data: any[]) => {      
      console.log(data);
      this.Nuevo = data.includes("Nuevo");
      this.Editar= data.includes("Editar");
    });
    this.listar();
  }
    listar(){
    this.aplicacionesService.listarAplicacion().then((data: any[]) => {
      this.listarDto = data;      
      this.isLoading = false;
    });
  }
  Buscar() {
    this.listar();
  }
  Limpiar() {
      this.inicializaContaplicaciones();
  }
  onPaginateChange(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
 }

}
