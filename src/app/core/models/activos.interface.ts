export interface Response{

  Exito: number;
  msg: string;
  data: any;

}

export interface ListartrabajadorespaginadoResponse{
  totalPages:number;
  pageNumber:number;
  totalRecords:number;
  firstPage: number;
  lastPage: number;
  nextPage:number;
  pageSize:number;
 data:[ListartrabajadorespaginadoDto];

}
export interface listarpersonalasignadoResponse{
  totalPages:number;
  pageNumber:number;
  totalRecords:number;
  firstPage: number;
  lastPage: number;
  nextPage:number;
  pageSize:number;
 data:[listarpersonalasignadoDto];

}
export interface listarpersonalasignadoDto{
 empleado: string;
 accion: string;
 fechaRegistro: Date;
}

export interface ListartrabajadorespaginadoDto{
  id: number;
  codigo: string;
  nombre: string;
  nroDocumento: string;
}
export interface ListarbandejaActivosResponse{
  totalPages:number;
   pageNumber:number;
   totalRecords:number;
   firstPage: number;
   lastPage: number;
   nextPage:number;
   pageSize:number;
  data:[ListarbandejaActivosDto];

}
export interface ListarbandejaActivosDto{
 id:number;
 idCategoria: number;
 idEstado: number;
 idMarca: number;
 idModelo: number;
 idOperador: number;
 marca: string;
 modelo: string;
 nombreTipo:string;
 nombrecompletoRegistro:string;
 nroSerie: string;
 nroSim: string;
 estado:string;
 operador: string;
 planTarifa: string;
 tipo:number;
 tmoMeses:string;
 fxRegistro:Date;
 usuarioRegistro: number;
 fechaAlta:Date;
 emei:string;
 codigoInventario:string;
 codigo: string;
 categoria: string;
 capMemory: string;
 accesorioAdicional: string;

}
