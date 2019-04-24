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

@NgModule({
  declarations: [
    ImagemComponent,
    InputTelefonesComponent,
    InputFileUploadComponent,
    InputPhotouploadComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatButtonModule,
    MatInputModule,
    TranslateModule.forChild(),
    MatFormFieldModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    InfraDataModule,
    InfraFormularioModule
  ],
  exports: [
    ImagemComponent,
    InputTelefonesComponent,
    InputFileUploadComponent,
    InputPhotouploadComponent
  ]
})
export class ComponentesModule {

}
