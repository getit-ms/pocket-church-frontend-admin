import {Foto} from "./foto";

export interface GaleriaFoto {
    id?: string;
    nome?: string;
    descricao?: string;
    dataAtulizacao?: Date;
    fotoPrimaria?: Foto;
    quantidadeFotos?: number;
}
