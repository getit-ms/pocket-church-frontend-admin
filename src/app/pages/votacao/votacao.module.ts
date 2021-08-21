import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatIconModule, MatTabsModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InputQuestoesComponent} from './input-questoes/input-questoes.component';
import {InputOpcoesComponent} from './input-opcoes/input-opcoes.component';
import {ValidaOpcoesDirective} from './validacao/valida-opcoes.directive';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InputQuestoesComponent, InputOpcoesComponent, ValidaOpcoesDirective],
    imports: [
        CommonModule,

        MatChipsModule,
        MatTooltipModule,
        MatIconModule,
        MatTabsModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplateCrudModule.forChild({
            bundleBase: 'votacao',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ]
})
export class VotacaoModule { }
