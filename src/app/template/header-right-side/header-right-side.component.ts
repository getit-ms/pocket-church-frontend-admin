import {Component, OnInit} from '@angular/core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Membro} from '../../api/model/membro';
import {ContextoIgreja, IgrejasUsuarioService} from "../../infra/contexto/igrejas-usuario.service";
import {ResumoIgreja} from "../../api/model/resumo-igreja";
import {AcaoService} from "@gafs/infra-core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-right-side',
    templateUrl: './header-right-side.component.html',
    styleUrls: ['./header-right-side.component.scss']
})
export class HeaderRightSideComponent implements OnInit {

    membro: Membro;
    igrejas: ContextoIgreja[];

    constructor(
        private router: Router,
        private igrejasUsuarioService: IgrejasUsuarioService,
        private sessaoService: SessaoService,
        private acaoService: AcaoService
    ) { }

    ngOnInit() {
        this.sessaoService.principal
            .subscribe(acesso => this.membro = acesso.membro);
        this.igrejas = this.igrejasUsuarioService.contextos
            .sort((i1, i2) => i1.igreja.nomeAplicativo
                .localeCompare(i2.igreja.nomeAplicativo));
    }

    get igreja() {
        return this.igrejasUsuarioService.atual;
    }

    logout() {
        this.sessaoService.logout();
    }

    seleciona(igreja: ContextoIgreja) {
        this.acaoService.executa(async () => {
            let sucesso = await this.igrejasUsuarioService.select(igreja.igreja, true);

            if (sucesso) {
                this.router.navigate(['redirect'], {
                    queryParams: {
                        path: ''
                    }
                });
            }
        });
    }
}
