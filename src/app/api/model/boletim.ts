import {Arquivo} from './arquivo';

export interface Boletim {
  id?: number;
  titulo?: string;
  data?: Date;
  dataPublicacao?: Date;
  divulgado?: boolean;
  tipo?: 'BOLETIM' | 'PUBLICACAO';
  status?: 'PROCESSANDO' | 'PUBLICADO' | 'REJEITADO';
  boletim?: Arquivo;
  thumbnail?: Arquivo;
  paginas?: Array<Arquivo>;

  agendado?: boolean;
  publicado?: boolean;
  processando?: boolean;
  rejeitado?: boolean;
}
