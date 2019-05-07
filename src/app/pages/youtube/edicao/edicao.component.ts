import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ActivatedRoute} from "@angular/router";
import {Video} from "../../../api/model/video";
import {YoutubeService} from "../../../api/service/youtube.service";
import {ConfiguracaoYoutube} from "../../../api/model/configuracao-youtube";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

    configuracao: ConfiguracaoYoutube = {};

    videos: Array<Video>;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private dialogService: DialogService,
        private acaoService: AcaoService,
        private mensageria: Mensageria,
        private youtubeService: YoutubeService,
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
        this.configuracao = await this.loader.listen(this.youtubeService.buscaConfiguracao()).toPromise();

        if (this.configuracao.configurado) {
            this.videos = await this.loader.listen(this.youtubeService.buscaVideos()).toPromise();
        }
    }

    async vincular() {
        let url = await this.loader.listen(this.youtubeService.buscaURL()).toPromise();
        location.href = url.url;
    }

    async desvincular() {
        this.dialogService.confirmacao(
            'mensagens.MSG-047',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao'
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                this.loader.listen(this.youtubeService.desativa()).toPromise();

                this.carrega();

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

        this.configuracao = await this.youtubeService.salvaConfiguracao(this.configuracao).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

    private async configura(code: any) {
        await this.loader.listen(this.youtubeService.iniciaConfiguracao(code)).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });

        this.carrega();
    }
}
