import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EstatisticaService} from '../../../api/service/estatistica.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-widget-dispositivos',
  templateUrl: './widget-dispositivos.component.html',
  styleUrls: ['./widget-dispositivos.component.scss']
})
export class WidgetDispositivosComponent implements OnInit, DoCheck {
  dispositivos: Array<{name: string, value: number}>;

  dimensions: Array<number> = [0, 0];
  @ViewChild('card') card: ElementRef;

  constructor(
    private translateService: TranslateService,
    private estatisticaService: EstatisticaService,
  ) {}

  ngOnInit() {
    this.buscaQuantidadesDispositivos();
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

  private async buscaQuantidadesDispositivos() {
    const quantidades = await this.estatisticaService.buscaQuantidadesDispositivos().toPromise();

    this.dispositivos = quantidades.map(qtde => ({
      name: this.translateService.instant(`estatistica.dispositivo.${qtde.tipo}`),
      value: qtde.quantidadeDispositivos
    }));
  }

}
