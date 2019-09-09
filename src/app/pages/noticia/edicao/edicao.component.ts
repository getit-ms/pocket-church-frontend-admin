import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {NoticiaService} from '../../../api/service/noticia.service';
import {Noticia} from '../../../api/model/noticia';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Noticia> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private noticiaService: NoticiaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();

    this.entidade.tipo = 'NOTICIA';
  }

  get noticia() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();

    const principal = await this.sessaoService.principal.pipe(take(1)).toPromise();

    if (!this.entidade.id) {
      this.entidade.autor = principal.colaborador;
    }
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.noticiaService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.noticia.id) {
      await this.noticiaService.atualiza(this.noticia).toPromise();
    } else {
      await this.noticiaService.cadastra(this.noticia).toPromise();
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
