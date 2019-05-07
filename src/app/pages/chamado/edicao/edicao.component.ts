import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Chamado} from "../../../api/model/chamado";
import {ChamadoService} from "../../../api/service/chamado.service";
import {IgrejasUsuarioService} from "../../../infra/contexto/igrejas-usuario.service";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Chamado> implements AfterViewInit {

    constructor(
        private igrejasUsuarioService: IgrejasUsuarioService,
        private sessaoService: SessaoService,
        private mensageria: Mensageria,
        private chamadoService: ChamadoService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) {
        super();

        this.sessaoService.principal.subscribe(principal => {
            this.chamado.nomeSolicitante = principal.membro.nome;
            this.chamado.emailSolicitante = principal.membro.email;
        });
    }

    get igreja() {
        return this.igrejasUsuarioService.atual.igreja;
    }

    get chamado() {
        return this.entidade;
    }

    protected async carregaEntidade(id: any) {
        this.entidade = await this.chamadoService.detalha(id).toPromise();
    }

    async salvar() {
        await this.chamadoService.cadastra(this.chamado).toPromise();

        await this.router.navigate(['../'], {
            relativeTo: this.activatedRoute
        });

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

}
