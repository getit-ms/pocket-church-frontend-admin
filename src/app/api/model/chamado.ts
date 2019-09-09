export interface Chamado {
    id?: number;
    descricao?: string;
    dataSolicitacao?: Date;
    nomeSolicitante?: string;
    emailSolicitante?: string;
    status?: 'NOVO' | 'EM_ANALISE' | 'ACEITO' | 'REJEITADO' | 'EM_ATENDIMENTO' | 'CONCLUIDO' | 'CANCELADO';
    dataResposta?: Date;
    dataConclusao?: Date;
}