import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {ColaboradorService} from '../../../api/service/colaborador.service';
import {Colaborador} from '../../../api/model/colaborador';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {AcessoAdmin} from '../../../api/model/acesso-admin';
import {Perfil} from '../../../api/model/perfil';
import {LotacaoColaborador} from '../../../api/model/lotacao-colaborador';
import {PerfilService} from '../../../api/service/perfil.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Colaborador> implements AfterViewInit{

  acesso: AcessoAdmin = {};

  perfis: Array<Perfil>;
  lotacoes: Array<LotacaoColaborador>;

  constructor(
    private mensageria: Mensageria,
    private perfilService: PerfilService,
    private colaboradorService: ColaboradorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get colaborador() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    this.perfis = await this.perfilService.consulta().toPromise();
    this.lotacoes = await this.colaboradorService.buscaLotacoes().toPromise();
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.colaboradorService.detalha(id).toPromise();

    if (this.entidade.admin) {
      this.acesso = await this.colaboradorService.buscaAdmin(id).toPromise();
    } else {
      this.acesso = {};
    }
  }

  async salvar() {
    await this.colaboradorService.salvaAdmin(this.colaborador.id, this.acesso).toPromise();

    await this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }

}
