export interface BuscaPaginada<T> {
  resultados?: T[];
  totalResultados?: number;
  totalPaginas?: number;
  pagina?: number;
  paginas?: number[];
  hasProxima?: boolean;
  hasAnterior?: boolean;
}
