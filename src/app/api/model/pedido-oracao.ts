export interface PedidoOracao {
    id?: number;
    dataSolicitacao?: Date;
    dataAtendimento?: Date;
    nome?: string;
    email?: string;
    pedido?: string;
    atendido?: boolean;
    pendente?: boolean;
}
