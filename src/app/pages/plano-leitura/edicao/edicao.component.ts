import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {PlanoLeituraService} from "../../../api/service/plano-leitura.service";
import {PlanoLeitura} from "../../../api/model/plano-leitura";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<PlanoLeitura> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private planoLeituraService: PlanoLeituraService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get planoLeitura() {
    return this.entidade;
  }

  protected carregaEntidade(id: any) {
    this.planoLeituraService.detalha(id)
        .subscribe(planoLeitura => {
            this.entidade = planoLeitura;
        });
  }

  async salvar() {
    if (this.planoLeitura.id) {
        await this.planoLeituraService.atualiza(this.planoLeitura).toPromise();
    } else {
        await this.planoLeituraService.cadastra(this.planoLeitura).toPromise();
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
