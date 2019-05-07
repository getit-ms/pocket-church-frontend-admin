import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ActivatedRoute} from "@angular/router";
import {CalendarioGoogle} from "../../../api/model/calendario-google";
import {Evento} from "../../../api/model/evento";
import {ConfiguracaoCalendario} from "../../../api/model/configuracao-calendario";
import {CalendarioService} from "../../../api/service/calendario.service";
import {BuscaPaginadaEventos} from "../../../api/model/busca-paginada-eventos";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

    configuracao: ConfiguracaoCalendario = {};
    calendarios: Array<CalendarioGoogle>;

    eventos: BuscaPaginadaEventos;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private dialogService: DialogService,
        private acaoService: AcaoService,
        private mensageria: Mensageria,
        private calendarioService: CalendarioService,
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
        this.configuracao = await this.loader.listen(this.calendarioService.buscaConfiguracao()).toPromise();

        if (this.configuracao.configurado) {
            this.calendarios = await this.loader.listen(this.calendarioService.buscaVisoes()).toPromise();
            this.eventos = await this.loader.listen(this.calendarioService.buscaEventos()).toPromise();
        }
    }

    async vincular() {
        let url = await this.loader.listen(this.calendarioService.buscaURL()).toPromise();
        location.href = url.url;
    }

    async desvincular() {
        this.dialogService.confirmacao(
            'mensagens.MSG-050',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao'
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                this.loader.listen(this.calendarioService.desativa()).toPromise();

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

        this.configuracao = await this.calendarioService.salvaConfiguracao(this.configuracao).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

    private async configura(code: any) {
        await this.loader.listen(this.calendarioService.iniciaConfiguracao(code)).toPromise();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });

        this.carrega();
    }
}
