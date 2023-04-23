export interface Usuario {
    nombre: String;
    apellidos: String;
    email: String;
    passwordPlain: String;
    fechaRegistro?: Date;
}