import {Colaborador} from './colaborador';

export interface Acesso {
  colaborador?: Colaborador;
  auth?: string;
  funcionalidades?: Array<string>;
}
