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
export class Colaboradorservice {
  private apiBase: string = environment.apiBase;
  constructor(
    private http: HttpClient
  ) { }
  postpaginadotrabajador(data: any){
    var url = this.apiBase + "/core/" + "Trabajador/"+"Paginado";
    return this.http.post<Response>(url,data,httpOption).pipe(map((res) =>{return res;}))
  }


}
