import { Injectable } from '@angular/core';
import {FileManagementService} from '../../api/service/arquivo.service';
import {EmpresasUsuarioService} from '../contexto/empresas-usuario.service';
import {TokenService} from '@gafs/infra-autorizacao';
import {Arquivo} from '../../api/model/arquivo';
import {Observable} from 'rxjs';
import {DispositivoService} from '../dispositivo/dispositivo.service';

@Injectable()
export class PocketCorporateFileManagementService implements FileManagementService {

  constructor(
    private dispositivoService: DispositivoService,
    private tokenService: TokenService,
    private empresasUsuarioService: EmpresasUsuarioService
  ) { }

  downloadURL(pathBase: string, arquivo: Arquivo): Observable<string> {
    return Observable.create(observer => {
      const dispositivo = this.dispositivoService.uuid;
      const token = this.tokenService.token;
      const empresa = this.empresasUsuarioService.atual.empresa.chave;
      observer.next(`${pathBase}/arquivo/download/${arquivo.id}?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`);
    });
  }
}
