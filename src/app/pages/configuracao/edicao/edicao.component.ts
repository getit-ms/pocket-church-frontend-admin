import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {ConfiguracaoEmpresa} from "../../../api/model/configuracao-empresa";
import {ConfiguracaoService} from "../../../api/service/configuracao.service";
import {EmpresasUsuarioService} from "../../../infra/contexto/empresas-usuario.service";

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

  configuracao: ConfiguracaoEmpresa = {};

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private empresaUsuarioService: EmpresasUsuarioService,
    private configuracaoService: ConfiguracaoService
  ) { }

  get empresa() {
    return this.empresaUsuarioService.atual.empresa;
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
