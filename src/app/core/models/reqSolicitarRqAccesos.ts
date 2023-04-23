export interface reqSolicitarRqAccesos{
    IdSolicitud?:number;
    fxInicioConfirmada?:Date;
    fxFinConfirmada?:Date;
    stAIP?:string;   
}

export interface reqSolicitarEMO{
    IdSolicitud?:number;
    fkMdClinicaEMO?:number;
    fxCitaClinicaEMO?:Date;
    HoraCitaClinicaEMO?:string;   
}