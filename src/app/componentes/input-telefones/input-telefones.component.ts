import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormComponent} from '@gafs/infra-formulario';

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
  novoTelefone: string;

  @Input() label: string;

  @ViewChild('form') form: FormComponent;

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

  add() {
    if (this.disabled) {
      return;
    }

    if (!this.value) {
      this.value = [];
    }

    this.value.push(this.novoTelefone);
    this.novoTelefone = undefined;
    this.onChange(this.value);
    this.form.reset();
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
    this.value = obj;
  }


}
