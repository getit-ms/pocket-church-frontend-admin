import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {BoletimService} from '../../../api/service/boletim.service';
import {Boletim} from '../../../api/model/boletim';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Boletim> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private boletimService: BoletimService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();

      this.boletim.tipo = 'BOLETIM';
  }

  get boletim() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.boletimService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.boletim.id) {
      await this.boletimService.atualiza(this.boletim).toPromise();
    } else {
      await this.boletimService.cadastra(this.boletim).toPromise();
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
