import {Colaborador} from "./colaborador";

export interface InscricaoEvento {
    id?: number;
    colaborador?: Colaborador;
    nomeInscrito?: string;
    emailInscrito?: string;
    telefoneInscrito?: string;
    data?: Date;
    confirmada?: boolean;
    pendente?: boolean;
}
