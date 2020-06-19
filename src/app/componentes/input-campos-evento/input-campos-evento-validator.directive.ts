import { Directive } from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appInputCamposEventoValidator],app-input-campos-evento',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: InputCamposEventoValidatorDirective,
    multi: true
  }]
})
export class InputCamposEventoValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && control.value.length) {
      if (control.value.find(campo => !campo.nome)) {
        return {campoSemNome: true};
      }
    }

    return undefined;
  }
}
