import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Estudo} from '../../../api/model/estudo';
import {EstudoService} from '../../../api/service/estudo.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  estudos: BuscaPaginada<Estudo>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private estudoService: EstudoService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.estudos = await this.loader.listen(this.estudoService.consulta(
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(estudo: Estudo) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.estudo'),
        descricao: estudo.titulo
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.estudoService.remove(estudo.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
