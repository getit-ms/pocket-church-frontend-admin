import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FuncionalidadesComponent} from './funcionalidades/funcionalidades.component';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [FuncionalidadesComponent],
  imports: [
    CommonModule,
    InfraDataModule,
    TranslateModule.forChild(),
    InfraFormularioModule.forChild(),
    InfraTemplateModule.forPages(),
    InfraTemplateModule.sameLevelTabs([
      {
        path: '',
        tab: 'aplicativo.aplicativo',
        component: FuncionalidadesComponent
      }
    ])
  ]
})
export class AplicativoModule { }
