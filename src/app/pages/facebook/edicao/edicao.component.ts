import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ActivatedRoute} from "@angular/router";
import {ConfiguracaoFacebook} from "../../../api/model/configuracao-facebook";
import {PaginaFacebook} from "../../../api/model/pagina-facebook";
import {VideoFacebookService} from "../../../api/service/video-facebook.service";
import {Video} from "../../../api/model/video";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

    configuracao: ConfiguracaoFacebook = {};
    paginas: Array<PaginaFacebook>;

    videos: Array<Video>;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private dialogService: DialogService,
        private acaoService: AcaoService,
        private mensageria: Mensageria,
        private videoFacebookService: VideoFacebookService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngAfterViewInit() {
        this.carrega();

        this.activatedRoute.queryParams.subscribe(qp => {
            if (qp.code) {
                this.configura(qp.code);
            }
        });
    }

    async carrega() {
        this.configuracao = await this.loader.listen(this.videoFacebookService.buscaConfiguracao()).toPromise();

        if (this.configuracao.configurado) {
            this.paginas = await this.loader.listen(this.videoFacebookService.buscaPaginas()).toPromise();
            this.videos = await this.loader.listen(this.videoFacebookService.buscaVideos()).toPromise();
        }
    }

    async vincular() {
        let url = await this.loader.listen(this.videoFacebookService.buscaURL()).toPromise();
        location.href = url.url;
    }

    async desvincular() {
        this.dialogService.confirmacao(
            'mensagens.MSG-053',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao'
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                this.loader.listen(this.videoFacebookService.desativa()).toPromise();

                this.carrega()

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

    async salvar() {
        if (!this.configuracao.configurado) {
            return;
        }

        this.configuracao = await this.videoFacebookService.salvaConfiguracao(this.configuracao).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

    private async configura(code: any) {
        await this.loader.listen(this.videoFacebookService.iniciaConfiguracao(code)).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });

        this.carrega();
    }
}
