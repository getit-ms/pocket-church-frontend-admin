import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Audio} from '../../../api/model/audio';
import {AudioService} from '../../../api/service/audio.service';
import {AcaoService, DialogService, LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';
import {BuscaPaginada} from '../../../api/model/busca-paginada';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements AfterViewInit {
  audios: BuscaPaginada<Audio>;

  @ViewChild(LoaderComponent) loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private audioService: AudioService
  ) { }

  ngAfterViewInit() {
    this.busca();
  }

  async busca(event = {pagina: 1, tamanhoPagina: 10}) {
    this.audios = await this.loader.listen(this.audioService.consulta(
      event.pagina,
      event.tamanhoPagina
    )).toPromise();
  }

  async excluir(audio: Audio) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.audio'),
        descricao: audio.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.audioService.remove(audio.id).toPromise();

        await this.busca();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
