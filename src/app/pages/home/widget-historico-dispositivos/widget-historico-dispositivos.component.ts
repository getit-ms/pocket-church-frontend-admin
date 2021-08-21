import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EstatisticaService} from '../../../api/service/estatistica.service';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget-historico-dispositivos',
  templateUrl: './widget-historico-dispositivos.component.html',
  styleUrls: ['./widget-historico-dispositivos.component.scss']
})
export class WidgetHistoricoDispositivosComponent implements OnInit, DoCheck {
  private datePipe: DatePipe = new DatePipe('pt-br');

  dispositivos: Array<{name: string, series: Array<{name: string, value: number}>}>;

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

    const dispositivos = [];

    estatisticas.forEach(item => {
      const tipo = this.translateService.instant(`estatistica.dispositivo.${item.tipoDispositivo}`);
      let series = dispositivos.find(s => s.name === tipo);
      if (!series) {
        dispositivos.push(series = {name: tipo, series: []});
      }

      const data = this.datePipe.transform(item.data, 'd MMM');
      let reg = series.series.find(r => r.name === data);
      if (!reg) {
        series.series.push(reg = {name: data, value: 0});
      }

      reg.value += item.quantidadeDispositivos;
    });

    this.dispositivos = dispositivos;
  }

}
