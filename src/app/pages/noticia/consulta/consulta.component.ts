import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Noticia} from '../../../api/model/noticia';
import {NoticiaService} from '../../../api/service/noticia.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  noticias: BuscaPaginada<Noticia>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private noticiaService: NoticiaService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.noticias = await this.loader.listen(this.noticiaService.consulta(
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(noticia: Noticia) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.noticia'),
        descricao: noticia.titulo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.noticiaService.remove(noticia.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
