import {Arquivo} from './arquivo';
import {Endereco} from './endereco';
import {LotacaoColaborador} from "./lotacao-colaborador";

export interface Colaborador {
  id?: number;
  nome?: string;
  email?: string;
  dataNascimento?: Date;
  telefones?: string[];
  colaborador?: boolean;
  contato?: boolean;
  admin?: boolean;
  gerente?: boolean;
  visitante?: boolean;
  endereco?: Endereco;
  dadosDisponiveis?: boolean;
  desejaDisponibilizarDados?: boolean;
  foto?: Arquivo;
  senha?: string;
  novaSenha?: string;
  confirmacaoSenha?: string;
  lotacao?: LotacaoColaborador;
}
