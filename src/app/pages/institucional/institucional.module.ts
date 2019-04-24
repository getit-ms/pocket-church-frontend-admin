import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EdicaoComponent} from './edicao/edicao.component';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateModule} from '@gafs/infra-template';
import {TranslateModule} from '@ngx-translate/core';
import { InputEnderecosComponent } from './input-enderecos/input-enderecos.component';
import {MatIconModule} from '@angular/material';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InfraCoreModule} from '@gafs/infra-core';

@NgModule({
  declarations: [EdicaoComponent, InputEnderecosComponent],
  imports: [
    CommonModule,

    MatIconModule,

    InfraCoreModule,
    InfraDataModule,
    ComponentesModule,
    TranslateModule.forChild(),
    InfraFormularioModule.forChild(),
    InfraTemplateModule.forPages(),
    InfraTemplateModule.sameLevelTabs([
      {
        path: '',
        tab: 'institucional.dados_institucionais',
        component: EdicaoComponent
      }
    ])
  ]
})
export class InstitucionalModule { }
