export interface Response{

  Exito: number;
  msg: string;
  data: any;

}

export interface ListarbandejaperfilResponse{
   totalPages:number;
    pageNumber:number;
    totalRecords:number;
    pageSize:number;
   data:[ListarbandejaperfilDto];

}
export interface ListarbandejaperfilDto{
  id:number;
  nombre:string;
  categoria:string;
  funcionesPuesto: string;
  estado:string;
  fxRegistro:Date;
  Observacion: string;

}
export interface ListarbandejacategoriaResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejaperfilDto];

}
export interface ListarbandejacategoriaDto{
  id:number;
  nombre:string;
  categoria:string;
  funcionesPuesto: string;
  estado:string;
  fxRegistro:Date;
  Observacion: string;

}
export interface ListarbandejaHorariotrabajadorResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejaharariotrabajadorDto];

}
export interface ListarbandejaharariotrabajadorDto{
  estado: string,
  id:number;
  nombre:string,
  descripcion:string,
  orden: number,
  fechaRegistro: Date,
  activo: boolean,
  detalle: string,





}
export interface ListarbandejaMaestroDetalleResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
  data:[ListarbandejaMaestroDetalleDto];

}

export interface ListarbandejaMaestroDetalleDto{
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
export interface Listarestadocelular {

}
