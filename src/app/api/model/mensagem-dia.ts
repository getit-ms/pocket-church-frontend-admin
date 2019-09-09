export interface MensagemDia {
  id?: number;
  mensagem?: string;
  status?: 'HABILITADO' | 'DESABILITADO' | 'ATIVO';
}
