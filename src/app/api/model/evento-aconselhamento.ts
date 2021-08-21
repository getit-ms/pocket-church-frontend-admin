import {HorarioAtendimento} from "./horario-atendimento";

export interface EventoAconselhamento {
    dataInicio?: Date;
    dataTermino?: Date;
    horario?: HorarioAtendimento;
}