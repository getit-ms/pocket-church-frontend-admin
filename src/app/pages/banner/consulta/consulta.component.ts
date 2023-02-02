import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Banner} from '../../../api/model/banner';
import {BannerService} from '../../../api/service/banner.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  banners: Array<Banner>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private bannerService: BannerService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca() {
    this.banners = await this.loader.listen(this.bannerService.consulta()).toPromise();
  }

  async excluir(banner: Banner) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.banner'),
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.bannerService.remove(banner.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
