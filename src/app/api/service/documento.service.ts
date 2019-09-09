import {Injectable} from '@angular/core';
import {BuscaPaginada} from '../model/busca-paginada';
import {CategoriaDocumento} from '../model/categoria-documento';
import {AbstractApiService} from './api-service.abstract';
import {Documento} from '../model/documento';
import {Observable} from 'rxjs';

@Injectable()
export class DocumentoService extends AbstractApiService {

    consulta(pagina?: number, total?: number): Observable<BuscaPaginada<Documento>> {
        return this.doGet('/documento', {
            params: {
                pagina: pagina ? [`${pagina}`] : [],
                total: total ? [`${total}`] : []
            }
        });
    }

    buscaCategorias(): Observable<Array<CategoriaDocumento>> {
        return this.doGet(`/documento/categoria`);
    }

    cadastraCategorias(categoria: CategoriaDocumento): Observable<CategoriaDocumento> {
        return this.doPost(`/documento/categoria`, categoria);
    }

    detalha(id: number): Observable<Documento> {
        return this.doGet(`/documento/${id}`);
    }

    remove(id: number): Observable<Documento> {
        return this.doDelete(`/documento/${id}`);
    }

    cadastra(entidade: Documento): Observable<Documento> {
        return this.doPost('/documento', entidade);
    }

    atualiza(entidade: Documento): Observable<Documento> {
        return this.doPut('/documento', entidade);
    }
}
