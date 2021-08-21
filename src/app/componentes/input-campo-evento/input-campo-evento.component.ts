import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, NgModel,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {CampoEvento} from "../../api/model/campo-evento";

@Component({
  selector: 'app-input-campo-evento',
  templateUrl: './input-campo-evento.component.html',
  styleUrls: ['./input-campo-evento.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputCampoEventoComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputCampoEventoComponent,
      multi: true
    }
  ]
})
export class InputCampoEventoComponent implements OnInit, ControlValueAccessor, Validator {

  private onChange = (val) => {};
  private onTouched = () => {};

  @Input() campo: CampoEvento;

  @ViewChild(NgModel) model: NgModel;

  private $value: string;
  disabled = false;

  constructor() { }

  ngOnInit() {
  }

  get value() {
    return this.$value;
  }

  set value(value: string) {
    this.$value = value;
    this.onChange(value);
  }

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

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.model) {
      return this.model.errors;
    }

    return undefined;
  }

}
