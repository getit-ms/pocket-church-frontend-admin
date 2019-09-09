import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {ContatoColaboradorService} from "../../../api/service/contato-colaborador.service";
import {ContatoColaborador} from "../../../api/model/contato-colaborador";
import {NotificacoesService} from "../../../template/notificacoes/notificacoes.service";

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
    filtro: {
        dataInicio?: Date,
        dataTermino?: Date,
        status?: 'PENDENTE' | 'ATENDIDO',
        tamanhoPagina: number;
    } = {
        tamanhoPagina: 10
    };

    contatos: BuscaPaginada<ContatoColaborador>;

    @ViewChild(LoaderComponent) loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private notificacoesService: NotificacoesService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private contatoColaboradorService: ContatoColaboradorService
    ) { }

    ngAfterViewInit() {
        this.busca();
    }

    async busca(event = {pagina: 1, tamanhoPagina: 10}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.contatos = await this.loader.listen(this.contatoColaboradorService.consulta(
            this.filtro.dataInicio,
            this.filtro.dataTermino,
            this.filtro.status ? [this.filtro.status] : undefined,
            event.pagina,
            event.tamanhoPagina
        )).toPromise();
    }

    async atende(contato: ContatoColaborador) {
        this.dialogService.confirmacao(
            'mensagens.MSG-017',
            'contato_colaborador.confirmacao_atendimento',
            'global.sim',
            'global.nao'
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.contatoColaboradorService.atende(contato.id).toPromise();

                this.notificacoesService.load();
                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

}
