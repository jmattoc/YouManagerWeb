import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from '@modules/seguridad/services/usuario.service';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',

})
export class EditarUsuarioComponent implements OnInit {
  objRegistro: any;
  constructor(
    private usuarioService: UsuarioService,
    public router: Router,
    private route: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService
  ) {
  }
  async ngOnInit() {    
    let valor: any = this.route.snapshot.paramMap.get('id');   
    this.usuarioService.obtenerUsuarioPorId(parseInt(valor)).subscribe((data: any) => {
      this.objRegistro=data;      
    });
  }
  actualizar(req: any) {
    this.usuarioService.actualizarUsuario(req)
      .subscribe((data: any) => {
        if(data.tipoResultado==1){
          this.bootstrapNotifyBarService.notifySuccess(data.mensaje);
          setTimeout(() => {
            this.router.navigate(['/seguridad', 'bandusuario'])
          }, 3000)
        }else{
          this.bootstrapNotifyBarService.notifyWarning(data.mensaje);
        }      
      });
  }
}

