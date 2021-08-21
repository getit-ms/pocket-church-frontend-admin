import {OpcaoVotacao} from "./opcao-votacao";

export interface QuestaoVotacao {
    id?: number;
    questao?: string;
    quantidadeVotos?: number;
    opcoes?: Array<OpcaoVotacao>;
}