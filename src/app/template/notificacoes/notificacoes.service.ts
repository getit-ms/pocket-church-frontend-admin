import { Injectable } from '@angular/core';
import {AcessoService} from "../../api/service/acesso.service";
import {StatusAdmin} from "../../api/model/status-admin";

@Injectable()
export class NotificacoesService {
    private $status: StatusAdmin;
    private $count: number;

    constructor(
        private acessoService: AcessoService
    ) {}

    private clear() {
        this.$status = undefined;
        this.$count = undefined;
    }

    async load() {
        this.clear();

        this.$status = await this.acessoService.status().toPromise();

        if (this.$status && this.$status.notificacoes &&
            this.$status.notificacoes.length) {

            this.$count = this.$status.notificacoes
                .map(not => not.count)
                .reduce((s1, s2) => s1 + s2) || undefined;
        } else {
            this.$count = undefined;
        }
    }

    get count() {
        return this.$count;
    }

    get status() {
      return this.$status;
    }

}
