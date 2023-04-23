export interface ListarbandejaausenciaDetalleResponse{
   totalPages:number;
   pageNumber:number;
   totalRecords:number;
   pageSize:number;
   nextPage: number;
   firstPage: number;
   previousPage: number;
  data:[ListarbandejaausenciaDetalleDto];

}
export interface ListarbandejaausenciaDetalleDto{
  id:number;
  idEmpleado: number,
  empleado: string,
  fechaInicio:Date,
  fechaFin: Date,
  cantidadDias:number;
  idAprobador: number,
  aprobador: number,
  idTipoAusencia:number,
  tipoAusencia: string,
  comentario: string,
  idEstado: string,
  estado: string,
  motivoRechazo: string,

}

export interface AdjuntoCloudElement {
  blMarca: boolean;
  idAdjunto: number;
  idRegistro: number;
  CodigoTabla: number;
  stNombreArchivo: string;
  stNombreArchivoRuta: string;
  NombreExtension: string;
  Tamanio: number;
  stUsuarioRegistro:number;
  stVerProveedor: string,
  stNombreTabla: string;
  fxRegistro: string;
}
