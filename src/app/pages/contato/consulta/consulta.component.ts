import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Colaborador} from '../../../api/model/colaborador';
import {ColaboradorService} from '../../../api/service/colaborador.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {NotificacoesService} from "../../../template/notificacoes/notificacoes.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  filtro: {
    nome?: string,
    email?: string,
    tamanhoPagina: number,
    pendentes: boolean
  } = {
    tamanhoPagina: 10,
    pendentes: false
  };
  colaboradores: BuscaPaginada<Colaborador>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private colaboradorService: ColaboradorService,
    private notificacoesService: NotificacoesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngAfterViewInit() {
    this.filtro.pendentes = this.activatedRoute.snapshot.queryParams.pendentes||false;

    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
    this.filtro.tamanhoPagina = event.tamanhoPagina;

    this.colaboradores = await this.loader.listen(this.colaboradorService.consulta(
      this.filtro.nome,
      this.filtro.email,
      undefined,
      undefined,
      event.pagina,
      this.filtro.tamanhoPagina,
      this.filtro.pendentes
    )).toPromise();
  }

  async rejeitaCadastro(colaborador: Colaborador) {
      this.dialogService.confirmacao(
          'mensagens.MSG-057',
          'colaborador.confirmacao_rejeicao_cadastro',
          'global.sim',
          'global.nao',
          {
              colaborador: colaborador.nome
          }
      ).subscribe(() => {
          this.acaoService.executa(async () => {
              await this.colaboradorService.rejeitaCadastroColaborador(colaborador).toPromise();

              this.notificacoesService.load();

              await this.busca();

              this.mensageria.addMensagem({
                  mensagem: 'mensagens.MSG-001',
                  tipo: TipoMensagem.SUCESSO
              });
          });
      });
  }

  async aprovaCadastro(colaborador: Colaborador) {
      this.dialogService.confirmacao(
          'mensagens.MSG-056',
          'colaborador.confirmacao_aprovacao_cadastro',
          'global.sim',
          'global.nao',
          {
              colaborador: colaborador.nome
          }
      ).subscribe(() => {
          this.acaoService.executa(async () => {
              await this.colaboradorService.aprovaCadastroContato(colaborador).toPromise();

              this.notificacoesService.load();

              await this.busca();

              this.mensageria.addMensagem({
                  mensagem: 'mensagens.MSG-001',
                  tipo: TipoMensagem.SUCESSO
              });
          });
      });
  }

  async excluir(colaborador: Colaborador) {
    if (colaborador.colaborador) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.colaborador'),
        descricao: colaborador.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.colaboradorService.remove(colaborador.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  exportar() {
    this.colaboradorService.exportar();
  }

}
