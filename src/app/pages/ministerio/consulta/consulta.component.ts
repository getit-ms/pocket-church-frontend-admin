import { Component, OnInit } from '@angular/core';
import {Ministerio} from '../../../api/model/ministerio';
import {MinisterioService} from '../../../api/service/ministerio.service';
import {AcaoService, DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  ministerios: Array<Ministerio>;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private ministerioService: MinisterioService
  ) { }

  ngOnInit() {
    this.load()
      .then(() => console.log('sucesso'))
      .catch(() => console.log('falha'));
  }

  private async load() {
    this.ministerios = await this.ministerioService.consulta().toPromise();
  }

  async excluir(ministerio: Ministerio) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.ministerio'),
        descricao: ministerio.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.ministerioService.remove(ministerio.id).toPromise();

        await this.load();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
