import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpEventType,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DispositivoService} from '../dispositivo/dispositivo.service';
import {IgrejasUsuarioService} from '../contexto/igrejas-usuario.service';
import {SessaoService, TokenService} from "@gafs/infra-autorizacao";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";

declare var moment: any;

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    private regexDateTime = /^\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}.+$/;
    private regexDate = /^\d{4}\-\d{2}\-\d{2}$/;
    private regexTime = /^\d{2}:\d{2}:\d{2}\.\d{3}.+$/;
    private regexTimeNoTimeZone = /^\d{2}:\d{2}:\d{2}\.\d{3}$/;

    constructor(
        private tokenService: TokenService,
        private mensageria: Mensageria,
        private sessao: SessaoService,
        private igrejasUsuarioService: IgrejasUsuarioService,
        private dispositivoService: DispositivoService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers) {
            req = req.clone({
                headers: new HttpHeaders()
            });
        }

        if (this.tokenService.token) {
            req = req.clone({
                headers: req.headers
                    .append('Authorization', this.tokenService.token)
            });
        } else {
            req = req.clone({
                headers: req.headers
                    .append('Dispositivo', this.dispositivoService.uuid)
                    .append('Igreja', this.chaveIgreja)
            });

        }

        return Observable.create(observer => {
            next.handle(req).subscribe(event => {

                if (event.type === HttpEventType.Response) {
                    this.parseDates(<HttpResponse<any>> event);
                }

                observer.next(event);

            }, (error: HttpErrorResponse) => {

                if (error.status == 400) {
                    this.handleBadRequest(error.error)
                } else if (error.status == 403) {
                    this.handleNoAccess();
                } else if (error.status == 401) {
                    this.handleNoAccess();
                }

                observer.error(error);
            });
        });
    }

    private handleNoAccess() {
      this.sessao.logout();
    }

    private handleBadRequest(error: BadRequestError) {
        if (error.message) {
            this.mensageria.addMensagem({
                mensagem: error.message,
                tipo: TipoMensagem.ERRO
            });
        }

        if (error.validations) {
            error.validations.forEach(v => {
                this.mensageria.addValidacao(v.field, {
                    mensagem: v.message,
                    argumentos: v.args,
                    tipo: TipoMensagem.ERRO
                })
            })
        }
    }

    get chaveIgreja(): string {
        if (!this.igrejasUsuarioService.atual) {
            return 'tst';
        }

        return this.igrejasUsuarioService.atual.igreja.chave;
    }

    private parseDates(response: HttpResponse<any>) {

        if (response.headers && response.headers.get('Content-Type') === 'application/json'){
            this.convertDateStringsToDates(response.body);
        }
    }

    /**
     * Realiza a conversão de strings de datas em objetos Date javascript de acordo com o pattern definido pela API
     * @param data
     */
    public convertDateStringsToDates(data:any) {
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }

            const value = data[key];
            let match;

            if (typeof value === 'string') {
                if (match = value.match(this.regexDateTime)) {
                    data[key] = moment(match[0]).toDate('YYYY-MM-DDTHH:mm:ss.SSSZZ');
                } else if (match = value.match(this.regexDate)) {
                    data[key] = moment(match[0]).toDate('YYYY-MM-DD');
                } else if (match = value.match(this.regexTime)) {
                    data[key] = moment(`1970-01-01T${match[0]}`).toDate('YYYY-MM-DDTHH:mm:ss.SSSZZ');
                } else if (match = value.match(this.regexTimeNoTimeZone)) {
                    data[key] = moment(`1970-01-01T${match[0]}`).toDate('YYYY-MM-DDTHH:mm:ss.SSS');
                }
            } else if (typeof value === 'object') {
                this.convertDateStringsToDates(value);
            }
        }
    }
}

interface BadRequestError {
    message?: string;
    validations?: Array<BadRequestValidation>;
}

interface BadRequestValidation {
    field?: string;
    message?: string;
    args?: any;
}