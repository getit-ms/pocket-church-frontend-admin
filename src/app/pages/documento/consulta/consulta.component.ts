import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Documento} from '../../../api/model/documento';
import {DocumentoService} from '../../../api/service/documento.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  documentos: BuscaPaginada<Documento>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private documentoService: DocumentoService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.documentos = await this.loader.listen(this.documentoService.consulta(
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(documento: Documento) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.documento'),
        descricao: documento.titulo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.documentoService.remove(documento.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
