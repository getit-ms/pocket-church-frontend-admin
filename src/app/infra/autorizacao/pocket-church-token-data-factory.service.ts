import { Injectable } from '@angular/core';
import {TokenData, TokenDataFactory} from '@gafs/infra-autorizacao';
import {Observable} from 'rxjs';

export const _1_MONTH = 1000 * 60 * 60 * 24 * 30;

@Injectable()
export class PocketChurchTokenDataFactoryService implements TokenDataFactory {

  constructor() { }

  create(token: string): Observable<TokenData> {
    const parts = this.split(token);
    const payload = this.parse(parts[1]);

    return Observable.create(observer => observer.next({
      expiration: new Date(payload.creation + _1_MONTH),
      issuer: `${payload.membro}`,
      roles: [
        `igreja=${payload.igreja}`
      ]
    }));
  }

  private split(jwt: string): string[] {
    return jwt.split('.');
  }

  private parse(base64: string): any {
    if (!base64) return undefined;

    return JSON.parse(this.b64DecodeUnicode(base64));
  }

  private b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
  }
}
