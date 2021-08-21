import {Membro} from './membro';

export interface Acesso {
  membro?: Membro;
  auth?: string;
  funcionalidades?: Array<string>;
}
