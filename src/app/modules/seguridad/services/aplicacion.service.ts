import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  constructor(
    private http: HttpClient
  ) { }    
  listarAplicacion(): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Apps/Ym`).toPromise();
  }  
  obtenerAplicacionPorId(id: number): any {
    return this.http.get<any>(`${environment.apiBaseSeguridad}/Apps/${id}`).pipe(map((res) =>{return res;}));
  }
  actualizarAplicacion(request: any) {
    return this.http.put(`${environment.apiBaseSeguridad}/Apps`, request);
  }
  grabarAplicacion(request: any) {
    return this.http.post(`${environment.apiBaseSeguridad}/Apps`, request);
  }
  listarVersiones(idApp:number): Promise<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseSeguridad}/Apps/Versiones/${idApp}`).toPromise();
  }
  
}