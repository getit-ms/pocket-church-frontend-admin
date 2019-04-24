import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {AbstractControlValueAccessor} from '@gafs/infra-formulario';
import {ArquivoService} from '../../api/service/arquivo.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'input-fileupload',
  templateUrl: './input-fileupload.component.html',
  styleUrls: ['./input-fileupload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputFileUploadComponent,
      multi: true
    }
  ]
})
export class InputFileUploadComponent extends AbstractControlValueAccessor {

  @Input() required: any;
  @Input() label: string;
  @Input() multiple: boolean;
  @Input() template: 'table'|'chips'|'manual' = 'table';

  @ViewChild('input') input: ElementRef;

  @Output() selectCancel  = new EventEmitter<any>();

  constructor(
    private arquivoService: ArquivoService) {
    super();
  }

  upload(arquivo: ArquivoUploading) {
    return Observable.create(observer => {
      this.arquivoService.upload(arquivo.file)
        .subscribe(event => {

          if (event.type === 'conclusao') {
            arquivo.progresso = undefined;

            if (this.multiple) {
              this.value = [
                ...(this.value || []).map(a => a === arquivo ? event.arquivo : a)
              ];
            } else {
              this.value = event.arquivo;
            }

            observer.next();
          } else if (event.type === 'progresso') {
            arquivo.progresso = event.progresso;
          }

        }, err => {
          if (this.multiple) {
            const result = (this.value || []).filter(a => a !== arquivo);
            if (result.length) {
              this.value = result;
            } else {
              this.value = undefined;
            }
          } else {
            this.value = undefined;
          }

          observer.error(err);
        });

    });
  }

  uploadNext() {
    if (this.multiple) {
      if (this.value) {
        for (let i = 0; i < this.value.length; i++) {
          if (this.value[i].loading) {
            this.upload(this.value[i]).subscribe(
              () => this.uploadNext(),
              err => this.uploadNext()
            );
            break;
          }
        }
      }
    } else if (this.value && this.value.loading) {
      this.upload(this.value).subscribe(
        () => this.uploadNext(),
        err => this.uploadNext()
      );
    }
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      if (this.multiple) {
        const arqs = [];
        for (let i = 0; i < event.target.files.length; i++) {
          const file = event.target.files[i];
          arqs.push({
            file: file,
            loading: true,
            nome: file.name
          });
        }

        this.value = [
          ...(this.value || []),
          ...arqs
        ];
      } else {
        this.value = {
          file: event.target.files[0],
          loading: true,
          nome: event.target.files[0].name
        };
      }

      this.uploadNext();
    } else {
      this.selectCancel.emit();
    }

    event.target.value = '';
  }

  openFileChooser() {
    this.input.nativeElement.click();
  }

  download(arquivo) {
    this.arquivoService.download(arquivo);
  }

  remover(arquivo) {
    if (this.value) {
      if (this.multiple) {
        this.value.splice(this.value.indexOf(arquivo), 1);

        if (this.value.length) {
          this.value = [...this.value];
        } else {
          this.value = undefined;
        }

      } else {
        this.value = undefined;
      }
    }
  }

}

export interface ArquivoUploading {
  nome: string;
  loading: boolean;
  progresso: number;
  file: File;
}
