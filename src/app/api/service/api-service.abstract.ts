import {Inject, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_PATH_BASE} from '../base-path';
import {Observable} from 'rxjs';
import {retry, take} from 'rxjs/internal/operators';

export class AbstractApiService {

  constructor(
    @Inject(API_PATH_BASE)
    @Optional()
    protected pathBase: string = 'http://localhost',
    protected httpClient: HttpClient
  ) { }

  doGet<T>(path: string, options: {
    params?: {[key: string]: string[]},
  } = {}): Observable<T> {
    return this.configure(this.httpClient.get<T>(`${this.pathBase}${path}`, {
      params: options.params
    })).pipe(retry(1));
  }

  doPost<T>(path: string, body?: any, options: {
    params?: {[key: string]: string[]},
  } = {}): Observable<T> {
    return this.configure(this.httpClient.post<T>(`${this.pathBase}${path}`, body, {
      params: options.params
    }));
  }

  doPut<T>(path: string, body?: any, options: {
    params?: {[key: string]: string[]},
  } = {}): Observable<T> {
    return this.configure(this.httpClient.put<T>(`${this.pathBase}${path}`, body, {
      params: options.params
    }));
  }

  doDelete<T>(path: string, options: {
    params?: {[key: string]: string[]},
  } = {}): Observable<T> {
    return this.configure(this.httpClient.delete<T>(`${this.pathBase}${path}`, {
      params: options.params
    }));
  }

  private configure<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(take(1));
  }
}
