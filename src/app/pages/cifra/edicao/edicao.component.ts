import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {CifraService} from '../../../api/service/cifra.service';
import {Cifra} from '../../../api/model/cifra';
import {LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Cifra> implements AfterViewInit {

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private cifraService: CifraService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get cifra() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.cifraService.detalha(id).toPromise();
  }

  async buscaLetra() {
    if (this.cifra.cifra) {
      const letra = await this.loader.listen(
        this.cifraService.letra(this.cifra.cifra.id)
      ).toPromise();
      this.cifra.letra = letra.letra;
    }
  }

  async salvar() {
    if (this.cifra.id) {
      await this.cifraService.atualiza(this.cifra).toPromise();
    } else {
      await this.cifraService.cadastra(this.cifra).toPromise();
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
