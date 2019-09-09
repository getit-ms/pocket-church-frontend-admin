import {Colaborador} from "./colaborador";

export interface AgendamentoAtendimento {
    id?: number;
    colaborador?: Colaborador;
    dataHoraInicio?: Date;
    dataHoraFim?: Date;
    status?: 'NAO_CONFIRMADO' | 'CONFIRMADO' | 'CANCELADO';
    confirmado?: boolean;
    concluido?: boolean;
    naoConfirmado?: boolean;
    cancelado?: boolean;
}