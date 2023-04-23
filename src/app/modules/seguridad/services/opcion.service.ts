import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OpcionService {
  constructor(
    private http: HttpClient
  ) { }
  listarOpciones() : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarOpciones`).toPromise();
  }
  listarOpcionesxApp(App:number) : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarOpcionesxApp/${App}`).toPromise();
  }
  listarOpcionesxAppVersion(App:number,Version:number) : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarOpcionesxApp/${App}/${Version}`).toPromise();
  }
  listarOpcionesxPerfil(idPerfil: number) : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarOpcionesxPerfil/${idPerfil}`).toPromise();
  }
  listarMisOpcionesxPerfilyVersion(idPerfil: number,Version:number) : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarMisOpcionesxPerfilyVersion/${idPerfil}/${Version}`).toPromise();
  }
  listarPermisosPorOpcionYm(nombreOpcion: string) : Observable<any[]> {
    let params = new HttpParams();
    params = params.append('rutaOpcion', nombreOpcion);    
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarPermisosPorOpcionYm`, { params });
  }
  grabar(request:any) {
    return this.http.post(`${environment.apiBaseSeguridad}/Access/Opcion`, request);
  }
  actualizar(request:any) {
    return this.http.put(`${environment.apiBaseSeguridad}/Access/Opcion`, request);
  }
  obtener(idOpcion:number) {
    return this.http.get(`${environment.apiBaseSeguridad}/Access/Opcion/${idOpcion}`);
  }
  listarxIdPadre(idPadre: number) : Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/Opcion/listarxIdPadre/${idPadre}`);
  }
  listarModulos(idAplicacion: number,Version:number) : Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/Opcion/listarModulos/${idAplicacion}/${Version}`);
  }
  actualizarOrden(request:any) {
    return this.http.post(`${environment.apiBaseSeguridad}/Access/Opcion/actualizarOrden`, request);
  }
  listarMisOpcionesxVersion(Version:number) : Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Access/listarMisOpcionesxVersion/${Version}`).toPromise();
  }
}