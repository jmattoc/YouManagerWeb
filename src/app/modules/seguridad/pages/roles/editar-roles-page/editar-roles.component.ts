import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RolesService } from '@modules/seguridad/services/roles.service';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";

@Component({
  selector: 'app-editar-roles',
  templateUrl: './editar-roles.component.html',
  styleUrls: [
  ]
})

export class EditarRolesComponent implements OnInit {
  objRegistro?: any;
  constructor(
    private rolesService: RolesService,
    public router: Router,
    private route: ActivatedRoute,
    private notificador: BootstrapNotifyBarService
  ) {
  }
  ngOnInit(): void {
    let valor: any = parseInt(this.route.snapshot.paramMap.get('id'));   
    this.rolesService.obtenerRolesPorId(valor).subscribe((data: any) => {
      localStorage.setItem("idRegistro",valor);
      this.objRegistro=data;      
    });
  }
  actualizar(req: any) {
    this.rolesService.actualizarRoles(req)
      .subscribe((data: any) => {
        if(data.tipoResultado==1){
          this.notificador.notifySuccess(data.mensaje);
          setTimeout(() => {
            this.router.navigate(['/seguridad', 'bandroles'])
          }, 3000)
        }else{
          this.notificador.notifyWarning(data.mensaje);
        }      
      });
  }
}