import { Component, OnInit } from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {ColaboradorService} from '../../../api/service/colaborador.service';
import {Colaborador} from '../../../api/model/colaborador';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Colaborador> {

  ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
    'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

  constructor(
    private mensageria: Mensageria,
    private colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();

    this.colaborador.desejaDisponibilizarDados = true;
    this.colaborador.dadosDisponiveis = true;
    this.colaborador.endereco = {};
  }

  get colaborador() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.colaboradorService.detalha(id).toPromise();

    if (!this.entidade.endereco) {
      this.entidade.endereco = {};
    }
  }

  async salvar() {
    if (this.colaborador.id) {
      await this.colaboradorService.atualiza(this.colaborador).toPromise();
    } else {
      await this.colaboradorService.cadastra(this.colaborador).toPromise();
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
