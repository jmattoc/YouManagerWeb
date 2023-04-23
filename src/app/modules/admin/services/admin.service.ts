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
export class adminservice{
  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }

  getlistarestadocategoria(id: number){
    var url = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  getlistarcargos(id: number){
    var url = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardarcategoria(data: any){
  var url = this.apiBase + "/ADM/" + "RegistrarMaestroDetalle";
  return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardartipotrabajador(data: any){
    var url = this.apiBase + "/ADM/" + "RegistrarMaestroDetalle";
  return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardartipocontrato(data: any){
    var url = this.apiBase + "/ADM/" + "RegistrarMaestroDetalle";
  return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardarmodtrabajador(data: any){
    var url = this.apiBase + "/ADM/" + "RegistrarMaestroDetalle";
  return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardarcentrocosto(data: any){
    var url = this.apiBase + "/ADM/" + "RegistrarMaestroDetalle";
  return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  paginadomaestrodetalle(data: any){
    var url = this.apiBase + "/ADM/" + "ListarMaestroDetallePaginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  paginadohorariotrabajador(data: any){
    var url = this.apiBase + "/ADM/" + "Horario/"+"ListarPaginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }
  geteditaradmin(id: string){
    var url = this.apiBase + "/ADM/" + "MestroDetallexId/" + id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  putupdatemaestrodetalle(dataedit: any){
    var url = this.apiBase + "/ADM/" + "ActualizaMaestroDetalle";
    return this.http.put<Response>(url,dataedit,httpOption).pipe(map((res) =>{return res;}))
  }
  gethorarioid(id: string){
    var url = this.apiBase + "/ADM/" + "Horario/" + id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }

  putupdateidhorario(dataedit: any){
    var url = this.apiBase + "/ADM/" + "Horario/";
    return this.http.put<Response>(url,dataedit,httpOption).pipe(map((res) =>{return res;}))
  }
  Postlsthorariotrabajo(){
    var url = this.apiBase + "/ADM/" + "Horario/"+"ListarPaginado";
    return this.http.post<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  postnewhorariotrabajo(data: any){
    var url = this.apiBase + "/ADM/" + "Horario/";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }
  deletemaestrodetalle(id: any){
    return this.http.delete(`${this.apiBase}/ADM/InactivarMaestroDetalle/${id}`);
  }
  GetActivar(id: any){
    return this.http.get(`${this.apiBase}/ADM/ActivarMaestroDetalle/${id}`);
  }







}
