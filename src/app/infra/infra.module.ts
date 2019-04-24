import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AUT_SESSAO_REFRESHER, AUT_TOKEN_DATA_FACTORY, InfraAutorizacaoModule} from '@gafs/infra-autorizacao';
import {PocketChurchSessaoRefresherService} from './autorizacao/pocket-church-sessao-refresher.service';
import {PocketChurchTokenDataFactoryService} from './autorizacao/pocket-church-token-data-factory.service';
import {DispositivoService} from './dispositivo/dispositivo.service';
import {HttpInterceptorService} from './http/http-interceptor.service';
import {HttpClientModule} from '@angular/common/http';
import {IgrejasUsuarioService} from './contexto/igrejas-usuario.service';
import {PrepareContextService} from './contexto/prepare-context.service';
import {FILE_MANAGEMENT_SERVICE} from '../api/service/arquivo.service';
import {PocketChurchFileManagementService} from './file/pocket-church-file-management.service';
import {IgrejasTranslateLoaderService} from './contexto/igrejas-translate-loader.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    InfraAutorizacaoModule
  ],
  providers: [
    PocketChurchSessaoRefresherService,
    PocketChurchTokenDataFactoryService,
    IgrejasUsuarioService,
    DispositivoService,
    HttpInterceptorService,
    PrepareContextService,
    IgrejasTranslateLoaderService,
    PocketChurchFileManagementService,
    {
      provide: FILE_MANAGEMENT_SERVICE,
      useExisting: PocketChurchFileManagementService
    },
    {
      provide: AUT_SESSAO_REFRESHER,
      useExisting: PocketChurchSessaoRefresherService
    },
    {
      provide: AUT_TOKEN_DATA_FACTORY,
      useExisting: PocketChurchTokenDataFactoryService
    }
  ]
})
export class InfraModule { }
