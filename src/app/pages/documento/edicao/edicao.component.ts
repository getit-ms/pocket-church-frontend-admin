import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {DocumentoService} from '../../../api/service/documento.service';
import {Documento} from '../../../api/model/documento';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {CategoriaDocumento} from '../../../api/model/categoria-documento';
import {SessaoService} from '@gafs/infra-autorizacao';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Documento> implements AfterViewInit {

  categorias: Array<CategoriaDocumento>;

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private documentoService: DocumentoService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get documento() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();

    this.categorias = await this.documentoService.buscaCategorias().toPromise();
    const principal = await this.sessaoService.principal.pipe(take(1)).toPromise();

    if (!this.entidade.id) {
      this.entidade.autor = principal.colaborador.nome;
    }
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.documentoService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.documento.id) {
      await this.documentoService.atualiza(this.documento).toPromise();
    } else {
      await this.documentoService.cadastra(this.documento).toPromise();
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
