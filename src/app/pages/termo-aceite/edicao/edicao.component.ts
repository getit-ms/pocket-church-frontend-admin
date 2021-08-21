import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {BoletimService} from '../../../api/service/boletim.service';
import {Boletim} from '../../../api/model/boletim';
import {AcaoService, DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {TermoAceiteService} from "../../../api/service/termo-aceite.service";
import {TermoAceite} from "../../../api/model/termo-aceite";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<TermoAceite> implements OnInit, AfterViewInit {

  constructor(
    private sessaoService: SessaoService,
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private termoAceiteService: TermoAceiteService,
    protected activatedRoute: ActivatedRoute,
    private dialogService: DialogService,
    protected router: Router,
  ) {
    super();

    this.entidade.termo = '';
  }

  get edicao(): boolean {
    return true;
  }

  get termoAceite(): TermoAceite {
    return this.entidade;
  }

  ngOnInit() {
    this.termoAceiteService.buscaAtual()
        .subscribe(termo => this.entidade = termo);
  }

  protected async carregaEntidade(id: any) {
    return null;
  }

  async salvar() {
    if (this.termoAceite.id) {
      await this.termoAceiteService.atualiza(this.termoAceite).toPromise();
    } else {
      await this.termoAceiteService.cadastra(this.termoAceite).toPromise();
    }

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }

  salvarExigeNovoAceite() {
    this.dialogService.confirmacao('mensagens.MSG-062')
        .subscribe(async confirmado => {
          if (confirmado) {
            this.acaoService.executa(async () => {
              await this.termoAceiteService.cadastra(this.termoAceite).toPromise();

              this.mensageria.addMensagem({
                mensagem: 'mensagens.MSG-001',
                tipo: TipoMensagem.SUCESSO
              });
            })
          }
        })
  }

}
