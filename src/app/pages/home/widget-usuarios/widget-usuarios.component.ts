import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from '@angular/common';
import {EstatisticaService} from '../../../api/service/estatistica.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget-usuarios',
  templateUrl: './widget-usuarios.component.html',
  styleUrls: ['./widget-usuarios.component.scss']
})
export class WidgetUsuariosComponent implements OnInit, DoCheck {
  private datePipe: DatePipe = new DatePipe('pt-br');

  usuarios: Array<{name: string, value: number}>;

  dimensions: Array<number> = [0, 0];
  @ViewChild('card') card: ElementRef;

  constructor(
    private translateService: TranslateService,
    private estatisticaService: EstatisticaService,
  ) { }

  ngOnInit() {
    this.buscaQuantidadesUsuariosAtivos();
  }

  ngDoCheck() {
    if (this.card) {
      const dim = [
        this.card.nativeElement.clientWidth - 32,
        (this.card.nativeElement.clientWidth - 32) * 0.5,
      ];

      if (dim[0] !== this.dimensions[0] || dim[1] !== this.dimensions[1]) {
        this.dimensions = dim;
      }
    }
  }

  private async buscaQuantidadesUsuariosAtivos() {
    const quantidades = await this.estatisticaService.buscaQuantidadesDispositivos().toPromise();

    const usuarios = {
      name: this.translateService.instant('estatistica.usuarios_nao_logados'),
      value: quantidades.map(qtde => qtde.quantidadeDispositivos - qtde.quantidadeLogados).reduce((v1, v2) => v1 + v2)
    };

    const membros = {
      name: this.translateService.instant('estatistica.membros_logados'),
      value: quantidades.map(qtde => qtde.quantidadeLogados).reduce((v1, v2) => v1 + v2)
    };

    this.usuarios = [usuarios, membros];
  }

}
