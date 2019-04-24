import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {MembroService} from '../../../api/service/membro.service';
import {Membro} from '../../../api/model/membro';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {AcessoAdmin} from '../../../api/model/acesso-admin';
import {Perfil} from '../../../api/model/perfil';
import {Ministerio} from '../../../api/model/ministerio';
import {PerfilService} from '../../../api/service/perfil.service';
import {MinisterioService} from '../../../api/service/ministerio.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Membro> implements AfterViewInit{

  acesso: AcessoAdmin = {};

  exigeMinisterios: boolean;
  perfis: Array<Perfil>;
  ministerios: Array<Ministerio>;

  constructor(
    private mensageria: Mensageria,
    private perfilService: PerfilService,
    private ministerioService: MinisterioService,
    private membroService: MembroService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get membro() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    this.perfis = await this.perfilService.consulta().toPromise();
    this.ministerios = await this.ministerioService.consulta().toPromise();
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.membroService.detalha(id).toPromise();

    if (this.entidade.admin) {
      this.acesso = await this.membroService.buscaAdmin(id).toPromise();
    } else {
      this.acesso = {};
    }

    this.checkExigeMinisterio();
  }

  checkExigeMinisterio() {
    this.exigeMinisterios = !!this.acesso && !!this.acesso.perfis &&
      !!this.acesso.perfis.find(p => p.exigeMinisterios);
  }

  async salvar() {
    await this.membroService.salvaAdmin(this.membro.id, this.acesso).toPromise();

    await this.router.navigate(['../'], {
      relativeTo: this.activatedRoute
    });

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }

}
