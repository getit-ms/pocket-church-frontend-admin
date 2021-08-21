import { Component, OnInit } from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {PerfilService} from '../../../api/service/perfil.service';
import {Perfil} from '../../../api/model/perfil';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Perfil> {

  funcionalidades: Array<string>;

  constructor(
    private mensageria: Mensageria,
    private perfilService: PerfilService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();

    this.perfilService.funcionalidades().subscribe(funcs => this.funcionalidades = funcs);
  }

  get perfil() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.perfilService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.perfil.id) {
      await this.perfilService.atualiza(this.perfil).toPromise();
    } else {
      await this.perfilService.cadastra(this.perfil).toPromise();
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
