import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {VersiculoDiario} from '../../../api/model/versiculo-diario';
import {EventoService} from "../../../api/service/evento.service";
import {Evento} from "../../../api/model/evento";

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

    ebds: BuscaPaginada<Evento>;

    @ViewChild(LoaderComponent) loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private eventoService: EventoService
    ) { }

    ngAfterViewInit() {
        this.busca();
    }

    exportarInscricoes() {
        this.eventoService.exportarInscricoes(
            'EBD'
        );
    }

    async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.ebds = await this.loader.listen(this.eventoService.consulta(
            'EBD',
            event.pagina,
            event.tamanhoPagina
        )).toPromise();
    }

    async excluir(ebd: Evento) {
        this.dialogService.confirmacao(
            'mensagens.MSG-016',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao',
            {
                elemento: this.translateService.instant('global.elemento.ebd'),
                descricao: ebd.nome
            }
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.eventoService.remove(ebd.id).toPromise();

                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

}
