import {Membro} from "./membro";

export interface AgendamentoAtendimento {
    id?: number;
    membro?: Membro;
    dataHoraInicio?: Date;
    dataHoraFim?: Date;
    status?: 'NAO_CONFIRMADO' | 'CONFIRMADO' | 'CANCELADO';
    confirmado?: boolean;
    concluido?: boolean;
    naoConfirmado?: boolean;
    cancelado?: boolean;
}