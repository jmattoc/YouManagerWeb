import { HttpClient, HttpParams } from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class ContraService {

  private apiBase: string = environment.apiBase;


  constructor(
    private http: HttpClient
  ) { }


  getLibros(page: number = 0, size: number = 5) {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('size', size);
    params = params.append('sort', 'fechaCreacion,desc')

    return this.http.get<LibroPage>(`${this.apiBase}/admin/libros`, { params });
  }

  crearLibro(libro: Libro) {
    return this.http.post(`${this.apiBase}/admin/libros`, libro);
  }

  getLibro(id: number) {  
    return this.http.get(`${this.apiBase}/admin/libros/${id}`);
  }

  actualizarLibro(id: number, libro: Libro) {
    return this.http.put(`${this.apiBase}/admin/libros/${id}`, libro);
  }

  eliminarLibro(libro: Libro) {
    return this.http.delete(`${this.apiBase}/admin/libros/${libro.id}`);
  }
  getMaestroDetalle(fkMaestro: number){
    let params = new HttpParams();
    params = params.append('fkMaestro', fkMaestro);
    return this.http.get<Array<MaestroDetalle>>(`${this.apiBase}/ADM/ListarMaestroDetalle`, { params });
  }
  getMaestroDetalleAsync(fkMaestro: number): Promise<any[]>{
    let params = new HttpParams();
    params = params.append('fkMaestro', fkMaestro);
    return this.http.get<Array<MaestroDetalle>>(`${this.apiBase}/ADM/ListarMaestroDetalle`, { params }).toPromise();
  }

  getMaestroDetalleRecursivo(fkMaestro: number){
    let params = new HttpParams();
    params = params.append('fkMaestroDetalle', fkMaestro);
    return this.http.get<Array<MaestroDetalle>>(`${this.apiBase}/ADM/ListarMaestroDetalleRecursivo`, { params });
  }
  getMestroDetallexId(IdMaestroDetalle: number){    
    return this.http.get<MaestroDetalle>(`${this.apiBase}/ADM/MestroDetallexId/${IdMaestroDetalle}`);
  }

  getProyectos(){
    return this.http.get<Array<tmProyecto>>(`${this.apiBase}/RCT/ListarProyectos`);
  }
  getAgencias(){
    return this.http.get<Array<tmAgencia>>(`${this.apiBase}/RCT/ListarAgencias`);
   }
   crearSolicitud(sol: TmSolicitud) {     
    return this.http.post(`${this.apiBase}/RCT`, sol);
  }
  actualizarSolicitud(id: number, sol: TmSolicitud) {
    sol.idSolicitud = id;    
    return this.http.post(`${this.apiBase}/RCT/Actualizar`, sol);
  }

  getSolicitudes(filtros:filtroSolicitud,page: number = 1, size: number = 5 ) {        
    return this.http.post<ListarSolicitudResponse>(`${this.apiBase}/RCT/ListarPaginado`, {page,size,filtros});
  }
  getSolicitud(id: number) {  
    return this.http.get(`${this.apiBase}/RCT/${id}`);
  }
  SolicitarAprobacion(id:number){
    return this.http.get(`${this.apiBase}/RCT/SolicitarAprobacion/${id}`);
  }
  AprobarSolicitud(pos: reqAprobar){
   /* let params = new HttpParams();
    params = params.append('IdSolicitud', IdSolicitud);    
    params = params.append('arrProveedor', arrProveedor);   
    params = params.append('stAIP', stAIP);   */
    //return this.http.get(`${this.apiBase}/RCT/Aprobar`, { params }); 
    return this.http.post(`${this.apiBase}/RCT/Aprobar`, pos);  
  }
  RechazarSolicitud(IdSolicitud:number,stMotivo:string){
    let params = new HttpParams();
    params = params.append('IdSolicitud', IdSolicitud);    
    params = params.append('stMotivo', stMotivo);
    return this.http.get(`${this.apiBase}/RCT/Rechazar`, { params });   
  }
  getLog(stNombreTabla: string,IdRegistro:number) {  
    return this.http.get<TmLogAcccion>(`${this.apiBase}/RCT/ListarLogAccion/${stNombreTabla}/${IdRegistro}`);
  }
  Anular(id:number){
    return this.http.get(`${this.apiBase}/RCT/Anular/${id}`);
  }   
  getProveedores(){
    return this.http.get<Array<tmProveedor>>(`${this.apiBase}/ADM/ListarProveedores`);
   }
  crearPostulante(pos: trProveedorPostulante) {
    return this.http.post(`${this.apiBase}/RCT/Postulante`, pos);
  } 

  getPostulantes(fkProveedor:number,fkSolicitud:number) {  
    return this.http.get<trProveedorPostulante>(`${this.apiBase}/RCT/ListarPostulantes/${fkProveedor}/${fkSolicitud}`);
  }
  getProgramarEntrevista(idPostulante:number,fxFechaEntrevista:string){
    let params = new HttpParams();
    params = params.append('idPostulante', idPostulante);    
    params = params.append('fxFechaEntrevista', fxFechaEntrevista);
     return this.http.get(`${this.apiBase}/RCT/Postulante/programarEntrevista`,{ params });
  }
  getRechazarEntrevista(idPostulante:number,stMotivoRechazo:string){
    let params = new HttpParams();
    params = params.append('idPostulante', idPostulante);    
    params = params.append('stMotivoRechazo', stMotivoRechazo);    
     return this.http.get(`${this.apiBase}/RCT/Postulante/RechazarEntrevista`,{ params });
  }
  getAprobarEntrevista(idPostulante:number,fxFechaEntrevista:string,stTipoEntrevista:string,stLugarEntrevista:string){
    let params = new HttpParams();
    params = params.append('idPostulante', idPostulante);    
    params = params.append('fxFechaEntrevista', fxFechaEntrevista);
    params = params.append('stTipoEntrevista', stTipoEntrevista);    
    params = params.append('stLugarEntrevista', stLugarEntrevista);
     return this.http.get(`${this.apiBase}/RCT/Postulante/aprobarEntrevista`,{ params });
  }
  getDarFeedback(idPostulante:number,stResultado:string,inPrioridad:number,esElegido:boolean){
    let params = new HttpParams();
    params = params.append('idPostulante', idPostulante);    
    params = params.append('stResultado', stResultado);
    params = params.append('inPrioridad', inPrioridad);    
    params = params.append('esElegido', esElegido);
     return this.http.get(`${this.apiBase}/RCT/Postulante/darFeedback`,{ params });
  }
  getSeleccionarGanador(idPostulante:number) {  
    return this.http.get<TmLogAcccion>(`${this.apiBase}/RCT/Postulante/seleccionarGanador/${idPostulante}`);
  }
  getConfirmarDisponibilidad(idSolicitud:number,fxDisponibilidadPostulante:string){
    let params = new HttpParams();
    params = params.append('idSolicitud', idSolicitud);    
    params = params.append('fxDisponibilidadPostulante', fxDisponibilidadPostulante);
    return this.http.get(`${this.apiBase}/RCT/confirmarDisponibilidad`,{ params });
  }
  
  /*
  postSolicitarRqAccesos(idSolicitud:number,fxInicioConfirmada:Date,fxFinConfirmada:Date){
    return this.http.post(`${this.apiBase}/RCT/SolicitarRqAccesos`, {idSolicitud,fxInicioConfirmada,fxFinConfirmada});   
  }*/
  postSolicitarRqAccesos(pos: reqSolicitarRqAccesos){
    return this.http.post(`${this.apiBase}/RCT/SolicitarRqAccesos`, pos);   
  }
  solicitarExamenMedicoOcupacional(pos: solicitudSolicitudEMO){
    return this.http.post(`${this.apiBase}/RCT/solicitarExamenMedicoOcupacional`, pos);   
  }
   
  
  getRegistrarRq(idSolicitud:number,stCodigoRq:string){
    let params = new HttpParams();
    params = params.append('idSolicitud', idSolicitud);    
    params = params.append('stCodigoRq', stCodigoRq);    
    return this.http.get(`${this.apiBase}/RCT/registrarRq`,{ params });
  }    
  getRegistrarOc(idSolicitud:number,stCodigoOc:string){
    let params = new HttpParams();
    params = params.append('idSolicitud', idSolicitud);    
    params = params.append('stCodigoOc', stCodigoOc);    
    return this.http.get(`${this.apiBase}/RCT/registrarOc`,{ params });
  }  
  getPostulantesGanadores(){
       return this.http.get<trProveedorPostulante>(`${this.apiBase}/RCT/ListarPostulantesGanadores`);   
  }
  descargarReporteGeneral(filtros:filtroSolicitud) {    
    return this.http.post(`${this.apiBase}/RCT/descargarReporteGeneral`, filtros,{
      responseType: 'blob'
    });
  }
  descargarPostulantes() {    
    
    return this.http.get(`${this.apiBase}/RCT/descargarPostulantes`, {
      responseType: 'blob'
    });
  }

//::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::

crearUsuario(pos: trHerramientaUsuario) {
  return this.http.post(`${this.apiBase}/RCT/crearUsuario`, pos);
}

crearCuentaContable(pos: CuentaContable) {
  return this.http.post(`${this.apiBase}/RCT/crearCuentaContable`, pos);
}

crearProyecto(pos: trHerramientaProyecto) {
  return this.http.post(`${this.apiBase}/RCT/crearProyecto`, pos);
}

crearProveedor(pos: trHerramientaProveedor) {
  return this.http.post(`${this.apiBase}/RCT/crearProveedor`, pos);
}

crearHerramientaPostulante(pos: trPostulanteProveedor) {
  return this.http.post(`${this.apiBase}/RCT/crearHerramientaPostulante`, pos);
}



crearComentarioSolicitud(pos: tmSolicitudComentarioProveedor) {
  return this.http.post(`${this.apiBase}/RCT/crearComentarioSolicitud`, pos);
}

actualizarSolicitud_cont(pos: reqActualizarSolicitud) {
  
  return this.http.post(`${this.apiBase}/RCT/actualizarSolicitud`, pos);
}

actualizarSolicitud_TarifaPostulante(pos: reqActualizarSolicitud_TarifaPostulante) {
  
  return this.http.post(`${this.apiBase}/RCT/actualizarSolicitud_TarifaPostulante`, pos);
}




listarProveedor(idProveedor:number) {
  let params = new HttpParams();
  params = params.append('idProveedor', idProveedor);  
  return this.http.get(`${this.apiBase}/RCT/listarProveedor`,{ params });
}

listarGradoInstruccion() {
  return this.http.get(`${this.apiBase}/RCT/listarGradoInstruccion`);
}    



listarEstadoContratacion() {
  return this.http.get(`${this.apiBase}/RCT/listarEstadoContratacion`);
}    

listarSubEstadoContratacion() {
  return this.http.get(`${this.apiBase}/RCT/listarSubEstadoContratacion`);
}    


listarSolicitudComentario(IdSolicitud:number) {
  let params = new HttpParams();
  params = params.append('IdSolicitud', IdSolicitud);  
  return this.http.get(`${this.apiBase}/RCT/listarSolicitudComentario`,{ params });
}

getListarHorario(){
  return this.http.get<Array<Horario>>(`${this.apiBase}/ADM/Horario/Listar`);
}
}