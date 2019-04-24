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

@NgModule({
  declarations: [ConsultaComponent, EdicaoComponent],
  imports: [
    CommonModule,

    MatIconModule,
    InfraDataModule,
    InfraCoreModule,
    TranslateModule.forChild(),
    InfraFormularioModule.forChild(),
    InfraTemplateModule.forPages(),
    InfraTemplateModule.simpleCrudRoute({
      bundleBase: 'perfil',
      updateComponent: EdicaoComponent,
      readComponent: ConsultaComponent
    })
  ]
})
export class PerfilModule { }
