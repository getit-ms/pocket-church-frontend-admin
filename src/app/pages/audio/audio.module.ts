import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatDialogModule, MatIconModule, MatTooltipModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {InputCategoriaAudioComponent} from "./input-categoria-audio/input-categoria-audio.component";
import {ModalCategoriaAudioComponent} from "./modal-categoria-audio/modal-categoria-audio.component";

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, InputCategoriaAudioComponent, ModalCategoriaAudioComponent],
    imports: [
        CommonModule,

        MatDialogModule,
        MatIconModule,
        MatTooltipModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplateCrudModule.forChild({
            bundleBase: 'audio',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ],
    entryComponents: [ModalCategoriaAudioComponent]
})
export class AudioModule { }
