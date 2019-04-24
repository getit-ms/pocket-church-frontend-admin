import { Component, OnInit } from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {MembroService} from '../../../api/service/membro.service';
import {Membro} from '../../../api/model/membro';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Membro> {

  ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
    'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(
    private mensageria: Mensageria,
    private membroService: MembroService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();

    this.membro.desejaDisponibilizarDados = true;
    this.membro.dadosDisponiveis = true;
    this.membro.endereco = {};
  }

  get membro() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.membroService.detalha(id).toPromise();

    if (!this.entidade.endereco) {
      this.entidade.endereco = {};
    }
  }

  async salvar() {
    if (this.membro.id) {
      await this.membroService.atualiza(this.membro).toPromise();
    } else {
      await this.membroService.cadastra(this.membro).toPromise();
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
