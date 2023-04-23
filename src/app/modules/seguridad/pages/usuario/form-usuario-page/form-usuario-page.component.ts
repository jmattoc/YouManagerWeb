import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '@shared/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { RolesService } from '../../../services/roles.service';
import { asEnumerable } from 'linq-es2015';
import { Z } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-form-usuario-page',
  templateUrl: './form-usuario-page.component.html',

})
export class FormUsuarioComponent implements OnInit {
  @Input() objRegistro: any;
  @Output() onGuardar: EventEmitter<any> = new EventEmitter();  
  formulario: FormGroup;

  groupsRoles: any[];
  controlsRoles: any;
  
  
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
    private rolesService: RolesService,
    public dialogo: MatDialog,
    public router: Router,
    private fb: FormBuilder
  ) {
  }
  async ngOnInit() {

    let lstRoles = await this.rolesService.listarRoles({idAplicacion: localStorage.getItem("App")}).toPromise();
    lstRoles = lstRoles.map(x => { return { Id: x.Id, Nombre: x.Nombre, completed:  this.objRegistro ? this.objRegistro?.listPerfiles.find(i => i.id === x.Id) != undefined : false } });    
    this.groupsRoles = asEnumerable(lstRoles).Select((option, index) => { return { option, index }; }).GroupBy(  x => Math.floor(x.index / 3),x => x.option,(key, options) => asEnumerable(options).ToArray()).ToArray();      
    this.controlsRoles = [];

        if(this.objRegistro){ //EsEdicion   
          // if (this.listarRolesDto.length > 0) {
          //   this.listarRolesDto.forEach((x) => {
          //     x.disabled = true;
          //   });
          // }
          // this.controlsRoles = this.objRegistro?.listPerfiles;
          // var controlsAsignacionesRoles: any = this.listarRolesDto.map(c => new FormControl(false));
          // this.setCheboxes(this.listarRolesDto, this.objRegistro?.listPerfiles, controlsAsignacionesRoles);
          // this.controlsRoles = this.objRegistro?.listPerfiles;
          // var controlsAsignacionesRoles: any = lstRoles.map(c => new FormControl(false));
          // this.setCheboxes(lstRoles, this.objRegistro?.listPerfiles, controlsAsignacionesRoles);
          
            this.formulario = this.fb.group({
              id: [{ value: this.objRegistro.id},[]],
              login: [{ value: this.objRegistro.login, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
              Nombre: [{ value: this.objRegistro.nombre, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
              apellidoPaterno: [{ value: this.objRegistro.apellidoPaterno, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
              apellidoMaterno: [{ value: this.objRegistro.apellidoMaterno, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
              email: [{ value: this.objRegistro.correo, disabled: false }, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],      
              ListRoles: this.fb.array([],[Validators.required]),
              recibeNotificacion: [{ value: this.objRegistro.recibeNotificacion, disabled: false }, []],      
            });            
            
            this.objRegistro?.listPerfiles.forEach((x) => {
              this.updateChkbxArray({Id : x.id,Nombre : x.nombre},true,'ListRoles');
            });
          
            
            // var IdsRoles = this.objRegistro?.listPerfiles.length > 0 ? this.objRegistro?.listPerfiles.map(x => { return x.id }).join("") : "";            
            // this.objRegistro?.listPerfiles.map(x => { return x.Id }).join("")            
            // if (IdsRoles.length > 0)
            // this.setCheboxes(lstRoles, this.objRegistro?.listPerfiles, this.formulario.value.ListRoles);

            


         }else{                
            this.formulario = new FormGroup({      
            id: new FormControl(0),      
            login: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            Nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            apellidoPaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            apellidoMaterno: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern), Validators.minLength(3), Validators.maxLength(100)]),
            ListRoles: new FormArray([], [Validators.required]),
            recibeNotificacion:new FormControl(false,[]),
          });
       }


    // this.controlsRoles = [];

    // this.formulario = this.fb.group({
    //   id: new FormControl(0),      
    //   login: new FormControl('', [Validators.required]),
    //   nombre: new FormControl('', [Validators.required]),
    //   apellidoPaterno: new FormControl('', [Validators.required]),
    //   apellidoMaterno: new FormControl('', [Validators.required]),
    //   email: new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]),
    //   ListRoles: new FormArray(this.controlsRoles, [Validators.required]),
    // });
    // if (this.objRegistro) {
      
    //   var IdsRoles = this.objRegistro?.listPerfiles.length > 0 ? this.objRegistro?.listPerfiles.map(x => { return x.id }).join("") : "";
    //   this.objRegistro?.listPerfiles.map(x => { return x.Id }).join("")
      
    //   if (IdsRoles.length > 0)
    //     this.setCheboxes(this.listarRolesDto, IdsRoles, "ListRoles");
    //   this.formulario.patchValue({
    //     id: this.objRegistro.id,
    //     login: this.objRegistro.login,
    //     nombre: this.objRegistro.nombre,
    //     apellidoPaterno: this.objRegistro.apellidoPaterno,
    //     apellidoMaterno: this.objRegistro.apellidoMaterno,
    //     email: this.objRegistro.correo,
        
    //   });
      
    // }
  }
  guardar() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.dialogo.open(DialogoConfirmacionComponent, { maxWidth: '25vw', maxHeight: 'auto', height: 'auto', width: '25%', disableClose: true,
      data: { titulo: `Registro de Usuario`, mensaje: `¿Está seguro que desea grabar?` }
    }).afterClosed().subscribe(async (Ok: Boolean) => {
        if (Ok) {
          
          let request: any = {
              Id : this.objRegistro ? this.objRegistro.id : 0,
              login : this.objRegistro.login,
              Nombre : this.formulario.value.Nombre,
              apellidoPaterno : this.formulario.value.apellidoPaterno,
              apellidoMaterno : this.formulario.value.apellidoMaterno,
              email : this.formulario.value.email,          
              recibeNotificacion: this.formulario.value.recibeNotificacion,  
              IdAplicacion :  parseInt(localStorage.getItem("App"))
            };            
            if (this.formulario.value.ListRoles !== null) 
              request.listPerfiles = this.formulario.value.ListRoles.length > 0 ? this.formulario.value.ListRoles.map(x => { return x.Id }) : [];                          
             this.onGuardar.emit(request);
          }
        });
    }
  /*
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: AbstractControl) => {

      if (formArray instanceof FormArray) {
        const totalSelected = formArray.controls
          .map((control) => control.value)
          .reduce((prev, next) => (next ? prev + next : prev), 0);
        return totalSelected >= min ? null : { required: true };
      }

      throw new Error('formArray is not an instance of FormArray');
    };
    return validator;
  }*/
  // setCheboxes(listCargados: any, listSeleccionado: String, key: string) {    
  //   const controls = <FormArray>this.formulario.get(key);    
  //   let arraSeleccionado: any[] = listSeleccionado.split(",");
    
  //   for (let index = 0; index < arraSeleccionado.length; index++) {
  //     for (let index1 = 0; index1 < listCargados.length; index1++) {
  //       //console.log(listCargados[index1].Id);
  //       if (parseInt(arraSeleccionado[index]) == listCargados[index1].Id) {
  //         listCargados[index1].completed = true;
  //         controls.push(new FormControl({ Id: arraSeleccionado[index] }));
  //         //controls.push(new FormControl({ Id: arraSeleccionado[index] }));
  //         //controls[index1].setValue(true);
  //       }
  //     }
  //   }
  // }
  setCheboxes(listCargados: any, arraSeleccionado: any[], controls: any) {
    
    for (let index = 0; index < arraSeleccionado.length; index++) {
      for (let index1 = 0; index1 < listCargados.length; index1++) {              
        if (parseInt(arraSeleccionado[index].id) == listCargados[index1].Id) {
          listCargados[index1].completed = true;
          // controls[index1].setValue(new FormControl({ Id: arraSeleccionado[index].id, Nombre: arraSeleccionado[index].Nombre }));
           controls[index1].setValue(true);
        }
      }
    }
  }

  updateChkbxArray(chk, isChecked, key) {
    
    const chkArray = <FormArray>this.formulario.get(key);
    if (isChecked) {
      //sometimes inserts values already included creating double records for the same values -hence the defence      
      if (chkArray.controls.findIndex(x => x.value == chk.Id) == -1)
        chkArray.push(new FormControl({ Id: chk.Id, Nombre: chk.Nombre }));
    } else {
      let idx = chkArray.controls.findIndex(x => x.value == chk.Id);
      chkArray.removeAt(idx);
    }
  }
}

