export interface ContatoColaborador {
    id?: number;
    dataSolicitacao?: Date;
    dataAtendimento?: Date;
    nome?: string;
    email?: string;
    mensagem?: string;
    atendido?: boolean;
    pendente?: boolean;
}
