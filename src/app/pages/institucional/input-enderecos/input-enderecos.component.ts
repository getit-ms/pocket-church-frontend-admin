import { Component, OnInit } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Endereco} from '../../../api/model/endereco';

@Component({
  selector: 'app-input-enderecos',
  templateUrl: './input-enderecos.component.html',
  styleUrls: ['./input-enderecos.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputEnderecosComponent,
      multi: true
    }
  ]
})
export class InputEnderecosComponent implements OnInit, ControlValueAccessor {

  private onChange = val => {};
  private onTouched = val => {};

  disabled: boolean = false;
  value: Endereco[];
  ufs = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE',
    'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
    'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
    'SP', 'SE', 'TO'
  ];

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
    this.value.push({});
    this.onChange(this.value);
  }

  remove(endereco: Endereco) {
    if (this.value.length > 1) {
      this.value.splice(
        this.value.indexOf(endereco), 1
      );
    }
  }

  writeValue(obj: any): void {
    this.value = obj || [{}];
  }

}
