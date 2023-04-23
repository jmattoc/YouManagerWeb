import { Component,EventEmitter, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { OpcionService } from '@modules/seguridad/services/opcion.service';
import { BootstrapNotifyBarService } from '@shared/services/bootstrap-notify.service';

@Component({
  selector: 'app-modulo-del-sistema',
  templateUrl: './modulo-del-sistema.component.html',
  styleUrls: ['./modulo-del-sistema.component.css']
})
export class ModuloDelSistemaComponent implements OnInit {

  tiposPadres: string[] = ['Al módulo', 'Opción interna'];
  public valorTipo = 'Al módulo';
  objRegistro: any;
  formulario: FormGroup;
  constructor(public dialogo: MatDialog,
              private objService:OpcionService,
              public dialogRef: MatDialogRef<ModuloDelSistemaComponent>,
              private notificador: BootstrapNotifyBarService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                console.log(data);
              }

  ngOnInit(): void {
    if(this.data.id){ //EsEdicion            
      this.objService.obtener(this.data.id)
          .subscribe((data: any) => {
              this.objRegistro =data;
              this.formulario = this.fb.group({      
                Id: [{ value: this.objRegistro.Id, disabled: false},[]],
                Nombre: [{ value: this.objRegistro.Nombre, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
                Descripcion: [{ value: this.objRegistro.Descripcion, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
                Ruta: [{ value: this.objRegistro.Ruta, disabled: false }, []],        
                iconoWeb: [{ value: this.objRegistro.iconoWeb, disabled: false }, []],        
                abreviacionWeb: [{ value: this.objRegistro.abreviacionWeb, disabled: false }, []],        
                idPadre: [{ value: this.objRegistro.idPadre, disabled: false }, []],        
                stPadre: [{ value: this.objRegistro.stPadre, disabled: false }, []],        
                IdAplicacion: [{ value: parseInt(localStorage.getItem("App")), disabled: false }, []],        
                version: [{ value: this.objRegistro.version, disabled: false }, []]
              });
          });

    }else{
      this.formulario = new FormGroup({      
        Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        Descripcion: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        Ruta : new FormControl(''),
        iconoWeb : new FormControl(''),
        abreviacionWeb : new FormControl(''),
        idPadre : new FormControl(this.data.idPadre),
        stPadre : new FormControl(this.data.stPadre),
        IdAplicacion  : new FormControl(parseInt(localStorage.getItem("App"))),
        version : new FormControl(this.data.version)
      });
    }
  }
  radioChangeTipo($event: any) {
  }
  async guardar() {
    
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }    
    this.dialogo.open(DialogoConfirmacionComponent, { maxWidth: '25vw', maxHeight: 'auto', height: 'auto', width: '25%', disableClose: true,
      data: { titulo: `Registro de Opción`, mensaje: `¿Está seguro que desea grabar?` }
    }).afterClosed().subscribe(async (Ok: Boolean) => {
        if (Ok) {      
          if(this.objRegistro){
            this.objService.actualizar(this.formulario.value)
            .subscribe((data: any) => {
            if(data.tipoResultado==1){
              this.notificador.notifySuccess(data.mensaje);
              setTimeout(() => {
                this.dialogRef.close(true);                
              }, 3000)
            }else{
              this.notificador.notifyWarning(data.mensaje);
            }      
            })
          }else{
            this.objService.grabar(this.formulario.value)
            .subscribe((data: any) => {
            if(data.tipoResultado==1){
              this.notificador.notifySuccess(data.mensaje);
              setTimeout(() => {
                this.dialogRef.close(true);                
              }, 3000)
            }else{
              this.notificador.notifyWarning(data.mensaje);
            }      
            });
          }
        }
      });
  }
}