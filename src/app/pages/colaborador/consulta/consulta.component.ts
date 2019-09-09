import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Colaborador} from '../../../api/model/colaborador';
import {ColaboradorService} from '../../../api/service/colaborador.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {Perfil} from '../../../api/model/perfil';
import {BuscaPaginada} from '../../../api/model/busca-paginada';
import {PerfilService} from '../../../api/service/perfil.service';
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
    perfis?: Array<number>,
    tamanhoPagina: number,
    pendentes: boolean
  } = {
    tamanhoPagina: 10,
    pendentes: false
  };
  colaboradores: BuscaPaginada<Colaborador>;
  perfis: Array<Perfil>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private perfilService: PerfilService,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private colaboradorService: ColaboradorService,
    private notificacoesService: NotificacoesService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngAfterViewInit() {
    this.filtro.pendentes = this.activatedRoute.snapshot.queryParams.pendentes||false;

    this.busca();

    this.perfis = await this.perfilService.consulta().toPromise();
  }

  async busca(event = {pagina: 1, tamanhoPagina: this.filtro.tamanhoPagina}) {
    this.filtro.tamanhoPagina = event.tamanhoPagina;

    this.colaboradores = await this.loader.listen(this.colaboradorService.consulta(
      this.filtro.nome,
      this.filtro.email,
      this.filtro.perfis,
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
          'mensagens.MSG-055',
          'colaborador.confirmacao_aprovacao_cadastro',
          'global.sim',
          'global.nao',
          {
              colaborador: colaborador.nome
          }
      ).subscribe(() => {
          this.acaoService.executa(async () => {
              await this.colaboradorService.aprovaCadastroColaborador(colaborador).toPromise();

              this.notificacoesService.load();

              await this.busca();

              this.mensageria.addMensagem({
                  mensagem: 'mensagens.MSG-001',
                  tipo: TipoMensagem.SUCESSO
              });
          });
      });
  }

  async habilitarColaborador(colaborador: Colaborador) {
    if (colaborador.colaborador) {
      return;
    }

    this.acaoService.executa(async () => {
      await this.colaboradorService.habilitarColaborador(colaborador.id).toPromise();

      colaborador.contato = false;
      colaborador.colaborador = true;

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }

  async desabilitarColaborador(colaborador: Colaborador) {
    if (!colaborador.colaborador) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-019',
      'colaborador.confirmacao_retirada_acesso',
      'global.sim',
      'global.nao',
      {
        colaborador: colaborador.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.colaboradorService.desabilitarColaborador(colaborador.id).toPromise();

        colaborador.colaborador = false;
        colaborador.admin = false;
        colaborador.contato = true;

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async redefinirSenha(colaborador: Colaborador) {
    if (!colaborador.colaborador) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-051',
      'colaborador.confirmacao_redefinicao_senha',
      'global.sim',
      'global.nao',
      {
        colaborador: colaborador.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.colaboradorService.redefineSenha(colaborador.id).toPromise();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async desabilitarAdmin(colaborador: Colaborador) {
    if (!colaborador.admin) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-024',
      'colaborador.confirmacao_retirada_acesso',
      'global.sim',
      'global.nao',
      {
        colaborador: colaborador.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.colaboradorService.desabilitarAdmin(colaborador.id).toPromise();

        colaborador.admin = false;

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }
}
