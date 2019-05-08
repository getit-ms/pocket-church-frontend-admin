import {Component, OnInit} from '@angular/core';
import {NotificacoesService} from "./notificacoes.service";

@Component({
    selector: 'app-notificacoes',
    templateUrl: './notificacoes.component.html',
    styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {

    constructor(
        private notificacoesService: NotificacoesService
    ) { }

    ngOnInit() {}

    get status() {
      return this.notificacoesService.status;
    }
}
