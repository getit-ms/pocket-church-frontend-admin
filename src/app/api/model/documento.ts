import {Arquivo} from './arquivo';
import {CategoriaDocumento} from './categoria-documento';

export interface Documento {
  id?: number;
  titulo?: string;
  texto?: string;
  data?: Date;
  dataPublicacao?: Date;
  pdf?: Arquivo;
  thumbnail?: Arquivo;
  categoria?: CategoriaDocumento;
  autor?: string;
  divulgado?: boolean;
  agendado?: boolean;
  publicado?: boolean;
  processando?: boolean;
  rejeitado?: boolean;
}
