import {Arquivo} from "./arquivo";
import {CampoEvento} from "./campo-evento";

export interface Evento {
    id?: number;
    nome?: string;
    descricao?: string;
    limiteInscricoes?: number;
    tipo?: 'EVENTO' | 'EBD' | 'CULTO';
    vagasRestantes?: number;
    dataHoraInicio?: Date;
    dataHoraTermino?: Date;
    valor?: string;
    exigePagamento?: boolean;
    dataInicioInscricao?: Date;
    dataTerminoInscricao?: Date;
    banner?: Arquivo;
    publicado?: boolean;
    inscricoesFuturas?: boolean;
    inscricoesPassadas?: boolean;
    inscricoesAbertas?: boolean;
    filename?: string;
    campos?: Array<CampoEvento>;
}
