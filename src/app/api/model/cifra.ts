import {Arquivo} from './arquivo';

export interface Cifra {
  id?: number;
  autor?: string;
  titulo?: string;
  letra?: string;
  status?: 'PROCESSANDO' | 'PUBLICADO' | 'REJEITADO';
  cifra?: Arquivo;
  thumbnail?: Arquivo;
  paginas?: Arquivo;
}
