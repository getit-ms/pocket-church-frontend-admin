import {Colaborador} from './colaborador';

export interface Noticia {
    id?: number;
    tipo?: 'NOTICIA' | 'CLASSIFICADOS';
    dataPublicacao?: Date;
    titulo?: string;
    texto?: string;
    ilustracao?: string;
    autor?: Colaborador;
}
