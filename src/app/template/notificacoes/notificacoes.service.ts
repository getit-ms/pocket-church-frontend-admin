import { Injectable } from '@angular/core';
import {AcessoService} from "../../api/service/acesso.service";
import {StatusAdmin} from "../../api/model/status-admin";

@Injectable()
export class NotificacoesService {
    private $status: StatusAdmin;

    constructor(
        private acessoService: AcessoService
    ) {}

    async load() {
        this.$status = await this.acessoService.status().toPromise();
    }

    get status() {
      return this.$status;
    }

}
