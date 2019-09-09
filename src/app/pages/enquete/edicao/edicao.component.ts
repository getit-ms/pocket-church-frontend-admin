import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {EnqueteService} from "../../../api/service/enquete.service";
import {Enquete} from "../../../api/model/enquete";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Enquete> implements AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private enqueteService: EnqueteService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  get enquete() {
    return this.entidade;
  }

  protected carregaEntidade(id: any) {
    this.enqueteService.detalha(id)
        .subscribe(enquete => {
            this.entidade = enquete;
        });
  }

  async salvar() {
    if (this.enquete.id) {
        await this.enqueteService.atualiza(this.enquete).toPromise();
    } else {
        await this.enqueteService.cadastra(this.enquete).toPromise();
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
