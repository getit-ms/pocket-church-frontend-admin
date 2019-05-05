import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {CalendarioAtendimento} from "../../../api/model/calendario-atendimento";
import {AconselhamentoService} from "../../../api/service/aconselhamento.service";

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  calendarios: Array<CalendarioAtendimento>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private aconselhamentoService: AconselhamentoService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca() {
    this.calendarios = await this.loader.listen(this.aconselhamentoService.consulta()).toPromise();
  }

  async excluir(calendario: CalendarioAtendimento) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.agenda'),
        descricao: calendario.pastor.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.aconselhamentoService.remove(calendario.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
