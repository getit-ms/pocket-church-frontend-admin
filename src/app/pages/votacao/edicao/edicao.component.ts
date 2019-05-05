import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {VotacaoService} from "../../../api/service/votacao.service";
import {Votacao} from "../../../api/model/votacao";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Votacao> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private votacaoService: VotacaoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get votacao() {
    return this.entidade;
  }

  protected carregaEntidade(id: any) {
    this.votacaoService.detalha(id)
        .subscribe(enquete => {
            this.entidade = enquete;
        });
  }

  async salvar() {
    if (this.votacao.id) {
        await this.votacaoService.atualiza(this.votacao).toPromise();
    } else {
        await this.votacaoService.cadastra(this.votacao).toPromise();
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
