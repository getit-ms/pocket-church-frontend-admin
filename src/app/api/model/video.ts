export interface Video {
    id?: string;
    titulo?: string;
    descricao?: string;
    thumbnail?: string;
    publicacao?: Date;
    agendamento?: Date;
    aoVivo?: boolean;
    streamUrl?: string;
    agendado?: boolean;
}
