import { Libro } from './libro.interface';

export interface Venta {
    id: number;
    fecha: Date;
    total: number;
    items: any;
}

export interface ItemVenta {
    id: number;
    precio: number;
    numeroDescargasDisponibles: number;
    libro: Libro;
}