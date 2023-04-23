import { tmProveedor } from '@core/models/tmProveedor.interface';
export interface reqActualizarSolicitud{
    IdSolicitud?:number;
    FkMdEstadoContratacion?:number;
    fkMdSubEstadoContratacion?:number;
    stAIP?:string;

    FkMdArqueTipo?:number;
    fkParticipacion?:number;
    StOtros?:string;
    StLider?:string;
    StLiderUsuario?:string;
    FkMdTipoRecurso?:number;
    FxInicioLabor?:Date;
    FxFinLabor?:Date;
    FlPresupuestoMensual?:number;
    StDescripcionDetallada?:string;

    FkAgencia?:number;
    StVbOutsourcing?:string;
    FkMdPerfilContratacion?:number;
    //BlSenior?:Boolean;
    FkMdPerfilFuncion?:number;
    FkMdPerfilValido?:number;
    
    FkMdLineaContable?:number;
    FkProyecto?:number;

    stCodigoRq?:string;
    stCodigoOc?:string;
    fxInicioConfirmada?:Date;
    fxFinConfirmada?:Date;

    listProveedor?:tmProveedor[];
}