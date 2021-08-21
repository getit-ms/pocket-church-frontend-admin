import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {VersiculoDiario} from '../../../api/model/versiculo-diario';
import {PlanoLeituraService} from "../../../api/service/plano-leitura.service";
import {PlanoLeitura} from "../../../api/model/plano-leitura";

@Component({
    selector: 'app-consulta',
    templateUrl: './consulta.component.html',
    styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
    filtro: {
        descricao?: string,
        dataInicio?: Date,
        dataTermino?: Date,
        tamanhoPagina: number
    } = {
        dataInicio: new Date(),
        tamanhoPagina: 10
    };

    planosLeitura: BuscaPaginada<PlanoLeitura>;

    @ViewChild(LoaderComponent) loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private planoLeituraService: PlanoLeituraService
    ) { }

    ngAfterViewInit() {
        this.busca();
    }

    async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.planosLeitura = await this.loader.listen(this.planoLeituraService.consulta(
            this.filtro.dataInicio,
            this.filtro.dataTermino,
            this.filtro.descricao,
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
                elemento: this.translateService.instant('global.elemento.plano_leitura'),
                descricao: versiculo.versiculo
            }
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.planoLeituraService.remove(versiculo.id).toPromise();

                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

}
