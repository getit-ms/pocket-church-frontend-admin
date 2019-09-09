import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AUT_SESSAO_REFRESHER, AUT_TOKEN_DATA_FACTORY, InfraAutorizacaoModule} from '@gafs/infra-autorizacao';
import {PocketCorporateSessaoRefresherService} from './autorizacao/pocket-corporate-sessao-refresher.service';
import {PocketCorporateTokenDataFactoryService} from './autorizacao/pocket-corporate-token-data-factory.service';
import {DispositivoService} from './dispositivo/dispositivo.service';
import {HttpInterceptorService} from './http/http-interceptor.service';
import {HttpClientModule} from '@angular/common/http';
import {EmpresasUsuarioService} from './contexto/empresas-usuario.service';
import {PrepareContextService} from './contexto/prepare-context.service';
import {FILE_MANAGEMENT_SERVICE} from '../api/service/arquivo.service';
import {PocketCorporateFileManagementService} from './file/pocket-corporate-file-management.service';
import {EmpresasTranslateLoaderService} from './contexto/empresas-translate-loader.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    InfraAutorizacaoModule
  ],
  providers: [
    PocketCorporateSessaoRefresherService,
    PocketCorporateTokenDataFactoryService,
    EmpresasUsuarioService,
    DispositivoService,
    HttpInterceptorService,
    PrepareContextService,
    EmpresasTranslateLoaderService,
    PocketCorporateFileManagementService,
    {
      provide: FILE_MANAGEMENT_SERVICE,
      useExisting: PocketCorporateFileManagementService
    },
    {
      provide: AUT_SESSAO_REFRESHER,
      useExisting: PocketCorporateSessaoRefresherService
    },
    {
      provide: AUT_TOKEN_DATA_FACTORY,
      useExisting: PocketCorporateTokenDataFactoryService
    }
  ]
})
export class InfraModule { }
