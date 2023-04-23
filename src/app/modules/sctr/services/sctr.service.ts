import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListarUsuarioDto,UsuarioDto } from '@core/models/seguridad/UsuarioDto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(
    private http: HttpClient
  ) { }
  obtenerUsuarioPorId(id:number):Observable<any> {
    return this.http.get<any>(`${environment.apiBaseSeguridad}/User/${id}`);
  }
  actualizarUsuario(request:UsuarioDto) {   
     
    return this.http.put(`${environment.apiBaseSeguridad}/User`, request);
  }
  grabarUsuario(request:UsuarioDto) {    
    return this.http.post(`${environment.apiBaseSeguridad}/User`, request);
  }
  listarUsuario():Observable<ListarUsuarioDto[]>{
    return this.http.get<ListarUsuarioDto[]>(`${environment.apiBaseSeguridad}/User`);
  }  

  eliminarUsuario(id: number) {
    return this.http.delete(`${environment.apiBaseSeguridad}/User/${id}`);
  }

}