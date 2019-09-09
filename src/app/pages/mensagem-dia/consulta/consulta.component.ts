import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {MensagemDiaService} from '../../../api/service/mensagem-dia.service';
import {MensagemDia} from '../../../api/model/mensagem-dia';

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

  mensagens: BuscaPaginada<MensagemDia>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private mensagemDiariaService: MensagemDiaService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
    this.filtro.tamanhoPagina = event.tamanhoPagina;

    this.mensagens = await this.loader.listen(this.mensagemDiariaService.consulta(
      this.filtro.filtro,
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(mensagem: MensagemDia) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.mensagem_dia'),
        descricao: mensagem.mensagem
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.mensagemDiariaService.remove(mensagem.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async habilita(mensagem: MensagemDia) {
    this.acaoService.executa(async () => {
      await this.mensagemDiariaService.habilita(mensagem.id).toPromise();

      mensagem.status = 'HABILITADO';

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }

  async desabilita(mensagem: MensagemDia) {
    this.acaoService.executa(async () => {
      await this.mensagemDiariaService.desabilita(mensagem.id).toPromise();

        mensagem.status = 'DESABILITADO';

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }
}
