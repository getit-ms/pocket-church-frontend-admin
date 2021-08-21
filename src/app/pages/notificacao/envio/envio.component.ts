import {Component, OnInit, ViewChild} from '@angular/core';
import {DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {Notificacao} from '../../../api/model/notificacao';
import {Ministerio} from '../../../api/model/ministerio';
import {NotificacaoService} from '../../../api/service/notificacao.service';
import {MinisterioService} from '../../../api/service/ministerio.service';
import {FormComponent} from '@gafs/infra-formulario';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.scss']
})
export class EnvioComponent implements OnInit {

  notificacao: Notificacao = {};

  ministerios: Array<Ministerio>;

  @ViewChild(FormComponent) form: FormComponent;

  constructor(
    private mensageria: Mensageria,
    private dialogService: DialogService,
    private ministerioService: MinisterioService,
    private notificacaoService: NotificacaoService
  ) { }

  async ngOnInit() {
    this.ministerios = await this.ministerioService.consultaPorAcesso().toPromise();
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
