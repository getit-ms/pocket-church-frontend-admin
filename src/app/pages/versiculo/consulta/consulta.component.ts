import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {VersiculoService} from '../../../api/service/versiculo.service';
import {VersiculoDiario} from '../../../api/model/versiculo-diario';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  filtro: {
    filtro?: string,
    tamanhoPagina?: number
  } = {
    tamanhoPagina: 10
  };

  versiculos: BuscaPaginada<VersiculoDiario>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private versiculoService: VersiculoService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
    this.filtro.tamanhoPagina = event.tamanhoPagina;

    this.versiculos = await this.loader.listen(this.versiculoService.consulta(
      this.filtro.filtro,
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(versiculo: VersiculoDiario) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.versiculo'),
        descricao: versiculo.versiculo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.versiculoService.remove(versiculo.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async habilita(versiculo: VersiculoDiario) {
    this.acaoService.executa(async () => {
      await this.versiculoService.habilita(versiculo.id).toPromise();

      versiculo.status = 'HABILITADO';

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }

  async desabilita(versiculo: VersiculoDiario) {
    this.acaoService.executa(async () => {
      await this.versiculoService.desabilita(versiculo.id).toPromise();

      versiculo.status = 'DESABILITADO';

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }
}
