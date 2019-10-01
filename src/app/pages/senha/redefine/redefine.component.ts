import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AcessoService} from "../../../api/service/acesso.service";
import {ResumoEmpresa} from "../../../api/model/resumo-empresa";
import {EmpresaService} from "../../../api/service/empresa.service";
import {LoaderComponent} from "@gafs/infra-core";
import {Colaborador} from "../../../api/model/colaborador";
import {EmpresasUsuarioService} from "../../../infra/contexto/empresas-usuario.service";

@Component({
    selector: 'app-redefine',
    templateUrl: './redefine.component.html',
    styleUrls: ['./redefine.component.scss'],
})
export class RedefineComponent implements AfterViewInit {

    empresa: ResumoEmpresa;
    colaborador: Colaborador;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private empresaService: EmpresaService,
        private empresasUsuarioService: EmpresasUsuarioService,
        private activatedRoute: ActivatedRoute,
        private acessoService: AcessoService
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (params.empresa) {
                this.buscaEmpresa(params.empresa);
            }
        });
    }

    private async buscaEmpresa(chave: string) {
        this.empresa = await this.empresaService.busca(chave).toPromise();

        await this.empresasUsuarioService.applyMetadata(this.empresa);
    }

    async ngAfterViewInit() {
        let token = this.activatedRoute.snapshot.params.token;

        this.colaborador = await this.loader.listen(
            this.acessoService.redefinirSenha(token)
        ).toPromise();
    }

    fechar() {
      window.close();
    }
}
