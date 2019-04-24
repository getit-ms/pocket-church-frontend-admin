import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Membro} from '../../../api/model/membro';
import {MembroService} from '../../../api/service/membro.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  filtro: {
    nome?: string,
    email?: string,
    tamanhoPagina: number
  } = {
    tamanhoPagina: 10
  };
  membros: BuscaPaginada<Membro>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private membroService: MembroService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
    this.filtro.tamanhoPagina = event.tamanhoPagina;

    this.membros = await this.loader.listen(this.membroService.consulta(
      this.filtro.nome,
      this.filtro.email,
      undefined,
      event.pagina,
      this.filtro.tamanhoPagina
    )).toPromise();
  }

  async excluir(membro: Membro) {
    if (membro.membro) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.membro'),
        descricao: membro.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.membroService.remove(membro.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  exportar() {
    this.membroService.exportar();
  }

}
