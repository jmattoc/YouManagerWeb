import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
export class Ausenciaservice {
  private apiBase: string = environment.apiBase;

  constructor(
    private http: HttpClient
  ) { }

  getlistartipoausenciaMaestro(id: number){
    var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    // console.log('URL_Estdo_Cel',urlperfil);
     return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  }
  postpaginadotrabajador(data: any){
    var url = this.apiBase + "/core/" + "trabajador/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  postguardarausencia(data){
    var url = this.apiBase + "/core/" + "Ausencia";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))

  }
  postlistarbajndejaausencia(data:any){
    var url = this.apiBase + "/core/" + "Ausencia/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }
  getupdatedataausencia(id: any){
    var urlperfil = this.apiBase + "/core/" + "Ausencia/" + id;
    // console.log('URL_Estdo_Cel',urlperfil);
     return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  }
  putactualizarAusencia(edit: any){
    var url = this.apiBase + "/core/"+"Ausencia";
    return this.http.put<Response>(url,edit,httpOption).pipe(map((res) =>{return res;}))
  }
  getlistarEstadoAusenciaMaestro(id: number){
    var urlperfil = this.apiBase + "/ADM/" + "ListarMaestroDetalle?fkMaestro=" + id;
    // console.log('URL_Estdo_Cel',urlperfil);
     return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  }
  postaprobarausencia(id:any){
    var url = this.apiBase + "/core/"+"Ausencia/"+"aprobar?IdSolicitudAusencia="+id;
    return this.http.post<Response>(url,httpOption).pipe(map((res) =>{return res;}))
  }
  gethistorialAusencia(idEmpleado: number){
    var urlperfil = this.apiBase + "/core/" + "Ausencia/"+"listarSolicitudxEmpleado/" + idEmpleado;
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}));
  }

}
