import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpresaService} from "../../../api/service/empresa.service";
import {EmpresasUsuarioService} from "../../../infra/contexto/empresas-usuario.service";
import {ResumoEmpresa} from "../../../api/model/resumo-empresa";
import {ActivatedRoute} from "@angular/router";
import {LoaderComponent} from "@gafs/infra-core";

@Component({
    selector: 'app-download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

    empresa: ResumoEmpresa;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private empresaService: EmpresaService,
        private empresasUsuarioService: EmpresasUsuarioService,
        private activatedRoute: ActivatedRoute,
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

    ngOnInit() {
    }

}
