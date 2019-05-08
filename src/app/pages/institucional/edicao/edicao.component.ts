import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Institucional} from '../../../api/model/institucional';
import {InstitucionalService} from '../../../api/service/institucional.service';
import {LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.component.html',
  styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent implements AfterViewInit {

  institucional: Institucional = {
    enderecos: [],
    redesSociais: {}
  };

  redesSociais = [
    'facebook',
    'twitter',
    'youtube',
    'pinterest',
    'google-plus',
    'instagram'
  ];

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private mensageria: Mensageria,
    private institucionalService: InstitucionalService
  ) { }

  async ngAfterViewInit() {
    this.carrega(await this.loader.listen(this.institucionalService.get()).toPromise());
  }

  private carrega(institucional: Institucional) {
      (<any>institucional).endereco = undefined;
      if (!institucional.enderecos ||
          !institucional.enderecos.length) {
          institucional.enderecos = [{}];
      }

      if (!institucional.redesSociais) {
          institucional.redesSociais = {};
      }

      this.institucional = institucional;
  }

  async salvar() {
    this.carrega(await this.institucionalService.update(this.institucional).toPromise());

    this.mensageria.addMensagem({
      mensagem: 'mensagens.MSG-001',
      tipo: TipoMensagem.SUCESSO
    });
  }
}
