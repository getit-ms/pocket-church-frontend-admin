import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {QuestaoEnquete} from "../../../api/model/questao-enquete";

@Component({
    selector: 'app-input-questoes',
    templateUrl: './input-questoes.component.html',
    styleUrls: ['./input-questoes.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputQuestoesComponent,
        multi: true
    }]
})
export class InputQuestoesComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};


    @Input() label: string;
    disabled: boolean;
    value: Array<QuestaoEnquete>;

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
      if (!this.value) {
        this.value = [];
      }

      this.value.push({});
      this.onChange(this.value);
    }

    remove(questao: QuestaoEnquete) {
      if (this.value) {
        this.value.splice(
            this.value.indexOf(questao), 1
        );

        if (!this.value.length) {
          this.value = undefined;
        }

        this.onChange(this.value);
      }
    }

    writeValue(obj: any): void {
      this.value = obj;
    }




}
