import {Arquivo} from './arquivo';
import {Endereco} from './endereco';

export interface Membro {
  id?: number;
  nome?: string;
  email?: string;
  dataNascimento?: Date;
  telefones?: string[];
  membro?: boolean;
  contato?: boolean;
  admin?: boolean;
  pastor?: boolean;
  visitante?: boolean;
  endereco?: Endereco;
  dadosDisponiveis?: boolean;
  desejaDisponibilizarDados?: boolean;
  foto?: Arquivo;
  senha?: string;
  novaSenha?: string;
  confirmacaoSenha?: string;
}
