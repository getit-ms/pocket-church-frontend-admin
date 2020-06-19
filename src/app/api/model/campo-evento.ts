export enum TipoCampoEvento {
    TEXTO = 'TEXTO',
    DATA = 'DATA',
    NUMERO = 'NUMERO',
    MULTIPLA_ESCOLHA = 'MULTIPLA_ESCOLHA',
    ANEXO = 'ANEXO'
}

export enum FormatoCampoEvento {
    NENHUM = 'NENHUM',

    // texto
    CEP = 'CEP',
    CPF_CNPJ = 'CPF_CNPJ',
    TELEFONE = 'TELEFONE',

    // numérico
    NUMERO_INTEIRO = 'NUMERO_INTEIRO',
    NUMERO_REAL = 'NUMERO_REAL',
    MONETARIO = 'MONETARIO',

    // anexo
    IMAGEM = 'IMAGEM',
}

export enum TipoValidacaoCampo {
    OBRIGATORIO = 'OBRIGATORIO',
    COMPRIMENTO_MINIMO = 'COMPRIMENTO_MINIMO',
    COMPRIMENTO_MAXIMO = 'COMPRIMENTO_MAXIMO',
    VALOR_MINIMO = 'VALOR_MINIMO',
    VALOR_MAXIMO = 'VALOR_MAXIMO',
    EMAIL = 'EMAIL',
    CPF_CNPJ = 'CPF_CNPJ',
}

export interface CampoEvento {
    id?: number;
    nome?: string;
    tipo?: TipoCampoEvento;
    formato?: FormatoCampoEvento;
    opcoes?: Array<string>;
    validacao?: any;
}
