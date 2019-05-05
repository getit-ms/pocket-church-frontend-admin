import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DiaPlanoLeitura} from "../../../api/model/dia-plano-leitura";

export const MILLIS_DIA = 1000 * 60 * 60 * 24;

@Component({
    selector: 'app-input-versiculos',
    templateUrl: './input-versiculos.component.html',
    styleUrls: ['./input-versiculos.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputVersiculosComponent,
        multi: true
    }]
})
export class InputVersiculosComponent implements OnInit, ControlValueAccessor {

    private onChange: any;
    private onTouched: any;

    private $dataInicio: Date;
    private $dataTermino: Date;

    private innerValue: Array<DiaPlanoLeitura>;

    disabled: boolean;

    anos: Array<AnoLeitura>;

    constructor() { }

    ngOnInit() {}

    registerOnChange(fn: any): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }

    get dataInicio() {
      return this.$dataInicio;
    }

    get dataTermino() {
        return this.$dataTermino;
    }

    @Input() set dataInicio(dataInicio: Date) {
        this.$dataInicio = dataInicio;

        this.prepareDias();
    }

    @Input() set dataTermino(dataTermino: Date) {
        this.$dataTermino = dataTermino;

        this.prepareDias();
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    applyChanges() {
        this.onChange(this.innerValue);
    }

    writeValue(obj: any): void {
        if (this.innerValue != obj) {
            this.innerValue = obj;
            this.prepareDias();
        }
    }

    private prepareDias() {
      if (this.$dataInicio && this.$dataTermino) {
        let anos = [];

        let ano: AnoLeitura;
        let mes: MesLeitura;
        for (let d = this.$dataInicio;
             d.getTime() < this.$dataTermino.getTime();
             d = new Date(d.getTime() + MILLIS_DIA)) {

          if (!ano || ano.ano !== d.getFullYear()) {
            anos.push(ano = {
              ano: d.getFullYear(),
              meses: []
            });
            mes = undefined;
          }

          if (!mes || mes.mes !== d.getMonth()) {
            ano.meses.push(mes = {
              mes: d.getMonth(),
              dias: []
            });
          }

          mes.dias.push({
              data: d
          });
        }

        this.anos = anos;
      }

      if (this.innerValue && this.innerValue.length) {
        for (let dia of this.innerValue) {
            let ano = this.anos.find(a => a.ano == dia.data.getFullYear());

            if (ano) {
                let mes = ano.meses.find(m => m.mes == dia.data.getMonth());

                if (mes) {
                    let dd = mes.dias.find(d => d.data.getDate() == dia.data.getDate());

                    if (dd) {
                        dd.id = dia.id;
                        dd.descricao = dia.descricao
                    }
                }
            }
        }
      }
    }

}

interface AnoLeitura {
  ano: number;
  meses: Array<MesLeitura>;
}

interface MesLeitura {
  mes: number;
  dias: Array<DiaPlanoLeitura>
}