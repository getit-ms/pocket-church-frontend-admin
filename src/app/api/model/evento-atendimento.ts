import {HorarioAtendimento} from "./horario-atendimento";

export interface EventoAtendimento {
    dataInicio?: Date;
    dataTermino?: Date;
    horario?: HorarioAtendimento;
}