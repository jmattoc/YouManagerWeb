export interface PlanificacionCategoria {
    IdCategoria:            number;
    Categoria:          string;
    Estado:            boolean;
}

export interface PlanificacionModulo {
    IdModulo:            number;
    Modulo:          string;
    Estado:            boolean;
}

export interface PlanificacionPrioridad {
    IdPrioridad:            number;
    Prioridad:          string;
    Estado:            boolean;
}

export interface PlanificacionSistema {
    IdSistema:            number;
    Sistema:          string;
    Estado:            boolean;
}

export interface PlanificacionTipodeSolicitud {
    IdTipodeSolicitud:            number;
    Descripcion:          string;
    Estado:            boolean;
}