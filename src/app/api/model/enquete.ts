import {QuestaoEnquete} from "./questao-enquete";

export interface Enquete {
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
    questoes?: Array<QuestaoEnquete>;
}
