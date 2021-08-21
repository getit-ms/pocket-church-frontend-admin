import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ArquivoService} from "../api/service/arquivo.service";
import {Arquivo} from "../api/model/arquivo";

@Directive({
  selector: '[appDownloadArquivo]'
})
export class DownloadArquivoDirective {

  @Input('appDownloadArquivo') arquivo: Arquivo;

  constructor(
      private arquivoService: ArquivoService) { }


  @HostListener('click')
  download() {
    this.arquivoService.download(this.arquivo);
  }
}
