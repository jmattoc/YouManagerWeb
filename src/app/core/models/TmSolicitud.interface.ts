import { tmProveedor } from './tmProveedor.interface';
import { TmAdjunto } from './TmAdjunto-interface';
export interface TmSolicitud{
    idSolicitud :number;
    stCodigo:string;
    stEstado:string;
    stSubEstado:string;
    fkMdEstadoContratacion:number;
    fkMdSubEstadoContratacion?:number;
    fkMdTipoRecurso:number;
    fkMdTipoTrabajador:number;
    fkMdTipoContrato:number;
    fkMdSueldoAnuales:number;    
    stNombreCliente:String;
    stNombreServicio:String;
    tiempoContrato:number;
    idsAsignaciones:String;
    idsAsignacionesAdicionales:String;
    stSustentoTiempoContrato:String;
    fxFechaTentativaIncorporacion?:Date;
    
    stReemplazado:String;
    stAIP:String;    
    fxInicioLabor?:Date;
    fxFinLabor?:Date;
    stResumenRequerimiento:string;
    stDescripcionDetallada:string;
    fkAgencia?:number;
    fkProyecto:number;
    fkMdLineaContable?:number;
    flPresupuestoMensual?:number;
    stLider:string;
    //stLiderUsuario:string;
    fkMdArqueTipo?:number;
    //fkParticipacion?:number;
    fkMdPerfilContratacion?:number;
    blSenior?:boolean;
    fkMdPerfilFuncion?:number;
    fkMdPerfilValido?:number;
    stOtros:string;
    stVbOutsourcing:string;
    stUsuarioRegistro:string;
    fkUsuarioRegistro:number;    
    fxRegistro:Date;    
    isSolicitarAprobVisible:boolean;
    isAprobRechazoVisible:boolean;
    isPermiteAgregarPostulante:boolean;
    isConfirmarDisponibilidad:boolean;
    isSolicitarRqAccesos:boolean;    
    isVisibleRegistrarOc:boolean;
    isVisibleOc:boolean;    
    isVisibleRangoDisponibilidad:boolean;
    stDisponibilidadPostulante:string;
    solicitudProveedor:tmProveedor[];
    listAdjuntos:TmAdjunto[];
    fxInicioConfirmada?:Date;
    fxFinConfirmada?:Date;
    isVisibleRegistrarRq:boolean;
    isVisibleRq:boolean;
    stCodigoRq:string;
    stCodigoOc:string;
    isPermiteAgregarEliminarAdj:boolean;
    idPostulanteGanador:number;
    stPostulanteGanador:string;
    idHorario?:number;

    diasLaborables?:string;
    horaInicio?:string;
    horaFin?:string;
    listaComentario?:string;
    fkClinicaEMO?:number;
    fxSolicitudEMO?:Date;
    horaSolicitudEMO?:string;
}
export interface tmSolicitudProveedor{
    idSolicitudProveedor:number;
    idSolicitud:number;
    idProveedor:number;
}

export interface ListarSolicitudRequest{

    page?:number;
    size:number;
}
export interface ListarSolicitudResponse{
    pages:number;
    current_page:number;
    totalElements:number;
    records:[ListarSolicitudDto];
}
export interface ListarSolicitudDto{
    idSolicitud:number;
    stCodigo:string;
    stTipoRecurso:string;
    stEstado:string;
    stUsuarioRegistro:string;
    stResumenRequerimiento:string;
    stDescripcionDetallada:string;
    fxInicioLabor:Date;
    fxFinLabor:Date;
    fxRegistro:Date;
    stAgencia:string;
    permiteAnular:boolean;
}
export interface filtroSolicitud{
    fkMdTipoRecurso?:number;
    stCodigo:string;
    fkMdEstadoContratacion?:number;
    fkProyecto?:number;
    fxInicio?:Date;
    fxFin?:Date;
}