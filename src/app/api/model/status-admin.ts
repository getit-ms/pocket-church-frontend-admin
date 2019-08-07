import {VersiculoDiario} from './versiculo-diario';

export interface StatusAdmin {
  versiculoDiario?: VersiculoDiario;
  notificacoes?: Array<NotificacaoAdmin>;
}

export interface NotificacaoAdmin {
  mensagem?: string;
  count?: number;
  path?: string;
  args?: {[key: string]: any};
}
