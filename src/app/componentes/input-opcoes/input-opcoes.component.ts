import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TelefonePipe} from "@gafs/infra-data";

@Component({
    selector: 'app-input-opcoes',
    templateUrl: './input-opcoes.component.html',
    styleUrls: ['./input-opcoes.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: InputOpcoesComponent,
            multi: true
        }
    ]
})
export class InputOpcoesComponent implements OnInit, ControlValueAccessor {

    private onChange = val => {};
    private onTouched = val => {};

    disabled: boolean = false;
    value: string[];
    private $novaOpcao: string;

    @Input() label: string;
    @Output() change = new EventEmitter();

    constructor() { }

    get novaOpcao() {
        return this.$novaOpcao;
    }

    set novaOpcao(novaOpcao: string) {
        this.$novaOpcao = novaOpcao;
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

        if (this.novaOpcao && this.novaOpcao.length) {
            this.value.push(this.novaOpcao);
            this.novaOpcao = undefined;
            this.onChange(this.value);
            this.change.emit(this.value);
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
        this.change.emit(this.value);
    }

    writeValue(obj: any): void {
        this.value = obj || [];
    }


}
