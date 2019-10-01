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
import {SafeUrlPipe} from "./safe/safe-url.pipe";

@NgModule({
    declarations: [
        ImagemComponent,
        InputTelefonesComponent,
        InputFileUploadComponent,
        InputPhotouploadComponent,
        FileUploadValidatorDirective,
        InputTelefonesValidatorDirective,
        SafeUrlPipe,
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
        InfraFormularioModule
    ],
    exports: [
        ImagemComponent,
        InputTelefonesComponent,
        InputFileUploadComponent,
        InputPhotouploadComponent,
        FileUploadValidatorDirective,
        InputTelefonesValidatorDirective,
        SafeUrlPipe,
    ]
})
export class ComponentesModule {

}
