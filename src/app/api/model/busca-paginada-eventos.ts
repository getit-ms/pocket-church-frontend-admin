import {EventoCalendario} from "./evento-calendario";

export interface BuscaPaginadaEventos {
    eventos?: Array<EventoCalendario>;
    proximaPagina?: string;
    possuiProximaPagina?: boolean;
}