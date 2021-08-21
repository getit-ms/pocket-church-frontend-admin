import {QuestaoVotacao} from "./questao-votacao";

export interface Votacao {
    id?: number;
    nome?: string;
    descricao?: string;
    dataInicio?: Date;
    dataTermino?: Date;
    status?: string;
    statusEfetivo?: string;
    agendado?: boolean;
    publicado?: boolean;
    encerrado?: boolean;
    questoes?: Array<QuestaoVotacao>;
}
