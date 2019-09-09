import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {EnqueteService} from "../../../api/service/enquete.service";
import {Enquete} from "../../../api/model/enquete";

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

    enquetes: BuscaPaginada<Enquete>;

    @ViewChild(LoaderComponent) loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private dialogService: DialogService,
        private translateService: TranslateService,
        private enqueteService: EnqueteService
    ) { }

    ngAfterViewInit() {
        this.busca();
    }

    exportar(enquete: Enquete) {
        this.enqueteService.exportarResultado(
            enquete.id,
            enquete.nome
        );
    }

    async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.enquetes = await this.loader.listen(this.enqueteService.consulta(
            event.pagina,
            event.tamanhoPagina
        )).toPromise();
    }

    async excluir(enquete: Enquete) {
        this.dialogService.confirmacao(
            'mensagens.MSG-016',
            'global.confirmacao_exclusao',
            'global.sim',
            'global.nao',
            {
                elemento: this.translateService.instant('global.elemento.enquete'),
                descricao: enquete.nome
            }
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.enqueteService.remove(enquete.id).toPromise();

                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

}
