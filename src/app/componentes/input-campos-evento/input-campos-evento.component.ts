import {Component, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CampoEvento, FormatoCampoEvento, TipoCampoEvento} from "../../api/model/campo-evento";

@Component({
    selector: 'app-input-campos-evento',
    templateUrl: './input-campos-evento.component.html',
    styleUrls: ['./input-campos-evento.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputCamposEventoComponent,
        multi: true
    }]
})
export class InputCamposEventoComponent implements OnInit, ControlValueAccessor {

    private onChange = (val) => {
    };
    private onTouched = () => {
    };

    campos: Array<CampoEvento>;
    disabled = false;

    constructor() {
    }

    ngOnInit() {
    }

    writeValue(obj: any): void {
        this.campos = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    adicionar() {
        const campo = {tipo: TipoCampoEvento.TEXTO, formato: FormatoCampoEvento.NENHUM};
        if (!this.campos) {
            this.campos = [campo];
        } else {
            this.campos.push(campo);
        }
        this.onChange(this.campos);
    }

    remover(campo: CampoEvento) {
        if (this.campos) {
            this.campos.splice(
                this.campos.indexOf(campo), 1
            );
            this.onChange(this.campos);
        }
    }

    notifyChanges() {
        this.onChange(this.campos);
    }
}
