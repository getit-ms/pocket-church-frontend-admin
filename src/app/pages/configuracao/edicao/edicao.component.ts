import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ConfiguracaoIgreja} from "../../../api/model/configuracao-igreja";
import {ConfiguracaoService} from "../../../api/service/configuracao.service";
import {IgrejasUsuarioService} from "../../../infra/contexto/igrejas-usuario.service";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

  configuracao: ConfiguracaoIgreja = {};

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private igrejaUsuarioService: IgrejasUsuarioService,
    private configuracaoService: ConfiguracaoService
  ) { }

  get igreja() {
    return this.igrejaUsuarioService.atual.igreja;
  }

  async ngAfterViewInit() {
    this.configuracao = await this.loader.listen(this.configuracaoService.busca()).toPromise();
  }

  async salvar() {
    this.configuracao = await this.configuracaoService.atualiza(this.configuracao).toPromise();

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }
}
