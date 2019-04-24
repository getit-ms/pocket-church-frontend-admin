import {Ministerio} from './ministerio';

export interface Notificacao {
  titulo?: string;
  mensagem?: string;
  apenasMembros?: boolean;
  ministeriosAlvo?: Array<Ministerio>;
}
