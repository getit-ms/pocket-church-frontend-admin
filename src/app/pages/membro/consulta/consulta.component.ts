import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Membro} from '../../../api/model/membro';
import {MembroService} from '../../../api/service/membro.service';
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
  membros: BuscaPaginada<Membro>;
  perfis: Array<Perfil>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private perfilService: PerfilService,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private membroService: MembroService,
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

    this.membros = await this.loader.listen(this.membroService.consulta(
      this.filtro.nome,
      this.filtro.email,
      this.filtro.perfis,
      event.pagina,
      this.filtro.tamanhoPagina,
      this.filtro.pendentes
    )).toPromise();
  }

  async rejeitaCadastro(membro: Membro) {
      this.dialogService.confirmacao(
          'mensagens.MSG-057',
          'membro.confirmacao_rejeicao_cadastro',
          'global.sim',
          'global.nao',
          {
              membro: membro.nome
          }
      ).subscribe(() => {
          this.acaoService.executa(async () => {
              await this.membroService.rejeitaCadastroMembro(membro).toPromise();

              this.notificacoesService.load();

              await this.busca();

              this.mensageria.addMensagem({
                  mensagem: 'mensagens.MSG-001',
                  tipo: TipoMensagem.SUCESSO
              });
          });
      });
  }

  async aprovaCadastro(membro: Membro) {
      this.dialogService.confirmacao(
          'mensagens.MSG-055',
          'membro.confirmacao_aprovacao_cadastro',
          'global.sim',
          'global.nao',
          {
              membro: membro.nome
          }
      ).subscribe(() => {
          this.acaoService.executa(async () => {
              await this.membroService.aprovaCadastroMembro(membro).toPromise();

              this.notificacoesService.load();

              await this.busca();

              this.mensageria.addMensagem({
                  mensagem: 'mensagens.MSG-001',
                  tipo: TipoMensagem.SUCESSO
              });
          });
      });
  }

  async habilitarMembro(membro: Membro) {
    if (membro.membro) {
      return;
    }

    this.acaoService.executa(async () => {
      await this.membroService.habilitarMembro(membro.id).toPromise();

      membro.contato = false;
      membro.membro = true;

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }

  async desabilitarMembro(membro: Membro) {
    if (!membro.membro) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-019',
      'membro.confirmacao_retirada_acesso',
      'global.sim',
      'global.nao',
      {
        membro: membro.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.membroService.desabilitarMembro(membro.id).toPromise();

        membro.membro = false;
        membro.admin = false;
        membro.contato = true;

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async redefinirSenha(membro: Membro) {
    if (!membro.membro) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-051',
      'membro.confirmacao_redefinicao_senha',
      'global.sim',
      'global.nao',
      {
        membro: membro.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.membroService.redefineSenha(membro.id).toPromise();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

  async desabilitarAdmin(membro: Membro) {
    if (!membro.admin) {
      return;
    }

    this.dialogService.confirmacao(
      'mensagens.MSG-024',
      'membro.confirmacao_retirada_acesso',
      'global.sim',
      'global.nao',
      {
        membro: membro.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.membroService.desabilitarAdmin(membro.id).toPromise();

        membro.admin = false;

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }
}
