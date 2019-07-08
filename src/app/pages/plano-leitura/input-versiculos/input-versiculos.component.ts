import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DiaPlanoLeitura} from "../../../api/model/dia-plano-leitura";

export const MILLIS_DIA = 1000 * 60 * 60 * 24;

@Component({
    exportAs: 'appInputVersiculos',
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

    private onChange: any = val => {};
    private onTouched: any = val => {};

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

    private maskDay(data: Date) {
        return data.getFullYear() * 10000 + data.getMonth() * 100 + data.getDate();
    }

    private prepareDias() {
        if (this.$dataInicio && this.$dataTermino) {
            let anos = [];

            let ano: AnoLeitura;
            let mes: MesLeitura;
            let final = this.maskDay(this.$dataTermino);
            for (let d = this.$dataInicio;
                 this.maskDay(d) <= final;
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
                            mes.dias.splice(
                                mes.dias.indexOf(dd),
                                1,
                                dia
                            );
                        }
                    }
                }
            }
        }

        if (this.anos) {
            let result = [];

            for (let a of this.anos) {
                for (let m of a.meses) {
                    result.push(...m.dias);
                }
            }

            this.innerValue = result;
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