import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractControlValueAccessor} from '@gafs/infra-formulario';
import {ArquivoService} from '../../api/service/arquivo.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'input-photoupload',
  templateUrl: './input-photoupload.component.html',
  styleUrls: ['./input-photoupload.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPhotouploadComponent,
      multi: true
    }
  ]
})
export class InputPhotouploadComponent extends AbstractControlValueAccessor {

  @Input() label: string;
  @Input() multiple: boolean;
  @Input() padrao: string = 'assets/imgs/user.png';

  @ViewChild('input') input: ElementRef;

  progress = 0;
  loading = false;

  constructor(
    private arquivoService: ArquivoService) {
    super();
  }

  upload(file) {
    return Observable.create(observer => {
      this.arquivoService.upload(file)
        .subscribe(event => {

          if (event.type === 'conclusao') {
            this.progress = undefined;
            observer.next();

            if (this.multiple) {
              if (!this.value) {
                this.value = [];
              }

              this.value = [...this.value, event.arquivo];
            } else {
              this.value = event.arquivo;
            }
          } else if (event.type === 'progresso') {
            this.progress = event.progresso;
          }

        }, err => observer.error(err));

    });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      this.loading = true;
      const uploadNext = (i = 0) => {
        if (i < event.target.files.length) {
          this.upload(event.target.files[i])
            .subscribe(
              () => uploadNext(i + 1),
              err => uploadNext(i + 1)
            );
        } else {
          this.loading = false;
          this.progress = undefined;
        }
      };

      uploadNext();
    }

    event.target.value = '';
  }

  remover() {
    if (this.value) {
      this.value = null;
    }
  }

}
