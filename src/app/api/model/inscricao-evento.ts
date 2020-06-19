import {Membro} from "./membro";

export interface InscricaoEvento {
    id?: number;
    membro?: Membro;
    nomeInscrito?: string;
    emailInscrito?: string;
    telefoneInscrito?: string;
    data?: Date;
    confirmada?: boolean;
    pendente?: boolean;
    valores?: { [key: string]: string };
}
