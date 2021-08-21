import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ConfiguracaoFlickr} from "../../../api/model/configuracao-flickr";
import {FotoService} from "../../../api/service/foto.service";
import {BuscaPaginada} from "../../../api/model/busca-paginada";
import {GaleriaFoto} from "../../../api/model/galeria-foto";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

    configuracao: ConfiguracaoFlickr = {};
    galerias: BuscaPaginada<GaleriaFoto>;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private dialogService: DialogService,
        private acaoService: AcaoService,
        private mensageria: Mensageria,
        private fotoService: FotoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngAfterViewInit() {
        this.carrega();

        this.activatedRoute.queryParams.subscribe(qp => {
            if (qp.token && qp.verifier) {
                this.configura(qp.token, qp.verifier);
            }
        });
    }

    async carrega() {
        this.configuracao = await this.loader.listen(this.fotoService.buscaConfiguracao()).toPromise();

        if (this.configuracao.configurado) {
            this.galerias = await this.loader.listen(this.fotoService.buscaGalerias(1)).toPromise();
        }
    }

    async vincular() {
        let url = await this.loader.listen(this.fotoService.buscaURL()).toPromise();
        location.href = url.url;
    }

    async desvincular() {
        this.dialogService.confirmacao(
            'mensagens.MSG-054',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao'
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                this.loader.listen(this.fotoService.desativa()).toPromise();

                this.carrega()

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

    private async configura(token: any, verifier: any) {
        await this.loader.listen(this.fotoService.iniciaConfiguracao(token, verifier)).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });

        this.carrega();
    }
}
