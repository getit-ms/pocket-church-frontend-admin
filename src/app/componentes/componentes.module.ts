import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImagemComponent} from './imagem/imagem.component';
import {InputTelefonesComponent} from './input-telefones/input-telefones.component';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule, MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
} from '@angular/material';
import {InputFileUploadComponent} from './input-fileupload/input-fileupload.component';
import {InputPhotouploadComponent} from './input-photoupload/input-photoupload.component';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadValidatorDirective} from "./input-fileupload/input-fileupload-validator.directive";
import {InputTelefonesValidatorDirective} from "./input-telefones/input-telefones-validator.directive";
import { InputCamposEventoComponent } from './input-campos-evento/input-campos-evento.component';
import {InputOpcoesComponent} from "./input-opcoes/input-opcoes.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import { InputValidacoesComponent } from './input-validacoes/input-validacoes.component';
import { ModalEdicaoValidacoesComponent } from './input-validacoes/modal-edicao-validacoes/modal-edicao-validacoes.component';
import {MatDialogModule} from "@angular/material/dialog";
import { InputCamposEventoValidatorDirective } from './input-campos-evento/input-campos-evento-validator.directive';
import { InputCampoEventoComponent } from './input-campo-evento/input-campo-evento.component';
import { OutputValoresInscricaoComponent } from './output-valores-inscricao/output-valores-inscricao.component';
import { DownloadArquivoDirective } from './download-arquivo.directive';

@NgModule({
    declarations: [
        ImagemComponent,
        InputTelefonesComponent,
        InputFileUploadComponent,
        InputPhotouploadComponent,
        FileUploadValidatorDirective,
        InputTelefonesValidatorDirective,
        InputCamposEventoComponent,
        InputOpcoesComponent,
        InputValidacoesComponent,
        ModalEdicaoValidacoesComponent,
        InputCamposEventoValidatorDirective,
        InputCampoEventoComponent,
        OutputValoresInscricaoComponent,
        DownloadArquivoDirective
    ],
    imports: [
        CommonModule,

        MatIconModule,
        MatButtonModule,
        MatInputModule,
        TranslateModule.forChild(),
        MatFormFieldModule,
        MatChipsModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        InfraDataModule,
        InfraFormularioModule,
        MatTooltipModule,
        MatDialogModule
    ],
    exports: [
        ImagemComponent,
        InputTelefonesComponent,
        InputFileUploadComponent,
        InputPhotouploadComponent,
        FileUploadValidatorDirective,
        InputTelefonesValidatorDirective,
        InputCamposEventoComponent,
        InputCamposEventoValidatorDirective,
        InputCampoEventoComponent,
        OutputValoresInscricaoComponent
    ],
    entryComponents: [
        ModalEdicaoValidacoesComponent
    ]
})
export class ComponentesModule {

}
