import {Arquivo} from './arquivo';

export interface DiaDevocionario {
  id?: number;
  data?: Date;
  divulgado?: boolean;
  status?: 'PROCESSANDO' | 'PUBLICADO' | 'REJEITADO';
  arquivo?: Arquivo;
  thumbnail?: Arquivo;

  publicado?: boolean;
  processando?: boolean;
  rejeitado?: boolean;
}
