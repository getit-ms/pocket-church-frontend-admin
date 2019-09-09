import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {MensagemDiaService} from '../../../api/service/mensagem-dia.service';
import {MensagemDia} from '../../../api/model/mensagem-dia';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<MensagemDia> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private mensagemDiariaService: MensagemDiaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get mensagem() {
    return this.entidade;
  }

  protected carregaEntidade(id: any) {  }

  async salvar() {
    await this.mensagemDiariaService.cadastra(this.mensagem).toPromise();

    await this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }

}
