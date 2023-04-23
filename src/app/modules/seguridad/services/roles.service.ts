import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(
    private http: HttpClient
  ) { }
  listarApps(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Apps`);
  }
  listarRoles(request: any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiBaseSeguridad}/Profile/listarPerfilesxFiltro`, request);
  }
  listarRol(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Profile`).toPromise();
  }
  eliminarRoles(id: number) {
    return this.http.delete(`${environment.apiBaseSeguridad}/Profile/${id}`);
  }
  activarDesactivarRoles(id: number,accion: boolean) {
    return this.http.get(`${environment.apiBaseSeguridad}/Profile/ActivarDesactivar/${id}/${accion}`);
  }
  obtenerRolesPorId(id: number): any {
    return this.http.get<any>(`${environment.apiBaseSeguridad}/Profile/${id}`).pipe(map((res) =>{return res;}));
  }
  actualizarRoles(request: any) {
    return this.http.put(`${environment.apiBaseSeguridad}/Profile`, request);
  }
  grabarRoles(request: any) {
    return this.http.post(`${environment.apiBaseSeguridad}/Profile`, request);
  }
}