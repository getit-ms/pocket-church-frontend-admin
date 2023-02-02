import {Injectable} from '@angular/core';
import {AbstractApiService} from "./api-service.abstract";
import {Observable} from "rxjs";
import {Banner} from "../model/banner";

@Injectable()
export class BannerService extends AbstractApiService {

    consulta(): Observable<Array<Banner>> {
        return this.doGet('/banner');
    }

    detalha(id: number): Observable<Banner> {
        return this.doGet(`/banner/${id}`);
    }

    remove(id: number): Observable<Banner> {
        return this.doDelete(`/banner/${id}`);
    }

    cadastra(entidade: Banner): Observable<Banner> {
        return this.doPost('/banner', entidade);
    }

    atualiza(entidade: Banner): Observable<Banner> {
        return this.doPut('/banner', entidade);
    }
}
