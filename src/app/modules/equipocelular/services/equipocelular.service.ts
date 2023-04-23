import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro, LibroPage } from '@core/models/libro.interface';
import { MaestroDetalle } from '@core/models/MaestroDetalle.interface';
import { tmProyecto } from '@core/models/Proyecto.interface';
import { environment } from 'src/environments/environment';
import { tmAgencia } from '@core/models/Agencia.interface';
import { filtroSolicitud, ListarSolicitudRequest, ListarSolicitudResponse, TmSolicitud } from '@core/models/TmSolicitud.interface';
import { TmLogAcccion } from '@core/models/LogAccion.interface';
import { tmProveedor } from '@core/models/tmProveedor.interface';
import { trProveedorPostulante } from '@core/models/trProveedorPostulante.interface';
import { trHerramientaUsuario } from '@core/models/trHerramienta.Usuario.interface';
import { trHerramientaProyecto } from '@core/models/trHerramienta.Proyecto.interface';
import { trHerramientaProveedor } from '@core/models/trHerramienta.Proveedor.interface';
import { trPostulanteProveedor } from '@core/models/trHerramienta.Postulante.interface';
import { tmSolicitudComentarioProveedor } from '@core/models/tmSolicitudComentario';
import { CuentaContable } from '@core/models/CuentaContable';
import { reqAprobar } from '@core/models/reqAprobar';
import { reqSolicitarRqAccesos } from '@core/models/reqSolicitarRqAccesos';
import { solicitudSolicitudEMO } from '@core/models/solicitudSolicitudEMO.interface';
import { reqActualizarSolicitud } from '@core/models/reqActualizarSolicitud';
import { reqActualizarSolicitud_TarifaPostulante } from '@core/models/reqActualizarSolicitud_TarifaPostulante';
import { Horario } from '@core/models/adm/Horario';
import { map } from 'rxjs/operators';
const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class equipocelularservice{
  private apiBase: string = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }
getlistarestdocelular(id:number){
  var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
   // console.log('URL_Estdo_Cel',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
//ListarMaestroDetalle?fkMaestro=25
}
getlistartipodeactivocpulaptop(id:number){
  var url = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
  return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
 //ListarMaestroDetalle?fkMaestro=33
}
getlistoperadorcelular(id:number){
  var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    //console.log('URL_Estdo_Cel',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
//ListarMaestroDetalle?fkMaestro=26
}
getlistequipocelular(id:number){
  var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
   // console.log('Equipo-Cel',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
//ListarMaestroDetalle?fkMaestro=27
}
getlistarmodelocelular(id:number){
  var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
   // console.log('modelo-cellar',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
}
getlistartipoactivo(id:number){
  var url = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
  return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))

}
getlistarcategoriaempleadocel(id:number){
  var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    //console.log('modelo-cellar',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
}
postguardardata(data: any){
  var urlguardarcel = this.apiBase +"/INV/" + "Activo";
  return this.http.post<Response>(urlguardarcel,data,httpOption).pipe(map((res) =>{return res;}))
}
getlistarmarcalaptops(id:number){
 var url = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
 return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
}
paginadoinvactivos(data: any){
  var url = this.apiBase + "/INV/" + "Activo/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
}
postidactivo(id:any){
  var url = this.apiBase + "/INV/" + "Activo/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
}
putupdateactivos(dataedit: any){
  var urlguardarcel = this.apiBase +"/INV/" + "Activo";
  return this.http.put<Response>(urlguardarcel,dataedit,httpOption).pipe(map((res) =>{return res;}))
}
postmovimientopaginado(data: any){
  var url = this.apiBase + "/INV/" + "Activo/"+"MovimientoPaginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

}

}
