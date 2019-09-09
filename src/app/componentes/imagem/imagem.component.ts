import {Directive, ElementRef, Inject, Input, OnInit, Self} from '@angular/core';
import {Arquivo} from '../../api/model/arquivo';
import {API_PATH_BASE} from '../../api/base-path';
import {EmpresasUsuarioService} from '../../infra/contexto/empresas-usuario.service';
import {DispositivoService} from '../../infra/dispositivo/dispositivo.service';

@Directive({
  selector: 'img[imagemSrc],[imagemBackground]'
})
export class ImagemComponent implements OnInit {

  private _padrao: string = 'assets/imgs/placeholder_imagem.png';

  private _setter: () => any;

  private _empresa: string;

  constructor(
    @Inject(API_PATH_BASE) private basePath: string,
    @Self() private element: ElementRef,
    private dispositivoService: DispositivoService,
    private empresasUsuarioService: EmpresasUsuarioService
  ) { }

  @Input() set empresa(chave: string) {
    this._empresa = chave;

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
      `Empresa=${this._empresa || this.empresasUsuarioService.atual.empresa.chave}&` +
      `Dispositivo=${this.dispositivoService.uuid}`;
  }

  @Input() set padrao(padrao: string) {
    this._padrao = padrao;
    this._setter();
  }

  ngOnInit() {}

}
