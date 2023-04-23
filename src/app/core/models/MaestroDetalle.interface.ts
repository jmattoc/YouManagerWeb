export interface MaestroDetalle {
    idMaestroDetalle:number;
    inCodigo?:number;
    fkMaestro?:number;
    stNombre:string;
    stDescripcion:string;
    completed:boolean;
    disabled:boolean;
}