import {Membro} from "./membro";
import {Arquivo} from "./arquivo";
import {FormatoCampoEvento} from "./campo-evento";

export interface ValorInscricaoEvento {
    nome?: string;
    formato?: FormatoCampoEvento;
    valorTexto: string;
    valorNumero: any;
    valorData: Date;
    valorAnexo: Arquivo;
}

export interface InscricaoEvento {
    id?: number;
    membro?: Membro;
    nomeInscrito?: string;
    emailInscrito?: string;
    telefoneInscrito?: string;
    data?: Date;
    confirmada?: boolean;
    pendente?: boolean;
    valores?: Array<ValorInscricaoEvento>;
}
