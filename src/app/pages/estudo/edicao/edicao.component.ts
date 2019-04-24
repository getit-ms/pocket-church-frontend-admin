import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {EstudoService} from '../../../api/service/estudo.service';
import {Estudo} from '../../../api/model/estudo';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {CategoriaEstudo} from '../../../api/model/categoria-estudo';
import {SessaoService} from '@gafs/infra-autorizacao';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Estudo> implements AfterViewInit {

  categorias: Array<CategoriaEstudo>;

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private estudoService: EstudoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get estudo() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();

    this.categorias = await this.estudoService.buscaCategorias().toPromise();
    const principal = await this.sessaoService.principal.pipe(take(1)).toPromise();

    if (!this.entidade.id) {
      this.entidade.autor = principal.membro.nome;
    }
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.estudoService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.estudo.id) {
      await this.estudoService.atualiza(this.estudo).toPromise();
    } else {
      await this.estudoService.cadastra(this.estudo).toPromise();
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
