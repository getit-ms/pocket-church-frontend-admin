import {ResultadoQuestao} from "./resultado-questao";

export interface ResultadoEnquete {
    id?: number;
    nome?: string;
    descricao?: string;
    questoes?: Array<ResultadoQuestao>;
}