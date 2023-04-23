export interface LibroPage {
    content:          Libro[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}

export interface Libro {
    id:            number;
    titulo:        string;
    slug:          string;
    descripcion:   string;
    precio:        number;
    rutaPortada:   string;
    rutaArchivo:   string;
    fechaCreacion: Date;
    urlPortada:    string;
    urlArchivo:    string;
}

export interface Pageable {
    sort:       Sort;
    offset:     number;
    pageSize:   number;
    pageNumber: number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    sorted:   boolean;
    unsorted: boolean;
    empty:    boolean;
}
