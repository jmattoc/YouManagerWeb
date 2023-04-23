export interface UsuarioDto {
    id: Number,
    login: string,
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    email: string
    listPerfiles?: any[]
}

export interface ListarUsuarioDto {
    Id?: number,
    Login?: string,
    Codigo?: string,
    Nombre?: string,
    NombreCompleto?: string,
    Correo?: string,
    FechaRegistro?: Date
}