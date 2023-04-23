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
export class bandejaperfilservice {

  private apiBase: string = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }

  getlistarpuesto(){
    var urlperfil = this.apiBase + "/ADM/" + "SolicitudPerfil";
    //console.log('Listar-perfil',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
  }
  getlistarpuestopaginado(page:any, size:any){
    var urlperfil = this.apiBase + "/ADM/" + "SolicitudPerfil/" +"Paginado?page="+ page +"&size=" +size;
    //console.log('Listar-perfil',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))
  }
  Postlistarpuestopaginado(data: any){

    var urlperfil = this.apiBase + "/ADM/" + "SolicitudPerfil/" +"Paginado";
    //console.log('Listar-perfil',urlperfil);
    return this.http.post<Response>(urlperfil,data,httpOption).pipe(map((res) =>{return res;}))
  }

  getaprobarpuesto(id: any){
    var urlperfil = this.apiBase + "/ADM/" + "SolicitudPerfil/Aprobar/" + id;
    console.log('Aprobar',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))

  }
  getinactivar(id: any){
    var urlperfil = this.apiBase + "/ADM/" + "SolicitudPerfil/Inactivar/" + id;
    console.log('Aprobar',urlperfil);
    return this.http.get<Response>(urlperfil,httpOption).pipe(map((res) =>{return res;}))

  }
}
