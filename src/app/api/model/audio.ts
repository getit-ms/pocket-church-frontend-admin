import {Arquivo} from './arquivo';
import {CategoriaAudio} from './categoria-audio';

export interface Audio {
  id?: number;
  nome?: string;
  autoria?: string;
  descricao?: string;
  categoria?: CategoriaAudio;
  tipo?: 'LOCAL';
  tamanhoArquivo?: number;
  tempoAudio?: number;
  capa?: Arquivo;
  audio?: Arquivo;
}
