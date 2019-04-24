import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnvioComponent} from './envio/envio.component';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [EnvioComponent],
  imports: [
    CommonModule,
    InfraDataModule,
    TranslateModule.forChild(),
    InfraFormularioModule.forChild(),
    InfraTemplateModule.forPages(),
    InfraTemplateModule.sameLevelTabs([
      {
        path: '',
        tab: 'notificacao.notificacoes',
        component: EnvioComponent
      }
    ])
  ]
})
export class NotificacaoModule { }
