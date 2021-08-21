import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Boletim} from '../../../api/model/boletim';
import {BoletimService} from '../../../api/service/boletim.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  publicacoes: BuscaPaginada<Boletim>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private boletimService: BoletimService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.publicacoes = await this.loader.listen(this.boletimService.consulta(
      'PUBLICACAO',
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(publicacao: Boletim) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.publicacao'),
        descricao: publicacao.titulo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.boletimService.remove(publicacao.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
