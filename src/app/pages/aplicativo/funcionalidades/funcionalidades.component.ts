import {Component, OnInit} from '@angular/core';
import {AplicativoService} from '../../../api/service/aplicativo.service';
import {TranslateService} from '@ngx-translate/core';
import {Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.component.html',
  styleUrls: ['./funcionalidades.component.scss']
})
export class FuncionalidadesComponent implements OnInit {

  funcionalidades: Array<string>;
  todasFuncionalidades: Array<string>;

  constructor(
    private mensageria: Mensageria,
    private aplicativoService: AplicativoService,
    private translateService: TranslateService
  ) { }

  async ngOnInit() {
    try {
      this.funcionalidades = await this.aplicativoService.buscaFuncionalidadesAtivas().toPromise();
      this.todasFuncionalidades = (await this.aplicativoService.buscaTodasFuncionalidades().toPromise()) || [];
      this.todasFuncionalidades.sort((f1, f2) =>
        this.translateService.instant(f1)
          .localeCompare(this.translateService.instant(f2)));
    } catch (ex) {
      console.log(ex);
    }
  }

  async salvar() {
    this.funcionalidades = await this.aplicativoService.salvaFuncionalidadesAtivas(this.funcionalidades).toPromise();

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }

}