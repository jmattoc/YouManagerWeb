import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from '@modules/seguridad/services/usuario.service';
import { ListarUsuarioDto, UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-registro-sctr',
  templateUrl: './registro-sctr.component.html',
})
export class RegistroSCTRComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    public router: Router,
    private route: ActivatedRoute,
    private bootstrapNotifyBarService: BootstrapNotifyBarService
  ) {
  }
  ngOnInit(): void {
  }
  crear(sol: UsuarioDto) {
    this.usuarioService.grabarUsuario(sol)
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

