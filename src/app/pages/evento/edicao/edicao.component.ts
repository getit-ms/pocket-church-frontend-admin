import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {EventoService} from "../../../api/service/evento.service";
import {Evento} from "../../../api/model/evento";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Evento> implements AfterViewInit {

    constructor(
        private sessaoService: SessaoService,
        private mensageria: Mensageria,
        private eventoService: EventoService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) {
        super();

        this.entidade.tipo = 'EVENTO';
    }

    get evento() {
        return this.entidade;
    }

    protected carregaEntidade(id: any) {
        this.eventoService.detalha(id)
            .subscribe(evento => {
                this.entidade = evento;

                if (this.activatedRoute.snapshot.data.copy) {
                    this.entidade.id = undefined;
                }
            });
    }

    async salvar() {
        if (this.evento.id) {
            await this.eventoService.atualiza(this.evento).toPromise();
        } else {
            await this.eventoService.cadastra(this.evento).toPromise();
        }

        await this.router.navigate(['../'], {
            relativeTo: this.activatedRoute
        });

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

}
