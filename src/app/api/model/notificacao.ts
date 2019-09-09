import {LotacaoColaborador} from "./lotacao-colaborador";

export interface Notificacao {
    titulo?: string;
    mensagem?: string;
    apenasGerentes?: boolean;
    lotacoes?: Array<LotacaoColaborador>;
}
