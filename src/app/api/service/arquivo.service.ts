import {Observable} from 'rxjs/index';
import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {HttpClient, HttpEventType, HttpProgressEvent} from '@angular/common/http';
import {AbstractApiService} from './api-service.abstract';
import {API_PATH_BASE} from '../base-path';
import {Arquivo} from '../model/arquivo';
import {take} from 'rxjs/internal/operators';

export const FILE_MANAGEMENT_SERVICE = new InjectionToken('FILE_MANAGEMENT_SERVICE');

export interface FileManagementService {
  downloadURL(pathBase: string, arquivo: Arquivo): Observable<string>;
}

@Injectable()
export class ArquivoService extends AbstractApiService {

  constructor(
    @Inject(API_PATH_BASE)
    @Optional()
    pathBase: string = 'http://localhost',
    httpClient: HttpClient,
    @Inject(FILE_MANAGEMENT_SERVICE)
    private fileManagementService: FileManagementService
  ) {
    super(pathBase, httpClient);
  }

  async download(arquivo: Arquivo) {
    const url = await this.fileManagementService
      .downloadURL(this.pathBase, arquivo)
      .pipe(take(1)).toPromise();

    const link = document.createElement('a');

    link.download = arquivo.nome;
    link.href = url;
    link.target = '_blank';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  upload(file: File): Observable<UploadEvent> {
    return Observable.create(observer => {
      observer.next({type: 'progresso', progresso: 0.01});

      const formData: FormData = new FormData();

      formData.append('file', file, file.name);

      this.httpClient.request(
        'POST', `${this.pathBase}/arquivo/upload`,
        {
          body: formData,
          observe: 'events',
          reportProgress: true
        }
      ).subscribe(event => {

        if (event.type === HttpEventType.UploadProgress) {
          const progress = <HttpProgressEvent> event;
          observer.next({
            type: 'progresso',
            progresso: 100 * progress.loaded / progress.total
          });
        } else if (event.type === HttpEventType.Response) {
          observer.next({
            type: 'conclusao',
            arquivo: event.body
          });
        }
      }, err => observer.error(err));
    });
  }

}

export interface UploadEvent {
  type: 'progresso'|'conclusao';
  progresso?: number;
  arquivo?: Arquivo;

}
