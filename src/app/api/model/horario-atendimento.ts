export interface HorarioAtendimento {
    id?: number;
    dataInicio?: Date;
    dataFim?: Date;
    horaInicio?: Date;
    horaFim?: Date;
    diasSemana?: Array<DiaSemana>
}

export type DiaSemana = 'DOMINGO' | 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO';