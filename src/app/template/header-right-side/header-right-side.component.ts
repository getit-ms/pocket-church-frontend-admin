import {Component, OnInit} from '@angular/core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Colaborador} from '../../api/model/colaborador';
import {ContextoEmpresa, EmpresasUsuarioService} from "../../infra/contexto/empresas-usuario.service";
import {ResumoEmpresa} from "../../api/model/resumo-empresa";
import {AcaoService} from "@gafs/infra-core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header-right-side',
    templateUrl: './header-right-side.component.html',
    styleUrls: ['./header-right-side.component.scss']
})
export class HeaderRightSideComponent implements OnInit {

    colaborador: Colaborador;
    empresas: ContextoEmpresa[];

    constructor(
        private router: Router,
        private empresasUsuarioService: EmpresasUsuarioService,
        private sessaoService: SessaoService,
        private acaoService: AcaoService
    ) { }

    ngOnInit() {
        this.sessaoService.principal
            .subscribe(acesso => this.colaborador = acesso.colaborador);
        this.empresas = this.empresasUsuarioService.contextos
            .sort((i1, i2) => i1.empresa.nomeAplicativo
                .localeCompare(i2.empresa.nomeAplicativo));
    }

    get empresa() {
        return this.empresasUsuarioService.atual;
    }

    logout() {
        this.sessaoService.logout();
    }

    seleciona(empresa: ContextoEmpresa) {
        this.acaoService.executa(async () => {
            let sucesso = await this.empresasUsuarioService.select(empresa.empresa, true);

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
