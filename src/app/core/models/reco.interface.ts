
export interface ListarbandejaperiodoDetalleResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejaperiodoDetalleDto];

}
export interface ListarbandejaperiodoDetalleDto{
  idMaestroDetalle:number;
  inCodigo: number,
  fkMaestro: number,
  stnombre:string,
  fkUsuarioRegistro: number,
  fxRegistro:Date;
  blActivo: boolean,
  fkMaestroDetalle: number,
  stDescripcion:string,
  usuarioModifica: number,

}
export interface ListarbandejaobjtivovalorResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
   data:[ListarbandejaObjetivovalorDetalleDto];

}
export interface ListarbandejaObjetivovalorDetalleDto{
  id: number;
  fxRegistro:Date;
  activo: boolean,
  periodo: string,
  descripcion:string,
  usuarioModifica: number,

}
export interface ListarbandejaconceptoDetalleResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejaconceptoDetalleDto];

}

export interface ListarbandejaconceptoDetalleDto{
  idMaestroDetalle:number;
  inCodigo: number,
  fkMaestro: number,
  stnombre:string,
  fkUsuarioRegistro: number,
  fxRegistro:Date;
  blActivo: boolean,
  fkMaestroDetalle: number,
  stDescripcion:string,
  usuarioModifica: number,

}

export interface ListarbandejanivelDetalleResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejanivelDetalleDto];

}

export interface ListarbandejanivelDetalleDto{
  idMaestroDetalle:number;
  inCodigo: number,
  fkMaestro: number,
  stnombre:string,
  fkUsuarioRegistro: number,
  fxRegistro:Date;
  blActivo: boolean,
  fkMaestroDetalle: number,
  stDescripcion:string,
  usuarioModifica: number,

}

