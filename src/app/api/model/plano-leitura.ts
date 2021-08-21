import {DiaPlanoLeitura} from "./dia-plano-leitura";

export interface PlanoLeitura {
    id?: number;
    descricao?: string;
    dataInicio?: Date;
    dataTermino?: Date;
    dias?: Array<DiaPlanoLeitura>;
}
