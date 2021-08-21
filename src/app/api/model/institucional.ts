import {Arquivo} from './arquivo';
import {Endereco} from './endereco';

export interface Institucional {
  quemSomos?: string;
  email?: string;
  site?: string;
  redesSociais?: {[key: string]: string};
  divulgacao?: Arquivo;
  textoDivulgacao?: string;
  telefones?: string[];
  enderecos?: Endereco[];
}
