import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {VersiculoDiario} from '../../../api/model/versiculo-diario';
import {VotacaoService} from "../../../api/service/votacao.service";
import {Votacao} from "../../../api/model/votacao";

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
    filtro: {
        tamanhoPagina: number
    } = {
        tamanhoPagina: 10
    };

    votacoes: BuscaPaginada<Votacao>;

    @ViewChild(LoaderComponent) loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private votacaoService: VotacaoService
    ) { }

    ngAfterViewInit() {
        this.busca();
    }

    exportar(votacao: Votacao) {
        this.votacaoService.exportarResultado(
            votacao.id,
            votacao.nome
        );
    }

    async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.votacoes = await this.loader.listen(this.votacaoService.consulta(
            event.pagina,
            event.tamanhoPagina
        )).toPromise();
    }

    async excluir(versiculo: VersiculoDiario) {
        this.dialogService.confirmacao(
            'mensagens.MSG-016',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao',
            {
                elemento: this.translateService.instant('global.elemento.votacao'),
                descricao: versiculo.versiculo
            }
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.votacaoService.remove(versiculo.id).toPromise();

                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

}
