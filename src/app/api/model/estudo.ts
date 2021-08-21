import {Arquivo} from './arquivo';
import {CategoriaEstudo} from './categoria-estudo';

export interface Estudo {
  id?: number;
  titulo?: string;
  texto?: string;
  data?: Date;
  dataPublicacao?: Date;
  pdf?: Arquivo;
  thumbnail?: Arquivo;
  categoria?: CategoriaEstudo;
  autor?: string;
  divulgado?: boolean;
  agendado?: boolean;
  publicado?: boolean;
  processando?: boolean;
  rejeitado?: boolean;
}
