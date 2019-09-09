import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {AudioService} from '../../../api/service/audio.service';
import {Audio} from '../../../api/model/audio';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {CategoriaAudio} from '../../../api/model/categoria-audio';
import {SessaoService} from '@gafs/infra-autorizacao';
import {take} from 'rxjs/internal/operators';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Audio> implements AfterViewInit {

  categorias: Array<CategoriaAudio>;

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private audioService: AudioService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get audio() {
    return this.entidade;
  }

  async ngAfterViewInit() {
    super.ngAfterViewInit();

    this.categorias = await this.audioService.buscaCategorias().toPromise();
    const principal = await this.sessaoService.principal.pipe(take(1)).toPromise();

    if (!this.entidade.id) {
      this.entidade.autor = principal.colaborador.nome;
    }
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.audioService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.audio.id) {
      await this.audioService.atualiza(this.audio).toPromise();
    } else {
      await this.audioService.cadastra(this.audio).toPromise();
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
