import {Component, OnInit} from '@angular/core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Membro} from '../../api/model/membro';

@Component({
    selector: 'app-header-right-side',
    templateUrl: './header-right-side.component.html',
    styleUrls: ['./header-right-side.component.scss']
})
export class HeaderRightSideComponent implements OnInit {

    membro: Membro;

    constructor(
        private sessaoService: SessaoService
    ) { }

    ngOnInit() {
        this.sessaoService.principal
            .subscribe(acesso => this.membro = acesso.membro);
    }

    logout() {
        this.sessaoService.logout();
    }
}
