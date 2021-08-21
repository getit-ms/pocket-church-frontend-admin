import {Directive, ElementRef, Inject, Input, OnInit, Self} from '@angular/core';
import {Arquivo} from '../../api/model/arquivo';
import {API_PATH_BASE} from '../../api/base-path';
import {IgrejasUsuarioService} from '../../infra/contexto/igrejas-usuario.service';
import {DispositivoService} from '../../infra/dispositivo/dispositivo.service';

@Directive({
  selector: 'img[imagemSrc],[imagemBackground]'
})
export class ImagemComponent implements OnInit {

  private _padrao: string = 'assets/imgs/placeholder_imagem.png';

  private _setter: () => any;

  private _igreja: string;

  constructor(
    @Inject(API_PATH_BASE) private basePath: string,
    @Self() private element: ElementRef,
    private dispositivoService: DispositivoService,
    private igrejasUsuarioService: IgrejasUsuarioService
  ) { }

  @Input() set igreja(chave: string) {
    this._igreja = chave;

    if (this._setter) {
      this._setter();
    }
  }

  @Input() set imagemSrc(imagem: Arquivo | number) {
    if (imagem) {
      const id = typeof imagem === 'number' ? imagem : imagem.id;

      this._setter = () => {
        this.element.nativeElement.src = this.prepareURL(id);
      };
    } else {
      this._setter = () => this.element.nativeElement.src = this._padrao;
    }

    this._setter();
  }

  @Input() set imagemBackground(imagem: Arquivo | number) {
    if (imagem) {
      const id = typeof imagem === 'number' ? imagem : imagem.id;

      this._setter = () => {
        this.element.nativeElement.style.backgroundImage = `url(${this.prepareURL(id)})`;
      };
    } else {
      this._setter = () => this.element.nativeElement.style.backgroundImage = `url(${this._padrao})`;
    }

    this._setter();
  }

  private prepareURL(id: number): string {
    return `${this.basePath}/arquivo/download/${id}?` +
      `Igreja=${this._igreja || this.igrejasUsuarioService.atual.igreja.chave}&` +
      `Dispositivo=${this.dispositivoService.uuid}`;
  }

  @Input() set padrao(padrao: string) {
    this._padrao = padrao;
    this._setter();
  }

  ngOnInit() {}

}
