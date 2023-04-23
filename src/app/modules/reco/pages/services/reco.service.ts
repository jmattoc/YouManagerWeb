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
import { Observable } from 'rxjs';
const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class recoservice{
  private apiBase: string = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }

  paginadoperido(data: any){
   var url = this.apiBase + "/REC/"+"Periodo/"+"Paginado";
   return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postregistrarperiodo(data: any){
    var url = this.apiBase + "/REC/"+"Periodo";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  geteditarperiodo(id: any){
    var url = this.apiBase + "/REC/"+"Periodo/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  putactualizarperiodo(dataedit: any){
    var url = this.apiBase + "/REC/"+"Periodo";
    return this.http.put<Response>(url,dataedit,httpOption).pipe(map((res) =>{return res;}))
  }

  potactivarperiodo(data: any){
    var url = this.apiBase + "/REC/"+"Periodo/"+"activarRegistro";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  deleteperiodo(data: any){
        var url = this.apiBase + "/REC/"+"Periodo";
       let Options = {
        headers: new HttpHeaders({
          'Conten-type': 'appication/json'
        }),
        body:data,
       }
    return this.http.delete<Response>(url,Options).pipe(map((res) =>{return res;}))
  }
  postregistrarconcepto(data: any){
    var url = this.apiBase + "/REC/"+"Concepto";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postpaginadoconcepto(data: any){
    var url = this.apiBase + "/REC/"+"Concepto/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  geteditarconcepto(id: any){
    var url = this.apiBase + "/REC/"+"Concepto/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  putactualizarconcepto(edit: any){
    var url = this.apiBase + "/REC/"+"Concepto";
    return this.http.put<Response>(url,edit,httpOption).pipe(map((res) =>{return res;}))
  }
  getobtenerinferiores(id: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica/"+"ObtenerInferiores/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardarnivel(data: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }
  postpaginadonivel(data: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }

  geteditarunidadOrgnivel(id: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  puteditarUOnivel(edit: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica";
    return this.http.put<Response>(url,edit,httpOption).pipe(map((res) =>{return res;}))
  }

  deleteconcepto(data: any){
    var url = this.apiBase + "/REC/"+"Concepto";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'appication/json'
      }),
      body:data,
     }
     return this.http.delete<Response>(url,Options).pipe(map((res) =>{return res;}))

  }
  postactivarobjetos(data: any){
    var url = this.apiBase + "/REC/"+"Concepto/"+"activarRegistro";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }
  deleteuonivel(data: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'appication/json'
      }),
      body:data,
     }
     return this.http.delete<Response>(url,Options).pipe(map((res) =>{return res;}));
  }

  getlistararbolobjetivovalor(id: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica/"+"ObtenerFormatoenArbol/"+id;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}));

  }
  getlistarOperador(id:number){
    var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
     // console.log('URL_Estdo_Cel',urlperfil);
      return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  //ListarMaestroDetalle?fkMaestro=25
  }
  getlistarUnidadMedida(id:number){
    var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
     // console.log('URL_Estdo_Cel',urlperfil);
      return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  //ListarMaestroDetalle?fkMaestro=25
  }
  getlistarMesesMaestro(id:number){
    var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
     // console.log('URL_Estdo_Cel',urlperfil);
      return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  //ListarMaestroDetalle?fkMaestro=25
  }

  postguardacabecera(cab: any){
    var url = this.apiBase + "/REC/"+"Objetivo/";
    return this.http.post<Response>(url,cab,httpOption).pipe(map((res) =>{return res;}));
  }

  postguardardetalleobjvalor(data: any){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"Detalle";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
  }

  postpaginadoobjetivovalor(data: any){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
  }

  putupdateobjetivo(dataedit: any){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"Detalle";
    return this.http.put<Response>(url,dataedit,httpOption).pipe(map((res) =>{return res;}));

  }

  getextraerdataporid(idobjetivo:number, IdUnidadOrganica: number, IdConcepto: number){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"Detalle?idObjetivo="+idobjetivo+"&IdUnidadOrganica="+IdUnidadOrganica+ "&IdConcepto="+IdConcepto;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }

  postguardarobjcumplimiento(data: any){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"registrarCumplimiento";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));

  }
  getobtenerdatosobjcumplimiento(IdObjetivoDetalle: number, mescumplimiento: number){
    var url = this.apiBase + "/REC/"+"Objetivo/"+"obtenerCumplimiento?IdObjetivoDetalle="+IdObjetivoDetalle+"&mescumplimiento="+mescumplimiento;
    return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  deletenivelUO(data: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica";
    let Options = {
      headers: new HttpHeaders({
        'Conten-type': 'appication/json'
      }),
      body:data,
     }
     return this.http.delete<Response>(url,Options).pipe(map((res) =>{return res;}))

  }
  postactivarnivelUO(data: any){
    var url = this.apiBase + "/REC/"+"UnidadOrganica/"+"activarRegistro";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }





}
