import { Injectable } from '@angular/core';
import {FileManagementService} from '../../api/service/arquivo.service';
import {IgrejasUsuarioService} from '../contexto/igrejas-usuario.service';
import {TokenService} from '@gafs/infra-autorizacao';
import {Arquivo} from '../../api/model/arquivo';
import {Observable} from 'rxjs';
import {DispositivoService} from '../dispositivo/dispositivo.service';

@Injectable()
export class PocketChurchFileManagementService implements FileManagementService {

  constructor(
    private dispositivoService: DispositivoService,
    private tokenService: TokenService,
    private igrejasUsuarioService: IgrejasUsuarioService
  ) { }

  downloadURL(pathBase: string, arquivo: Arquivo): Observable<string> {
    return Observable.create(observer => {
      const dispositivo = this.dispositivoService.uuid;
      const token = this.tokenService.token;
      const igreja = this.igrejasUsuarioService.atual.igreja.chave;
      observer.next(`${pathBase}/arquivo/download/${arquivo.id}?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`);
    });
  }
}
