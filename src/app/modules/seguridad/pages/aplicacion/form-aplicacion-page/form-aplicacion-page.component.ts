import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';



@Component({
  selector: 'app-form-aplicacion-page',
  templateUrl: './form-aplicacion-page.component.html',
  styleUrls:['./form-aplicacion-page.component.css'],
  providers: [     ]
})
export class FormAplicacionComponent implements OnInit {
  @Input() objRegistro: any;
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();  
  formulario: FormGroup;
  

  decryptedMessage : string;

  constructor(public dialogo: MatDialog,
              private fb: FormBuilder) {        
  }
  async ngOnInit() {
    if(this.objRegistro){ //EsEdicion            

      this.formulario = this.fb.group({      
        Id: [{ value: this.objRegistro.Id, disabled: false},[]],
        Codigo: [{ value: this.objRegistro.Codigo, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        Nombre: [{ value: this.objRegistro.Nombre, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        NombreCompleto: [{ value: this.objRegistro.NombreCompleto, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        CodigoAcceso: [{ value: this.objRegistro.CodigoAcceso, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        JwtKey: [{ value: this.objRegistro.JwtKey, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],        
        dominioweb: [{ value: this.objRegistro.dominioweb, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],        
        passwordDefault: [{ value: this.objRegistro.passwordDefault, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],        
        Activo: [{ value: this.objRegistro.Activo, disabled: false }, []],        
        jsonEmail: [{ value: this.objRegistro.jsonEmail, disabled: false }, [Validators.required]],        
        jsonVersion: [{ value: this.objRegistro.jsonVersion, disabled: false }, [Validators.required]],        
      });
    }else{
      this.formulario = new FormGroup({      
        Codigo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        NombreCompleto: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        CodigoAcceso: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        JwtKey: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        dominioweb: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]),
        passwordDefault: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        Activo:new FormControl(true,[Validators.required]),
        jsonEmail: new FormControl(''),
        jsonVersion : new FormControl('')
      });
    }
  } 
  async guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.dialogo.open(DialogoConfirmacionComponent, { maxWidth: '25vw', maxHeight: 'auto', height: 'auto', width: '25%', disableClose: true,
      data: { titulo: `Registro de Aplicaciones`, mensaje: `¿Está seguro que desea grabar?` }
    }).afterClosed().subscribe(async (Ok: Boolean) => {
        if (Ok) {                    
          this.onGuardar.emit(this.formulario.value);
        }
      });
  }
}