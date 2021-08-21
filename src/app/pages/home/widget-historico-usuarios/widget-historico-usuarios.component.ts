import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EstatisticaService} from '../../../api/service/estatistica.service';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget-historico-usuarios',
  templateUrl: './widget-historico-usuarios.component.html',
  styleUrls: ['./widget-historico-usuarios.component.scss']
})
export class WidgetHistoricoUsuariosComponent implements OnInit, DoCheck {
  private datePipe: DatePipe = new DatePipe('pt-br');

  usuarios: Array<{name: string, series: Array<{name: string, value: number}>}>;

  dimensions: Array<number> = [0, 0];
  @ViewChild('card') card: ElementRef;

  constructor(
    private translateService: TranslateService,
    private estatisticaService: EstatisticaService,
  ) { }

  ngOnInit() {
    this.buscaEstatisticasDispositivos();
  }

  ngDoCheck() {
    if (this.card) {
      const dim = [
        this.card.nativeElement.clientWidth - 32,
        (this.card.nativeElement.clientWidth - 32) * 0.5,
      ];

      if (dim[0] !== this.dimensions[0]) {
        this.dimensions = dim;
      }
    }
  }

  private async buscaEstatisticasDispositivos() {
    const estatisticas = await this.estatisticaService.buscaEstatisticasDispositivos().toPromise();

    const usuarios = {
      name: this.translateService.instant('estatistica.usuarios_ativos'),
      series: []
    };
    const membros = {
      name: this.translateService.instant('estatistica.membros_logados'),
      series: []
    };

    for (const item of estatisticas) {
      const data = this.datePipe.transform(item.data, 'd MMM');

      let regUsuario = usuarios.series.find(i => i.name === data);
      if (!regUsuario) {
        usuarios.series.push(regUsuario = {name: data, value: 0});
      }

      regUsuario.value += item.quantidadeDispositivos;

      let regMembro = membros.series.find(i => i.name === data);
      if (!regMembro) {
        membros.series.push(regMembro = {name: data, value: 0});
      }

      regMembro.value += item.quantidadeMembrosLogados;
    }

    if (membros.series.find(s => s.value)) {
        this.usuarios = [
            usuarios,
            membros
        ];
    } else {
      this.usuarios = [usuarios];
    }
  }

}
