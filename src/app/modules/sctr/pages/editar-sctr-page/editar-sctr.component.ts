import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { ActivatedRoute, Router } from "@angular/router";
import { UsuarioService } from '@modules/seguridad/services/usuario.service';
import { ListarUsuarioDto, UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
@Component({
  selector: 'app-editar-sctr',
  templateUrl: './editar-sctr.component.html',

})
export class EditarSCTRComponent implements OnInit {
  requestUsuario: any;
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
      this.requestUsuario=data;      
    });
  }
  crear(sol: UsuarioDto) {
    this.usuarioService.actualizarUsuario(sol)
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

