import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta/consulta.component';
import { EdicaoComponent } from './edicao/edicao.component';
import {MatIconModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';

@NgModule({
  declarations: [ConsultaComponent, EdicaoComponent],
  imports: [
    CommonModule,

    MatIconModule,
    InfraDataModule,
    InfraCoreModule,
    ComponentesModule,
    TranslateModule.forChild(),
    InfraFormularioModule.forChild(),
    InfraTemplateModule.forPages(),
    InfraTemplateModule.simpleCrudRoute({
      bundleBase: 'contato',
      updateComponent: EdicaoComponent,
      readComponent: ConsultaComponent
    })
  ]
})
export class ContatoModule { }
