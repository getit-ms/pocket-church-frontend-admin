import {VersiculoDiario} from './versiculo-diario';

export interface StatusAdmin {
  versiculoDiario?: VersiculoDiario;
  notificacoes?: Array<NotificacaoAdmin>;
}

export interface NotificacaoAdmin {
  mensagem?: string;
  args?: {[key: string]: any};
}
