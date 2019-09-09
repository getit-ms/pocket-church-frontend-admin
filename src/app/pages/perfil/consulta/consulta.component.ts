import { Component, OnInit } from '@angular/core';
import {Perfil} from '../../../api/model/perfil';
import {PerfilService} from '../../../api/service/perfil.service';
import {AcaoService, DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  perfis: Array<Perfil>;

  constructor(
    private mensageria: Mensageria,
    private acaoService: AcaoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private perfilService: PerfilService
  ) { }

  ngOnInit() {
    this.load();
  }

  private async load() {
    this.perfis = await this.perfilService.consulta().toPromise();
  }

  async excluir(perfil: Perfil) {
    this.dialogService.confirmacao(
      'mensagens.MSG-016',
      'global.confirmacao_exclusao',
      'global.sim',
      'global.nao',
      {
        elemento: this.translateService.instant('global.elemento.perfil'),
        descricao: perfil.nome
      }
    ).subscribe(() => {
      this.acaoService.executa(async () => {
        await this.perfilService.remove(perfil.id).toPromise();

        await this.load();

        this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
        });
      });
    });
  }

}
