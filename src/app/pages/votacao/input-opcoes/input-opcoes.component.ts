import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {OpcaoVotacao} from "../../../api/model/opcao-votacao";

@Component({
    selector: 'app-input-opcoes',
    templateUrl: './input-opcoes.component.html',
    styleUrls: ['./input-opcoes.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputOpcoesComponent,
        multi: true
    }]
})
export class InputOpcoesComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};

    @Input() indexQuestao: number;
    disabled: boolean;
    value: Array<OpcaoVotacao>;

    constructor() { }

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

    writeValue(obj: any): void {
        this.value = obj;
    }

    add() {
      if (!this.value) {
        this.value = [];
      }

      this.value.push({});
      this.onChange(this.value);
    }

    remove(opcao: OpcaoVotacao) {
      if (this.value) {
        this.value.splice(
            this.value.indexOf(opcao), 1
        );

        if (!this.value.length) {
          this.value = undefined;
        }

        this.onChange(this.value);
      }
    }
}
