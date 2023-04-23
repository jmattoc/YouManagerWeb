import { Component, EventEmitter, Input, OnInit, Output, Inject, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AzureService } from "@core/azure/azure.service";
import { TmAdjunto } from '@core/models/TmAdjunto-interface';
import { AssetService } from '@shared/services/asset.service';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { DialogPersonalComponent } from '@shared/components/dialogo-personal/dialogo-personal.component';

export interface UserData {
  id: string;
  nombre: string;
  apepaterno: string;
  apematerno: string;
  tipodocumento: string;
  nrodocumento: string;
}
const ELEMENT_DATA: UserData[] = [
  { id: "1", nombre: 'Hydrogen 1', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 1', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 2', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 3', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 4', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 5', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 6', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 7', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },
  { id: "1", nombre: 'Hydrogen 8', apepaterno: "lamas", apematerno: 'H', tipodocumento: "DNI", nrodocumento: "012536457" },

];

@Component({
  selector: 'app-form-sctr-page',
  templateUrl: './form-sctr-page.component.html',

})
export class FormSCTRComponent implements OnInit {
  dsAdjunto: TmAdjunto[] = [];
  mode = new FormControl('side');
  displayedColumns: string[] = ['id', 'nombre', 'apepaterno', 'apematerno', 'tipodocumento', 'nrodocumento'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  @Input() usuario: any;
  @Output() onGuardar: EventEmitter<UsuarioDto> = new EventEmitter();
  formulario: FormGroup;
  //Registro de Expresiones
  RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  requestUsuario: UsuarioDto = {
    id: undefined,
    login: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    listPerfiles: []
  };
  constructor(
    public dialogo: MatDialog,
    public router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private azureService: AzureService,
    private assetService: AssetService,
    private bootstrapNotifyBarService: BootstrapNotifyBarService,
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  guardar() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Registro de Usuario`,
        mensaje: `¿Está seguro que desea grabar?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {

        if (confirmado) {

          this.requestUsuario.id = this.formulario.value.id;
          this.requestUsuario.login = this.formulario.value.login;
          this.requestUsuario.nombre = this.formulario.value.nombre;
          this.requestUsuario.apellidoPaterno = this.formulario.value.apellidoPaterno;
          this.requestUsuario.apellidoMaterno = this.formulario.value.apellidoMaterno;
          this.requestUsuario.email = this.formulario.value.email;
          this.requestUsuario.listPerfiles = [1];
          this.onGuardar.emit(this.requestUsuario);
        }
      });
  }
  ngOnInit(): void {
    this.formulario = new FormGroup({
      id: new FormControl(0),
      codigo: new FormControl(''),
      login: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellidoPaterno: new FormControl('', [Validators.required]),
      apellidoMaterno: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)])
    });
    if (this.usuario) {
      
      this.formulario.patchValue({
        id: this.usuario.id,
        login: this.usuario.login,
        nombre: this.usuario.nombre,
        apellidoPaterno: this.usuario.apellidoPaterno,
        apellidoMaterno: this.usuario.apellidoMaterno,
        email: this.usuario.correo,
        codigo: this.usuario.codigo
      });
      this.formulario.controls.codigo.disable();
    }
  }
  AbrirModalPersonal(){
    this.dialogo.open(DialogPersonalComponent, {
      maxWidth: '35vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '35%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `Este archivo será visualizado por el proveedor?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: boolean) => {
       

        
      });
  }

  onSelect(event: any) {


    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      disableClose: true,
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `Este archivo será visualizado por el proveedor?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: boolean) => {
        if (event.addedFiles.length > 10) {
          this.bootstrapNotifyBarService.notifyWarning("No se pueden agregar más de 10 archivos a la vez");
        } else {
          for (const file of event.addedFiles) {
            if (this.isFileSizeAllowed(file.size)) {
              if (this.dsAdjunto.length < 10) {
                event.addedFiles.forEach((x: any) => {
                  x.progress = 0;
                });
                let adj: TmAdjunto = {
                  stUsuarioRegistro: localStorage.getItem("NombreCompleto") || "",
                  fxRegistro: new Date(),
                  stNombreArchivo: file.name,
                  tamanio: file.size,
                  progress: 0,
                  file: file,
                  nombreExtension: "." + file.name.split(".").pop(),
                  //stNombreArchivoRuta: res.ruta,
                  stVerProveedor: confirmado ? "SI" : "NO",
                  blMarca: confirmado
                }
                /*if (this.solicitud) {
                  const blob = new Blob([file], { type: file.type });
                  const response = await this.azureService.uploadFile(blob, file.name);
                  adj.stNombreArchivoRuta = response.uuidFileName;
                  adj.IdRegistro = this.solicitud.idSolicitud,
                    this.assetService.postTmAdjunto(adj)
                      .subscribe((res: any) => {
                        adj.idAdjunto = res.idAdjunto;
                        this.dsAdjunto.push(adj);
                        this.table?.renderRows();
                      })

                } else*/
                  this.dsAdjunto.push(adj);

                this.uploadFilesSimulator(0);
              } else {
                this.bootstrapNotifyBarService.notifyWarning("Se permiten un máximo de 10 archivos.");
              }
            } else {
              this.bootstrapNotifyBarService.notifyWarning("El tamaño máximo de un archivo permitido es de 2 mb, los archivos con un tamaño superior a 2 mb se descartan.");
            }
          }


        }
      });

  
  }

  isFileSizeAllowed(size: any) {
    let isFileSizeAllowed = false;
    if (size < 2000000) {
      isFileSizeAllowed = true;
    }
    return isFileSizeAllowed;
  }
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.dsAdjunto.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {

          if (this.dsAdjunto[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {

            this.dsAdjunto[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  /**
* format bytes
* @param bytes (File size in bytes)
* @param decimals (Decimals point)
*/
  formatBytes(bytes: any, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  public downloadImage(row: any) {

    this.azureService.downloadImagefile(row);
  }
  public deleteImageGenerales(row: any) {

    this.dialogo.open(DialogoConfirmacionComponent, {
      maxWidth: '25vw',
      maxHeight: 'auto',
      height: 'auto',
      width: '25%',
      data: {
        titulo: `Mensaje de Confirmación`,
        mensaje: `¿Esta seguro que desea eliminar?`
      }
    })
      .afterClosed()
      .subscribe(async (confirmado: Boolean) => {
        if (confirmado) {
          this.azureService.deleteImage(row.stNombreArchivoRuta, () => {
            const index = this.dsAdjunto.indexOf(row);
            if (index >= 0)
              this.dsAdjunto.splice(index, 1);
            if (row.idAdjunto)
              this.assetService.deleteTmAdjunto(row.idAdjunto).subscribe((res: any) => { });
          })
        }
      });
  }
}

