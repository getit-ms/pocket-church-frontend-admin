import { Component, OnInit } from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {MinisterioService} from '../../../api/service/ministerio.service';
import {Ministerio} from '../../../api/model/ministerio';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Ministerio> {

  constructor(
    private mensageria: Mensageria,
    private ministerioService: MinisterioService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get ministerio() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.ministerioService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.ministerio.id) {
      await this.ministerioService.atualiza(this.ministerio).toPromise();
    } else {
      await this.ministerioService.cadastra(this.ministerio).toPromise();
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
