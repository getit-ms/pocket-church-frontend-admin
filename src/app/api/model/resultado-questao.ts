import {ResultadoOpcao} from "./resultado-opcao";

export interface ResultadoQuestao {
    questao?: string;
    validos?: Array<ResultadoOpcao>;
    totais?: Array<ResultadoOpcao>;
}