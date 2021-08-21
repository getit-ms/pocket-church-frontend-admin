import {Arquivo} from './arquivo';

export interface Template {
  corPrincipal?: string;
  logoPequena?: Arquivo;
  logoGrande?: Arquivo;
  banner?: Arquivo;
  logoResposts?: Arquivo;
}
