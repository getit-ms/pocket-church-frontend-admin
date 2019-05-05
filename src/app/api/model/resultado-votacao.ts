import {ResultadoQuestao} from "./resultado-questao";

export interface ResultadoVotacao {
    id?: number;
    nome?: string;
    descricao?: string;
    questoes?: Array<ResultadoQuestao>;
}