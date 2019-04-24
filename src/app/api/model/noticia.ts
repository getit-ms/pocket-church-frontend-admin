import {Membro} from './membro';

export interface Noticia {
  id?: number;
  dataPublicacao?: Date;
  titulo?: string;
  texto?: string;
  ilustracao?: string;
  autor?: Membro;
}
