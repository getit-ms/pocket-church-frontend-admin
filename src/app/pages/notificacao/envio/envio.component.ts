import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {Notificacao} from '../../../api/model/notificacao';
import {LotacaoColaborador} from '../../../api/model/lotacao-colaborador';
import {NotificacaoService} from '../../../api/service/notificacao.service';
import {FormComponent} from '@gafs/infra-formulario';
import {ColaboradorService} from "../../../api/service/colaborador.service";

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss']
})
export class EnvioComponent implements OnInit {

  notificacao: Notificacao = {};

  lotacoes: Array<LotacaoColaborador>;

  @ViewChild(FormComponent) form: FormComponent;

  constructor(
    private mensageria: Mensageria,
    private dialogService: DialogService,
    private colaboradorService: ColaboradorService,
    private notificacaoService: NotificacaoService
  ) { }

  async ngOnInit() {
    this.lotacoes = await this.colaboradorService.buscaLotacoes().toPromise();
  }

  enviar() {
    this.dialogService.confirmacao(
      'mensagens.MSG-018',
      'notificacao.confirmacao_envio',
      'global.sim',
      'global.nao'
    ).subscribe(async () => {

      await this.notificacaoService.envia(this.notificacao).toPromise();

      this.notificacao = {};
      this.form.reset();

      this.mensageria.addMensagem({
        mensagem: 'mensagens.MSG-001',
        tipo: TipoMensagem.SUCESSO
      });
    });
  }

}
