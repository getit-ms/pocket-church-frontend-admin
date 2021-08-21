import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EventoService} from "../../../api/service/evento.service";
import {Evento} from "../../../api/model/evento";
import {BuscaPaginada} from "../../../api/model/busca-paginada";
import {InscricaoEvento} from "../../../api/model/inscricao-evento";
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from "@gafs/infra-core";
import {VersiculoDiario} from "../../../api/model/versiculo-diario";

@Component({
    selector: 'app-inscricoes',
    templateUrl: './inscricoes.component.html',
    styleUrls: ['./inscricoes.component.scss']
})
export class InscricoesComponent implements OnInit, AfterViewInit {
    filtro: {
        tamanhoPagina: number
    } = {
        tamanhoPagina: 10
    };

    culto: Evento;

    inscricoes: BuscaPaginada<InscricaoEvento>;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private mensageria: Mensageria,
        private acaoService: AcaoService,
        private dialogService: DialogService,
        private activatedRoute: ActivatedRoute,
        private eventoService: EventoService
    ) { }

    async ngOnInit() {
        this.culto = await this.eventoService.detalha(
            this.activatedRoute.snapshot.params.id
        ).toPromise();
    }

    ngAfterViewInit() {
        this.busca();
    }

    async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
        this.filtro.tamanhoPagina = event.tamanhoPagina;

        this.inscricoes = await this.loader.listen(this.eventoService.inscricoesEvento(
            this.activatedRoute.snapshot.params.id,
            event.pagina,
            event.tamanhoPagina
        )).toPromise();
    }

    async cancelar(inscricao: InscricaoEvento) {
        this.dialogService.confirmacao(
            'mensagens.MSG-045',
            'evento.cancelamento_inscricao',
            'global.sim',
            'global.nao',
            {
                inscrito: inscricao.nomeInscrito
            }
        ).subscribe(() => {
            this.acaoService.executa(async () => {
                await this.eventoService.cancelaInscricao(this.culto.id, inscricao.id).toPromise();

                await this.busca();

                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        });
    }

    exportar(format: string) {
        this.eventoService.exportarInscricoesEvento(
            this.culto.id,
            this.culto.filename,
            format
        );
    }

    async confirmar(inscricao: InscricaoEvento) {
        await this.eventoService.confirmaInscricao(this.culto.id, inscricao.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }
}
