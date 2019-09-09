import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TelefonePipe} from "@gafs/infra-data";

@Component({
    selector: 'app-input-telefones',
    templateUrl: './input-telefones.component.html',
    styleUrls: ['./input-telefones.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputTelefonesComponent,
            multi: true
        }
    ]
})
export class InputTelefonesComponent implements OnInit, ControlValueAccessor {

    private onChange = val => {};
    private onTouched = val => {};

    disabled: boolean = false;
    value: string[];
    private $novoTelefone: string;

    @Input() label: string;

    constructor() { }

    get novoTelefone() {
        return this.$novoTelefone;
    }

    set novoTelefone(novoTelefone: string) {
        this.$novoTelefone = this.mask((novoTelefone || '').replace(/\D/g, ''));
    }

    private mask(unmasked: string) {
        let masked = '';

        if (unmasked.length > 10) {
            masked = `(${unmasked.substring(0 , 2)}) ${unmasked.substring(2 , 7)}-${unmasked.substring(7)}`;
        } else if (unmasked.length > 6) {
            masked = `(${unmasked.substring(0 , 2)}) ${unmasked.substring(2 , 6)}-${unmasked.substring(6)}`;
        } else if (unmasked.length > 2) {
            masked = `(${unmasked.substring(0 , 2)}) ${unmasked.substring(2)}`;
        } else if (unmasked.length) {
            masked = `(${unmasked}`;
        }

        return masked;
    }

    ngOnInit() {}

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    add() {
        if (this.disabled) {
            return;
        }

        if (!this.value) {
            this.value = [];
        }

        let unformated = this.novoTelefone.replace(/\D/g, '');
        if (unformated.length >= 10 && unformated.length <= 11) {
            this.value.push(unformated);
            this.novoTelefone = undefined;
            this.onChange(this.value);
        } else if (unformated.length) {
            this.onChange([...this.value, unformated]);
        } else {
            this.onChange(this.value);
        }
    }

    remove(telefone: string) {
        if (this.disabled) {
            return;
        }

        this.value.splice(
            this.value.indexOf(telefone), 1
        );

        if (!this.value.length) {
            this.value = undefined;
        }

        this.onChange(this.value);
    }

    writeValue(obj: any): void {
        this.value = (obj || []).filter(tel => tel.length >= 10 && tel.length <= 11);
        this.novoTelefone = (obj || []).find(tel => tel.length < 10);
    }


}
