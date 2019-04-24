import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AcaoService, LoaderComponent} from '@gafs/infra-core';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  @ViewChild('loader') loader: LoaderComponent;

  constructor(
    private acaoService: AcaoService,
    private matIconRegistry: MatIconRegistry,
    private translateService: TranslateService) {

    this.translateService.setDefaultLang('pt-br');
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }

  ngAfterViewInit() {
    this.acaoService.init(this.loader);

    document.getElementById('initial-preloader')
      .setAttribute('style', 'display:none');

    this.acaoService.incrementaAJAX();

    setTimeout(() => this.acaoService.decrementaAJAX(), 500);
  }
}
