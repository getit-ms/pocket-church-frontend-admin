import {Component, OnInit} from '@angular/core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Membro} from '../../api/model/membro';
import {ContextoIgreja, IgrejasUsuarioService} from "../../infra/contexto/igrejas-usuario.service";
import {ResumoIgreja} from "../../api/model/resumo-igreja";

@Component({
    selector: 'app-header-right-side',
    templateUrl: './header-right-side.component.html',
    styleUrls: ['./header-right-side.component.scss']
})
export class HeaderRightSideComponent implements OnInit {

    membro: Membro;

    constructor(
        private igrejasUsuarioService: IgrejasUsuarioService,
        private sessaoService: SessaoService
    ) { }

    ngOnInit() {
        this.sessaoService.principal
            .subscribe(acesso => this.membro = acesso.membro);
    }

    get igreja() {
        return this.igrejasUsuarioService.atual;
    }

    get igrejas() {
        return this.igrejasUsuarioService.contextos;
    }

    logout() {
        this.sessaoService.logout();
    }

    seleciona(igreja: ContextoIgreja) {
        this.igrejasUsuarioService.select(igreja.igreja, true);
    }
}
