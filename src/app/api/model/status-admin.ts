import {MensagemDia} from './mensagem-dia';

export interface StatusAdmin {
  mensagemDiaria?: MensagemDia;
  notificacoes?: Array<NotificacaoAdmin>;
}

export interface NotificacaoAdmin {
  mensagem?: string;
  count?: number;
  path?: string;
  args?: {[key: string]: any};
}
