export interface ListarbandejaColaboradoresDetalleResponse{
  totalPages:number;
  pageNumber:number;
  totalRecords:number;
  pageSize:number;
  nextPage: number;
  firstPage: number;
  previousPage: number;
 data:[ListarbandejaColaboradoresDetalleDto];

}
export interface ListarbandejaColaboradoresDetalleDto{
 id:number;
 codigo: string,
 nombre: string,
 nroDocumento:string,
 cip: string,
 sexo:string;
 correoCorporativo: string,
 telefonoCorporativo: string,
 fxInicioLabor:Date,
 fxFinLabor: Date,
 personaLider: string,
 login: string,
 mostrarCrearUsuario: boolean,


}
