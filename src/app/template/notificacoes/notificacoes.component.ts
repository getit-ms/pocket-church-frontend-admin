import {Component, OnInit} from '@angular/core';
import {NotificacoesService} from "./notificacoes.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-notificacoes',
    templateUrl: './notificacoes.component.html',
    styleUrls: ['./notificacoes.component.scss']
})
export class NotificacoesComponent implements OnInit {

    constructor(
        private router: Router,
        private notificacoesService: NotificacoesService
    ) { }

    ngOnInit() {}

    get status() {
      return this.notificacoesService.status;
    }

    get count() {
        return this.notificacoesService.count;
    }

    goto(path: string) {
        this.router.navigateByUrl(path);
    }
}
