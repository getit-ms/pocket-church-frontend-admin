import {Arquivo} from "./arquivo";

export interface Banner {
    id?: number;
    ordem?: number;
    banner?: Arquivo;
    linkExterno?: string;
    funcionalidade?: string;
    referenciaInterna?: string;
}
