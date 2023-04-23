import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from '@modules/seguridad/services/usuario.service';
import { ListarUsuarioDto, UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
})
export class RegistroUsuarioComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    public router: Router,
    private route: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService
  ) {
  }
  ngOnInit(): void {
  }
  crear(req: any) {
    console.log(req); 
    this.usuarioService.grabarUsuario(req)
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

