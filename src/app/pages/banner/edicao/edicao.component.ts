import {AfterViewInit, Component} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {BannerService} from '../../../api/service/banner.service';
import {Banner} from '../../../api/model/banner';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {AplicativoService} from "../../../api/service/aplicativo.service";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<Banner> implements AfterViewInit {

  funcionalidades: Array<string>;
  referencias: Array<ReferenciaInterna>;

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private aplicativoService: AplicativoService,
    private bannerService: BannerService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  async ngOnInit() {
    super.ngOnInit();

    this.funcionalidades = await this.aplicativoService.buscaFuncionalidadesAtivas().toPromise();
  }

  get banner() {
    return this.entidade;
  }

  protected async carregaEntidade(id: any) {
    this.entidade = await this.bannerService.detalha(id).toPromise();
  }

  async salvar() {
    if (this.banner.id) {
      await this.bannerService.atualiza(this.banner).toPromise();
    } else {
      await this.bannerService.cadastra(this.banner).toPromise();
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

interface ReferenciaInterna {
  label: string,
  id: string,
}
