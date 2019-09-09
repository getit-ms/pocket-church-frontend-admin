import {OpcaoEnquete} from "./opcao-enquete";

export interface QuestaoEnquete {
    id?: number;
    questao?: string;
    quantidadeVotos?: number;
    opcoes?: Array<OpcaoEnquete>;
}