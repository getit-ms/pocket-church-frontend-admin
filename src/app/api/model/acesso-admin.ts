import {Perfil} from './perfil';
import {Ministerio} from './ministerio';

export interface AcessoAdmin {
  perfis?: Array<Perfil>;
  ministerios?: Array<Ministerio>;
}
