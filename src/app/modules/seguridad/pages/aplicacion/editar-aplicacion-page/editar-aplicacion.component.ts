import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { asEnumerable } from 'linq-es2015';
import { ActivatedRoute, Router } from "@angular/router";
import { AplicacionService } from '@modules/seguridad/services/aplicacion.service';
import { ListarUsuarioDto, UsuarioDto } from '@core/models/seguridad/UsuarioDto';
import { BootstrapNotifyBarService } from "@shared/services/bootstrap-notify.service";
import { StepTabService } from '@modules/contra/services/StepTabService';
@Component({
  selector: 'app-editar-aplicacion',
  templateUrl: './editar-aplicacion.component.html',
  styleUrls: [
  ]
})

export class EditarAplicacionComponent implements OnInit {
  objRegistro?: any;    
  columnasVersion = ['Version', 'Nombre'];
   columnasEmail = ['userName', 'password','displayName','host','port','enableSsl','from'];
  // columnasEmail = ['displayName'];
  listarVersionDto : any[] = [];
  listarEmailDto : any[] = [];
  constructor(
    private aplicacionService: AplicacionService,
    public router: Router,
    private route: ActivatedRoute,
    private notificador: BootstrapNotifyBarService,
    public stepService: StepTabService
  ) {
  }
  ngOnInit(): void {
    let valor: any = parseInt(this.route.snapshot.paramMap.get('id'));   
    this.aplicacionService.obtenerAplicacionPorId(valor).subscribe((data: any) => {            
      if((data.jsonVersion as string).length>15){
          try {
            this.listarVersionDto = JSON.parse(data.jsonVersion);       
          } catch (e) {
            console.error(e);
          }
      }
      let objEmailJson: any=[];
      if((data.jsonEmail as string).length>15){
        try {
              objEmailJson.push(JSON.parse(data.jsonEmail));
        } catch (e) {
          console.error(e);
        }
      }        
      this.listarEmailDto=objEmailJson;             
      this.objRegistro=data;      
    });
  }
  actualizar(req: any) {
    this.aplicacionService.actualizarAplicacion(req)
      .subscribe((data: any) => {
        if(data.tipoResultado==1){
          this.notificador.notifySuccess(data.mensaje);
          setTimeout(() => {
            this.router.navigate(['/seguridad', 'bandApp'])
          }, 3000)
        }else{
          this.notificador.notifyWarning(data.mensaje);
        }      
      });
  }
  agregarVersion(){
    
  }
  EditarVersion(req:any){

  }
  EliminarEntrevista(req:any){

  }
}