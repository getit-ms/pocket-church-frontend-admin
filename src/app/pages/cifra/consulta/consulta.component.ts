import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Cifra} from '../../../api/model/cifra';
import {CifraService} from '../../../api/service/cifra.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  cifras: BuscaPaginada<Cifra>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private cifraService: CifraService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.cifras = await this.loader.listen(this.cifraService.consulta(
      'CIFRA',
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(cifra: Cifra) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.cifra'),
        descricao: cifra.titulo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.cifraService.remove(cifra.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
