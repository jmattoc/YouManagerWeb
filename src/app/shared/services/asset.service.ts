import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TmAdjunto } from '@core/models/TmAdjunto-interface';
import { map } from 'rxjs/operators';
const httpOption = {
  headers: new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  private apiBase = environment.apiBase;
  private apiBaseSeguridad = environment.apiBaseSeguridad;

  constructor(
    private http: HttpClient
  ) { }


    subirArchivo(form: FormData) {
      return this.http.post(`${this.apiBase}/File/cargar-archivo`, form);
    }
    descargarArchivo(stNombreArchivoRuta: string) {
      return this.http.get(`${this.apiBase}/File/descargar-archivo/${stNombreArchivoRuta}`, {
        responseType: 'blob'
      });
    }
    deleteArchivo(ruta: string) {
      let params = new HttpParams();
      params = params.append('rutaArchivo', ruta);
      return this.http.get(`${this.apiBase}/File/eliminar-archivo`, { params });
    }
    deleteTmAdjunto(idAdjunto: number) {
      return this.http.delete(`${this.apiBase}/File/tmAdjunto/${idAdjunto}`);
    }
    postTmAdjunto(adj: TmAdjunto) {
      return this.http.post<TmAdjunto>(`${this.apiBase}/File/tmAdjunto`, adj);
    }
    postpaginadotrabajador(data: any){
      var url = this.apiBase + "/core/" + "trabajador/"+"Paginado";
      return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
    }
    getasignaractivomodal(IdActivo: any, IdEmpleado: any){
      var url = this.apiBase + "/INV/" + "Activo/"+"Asignar?IdActivo="+IdActivo+"&IdEmpleado="+IdEmpleado;
      return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
    }
    getdevolveractivomodal(IdActivo: any, IdEmpleado: any){
      var url = this.apiBase + "/INV/" + "Activo/"+"Devolver?IdActivo="+IdActivo+"&IdEmpleado="+IdEmpleado;
      return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
    }

    postguardacabecera(cab: any){
      var url = this.apiBase + "/REC/"+"Objetivo/";
      return this.http.post<Response>(url,cab,httpOption).pipe(map((res) =>{return res;}));
    }
    postpaginadoobjetivovalor(data: any){
      var url = this.apiBase + "/REC/"+"Objetivo/"+"Paginado";
      return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
    }

    postrechazarausencia(data: any){
      var url = this.apiBase + "/core/"+"Ausencia/"+"rechazar";
      return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
    }
    getlistarperfil(){
      var url = this.apiBaseSeguridad + "/Profile";
      return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
    }
    postcrearuser(data: any){
      var url = this.apiBaseSeguridad + "/User";
      return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
    }
    getbuscarusertoll(nombre: string){
      var url = this.apiBaseSeguridad + "/User"+"/All?nombre=" +nombre;
      return this.http.get<Response>(url,httpOption).pipe(map((res) =>{return res;}))
    }
    postdarAccesouser(data: any){
      var url = this.apiBaseSeguridad + "/User"+"/darAccesoAlSistema";
      return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}));
    }



}
