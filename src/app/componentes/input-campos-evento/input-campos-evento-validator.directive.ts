import {Directive} from '@angular/core';
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

    constructor() {
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value && control.value.length) {
            if (control.value.find(campo => !campo.nome)) {
                return {campoSemNome: true};
            }

            for (const campo of control.value) {
                if (control.value.find(outro => outro !== campo &&
                    outro.nome.toLowerCase() === campo.nome.toLowerCase())) {
                    return {campoNomeRepetido: {nome: campo.nome}};
                }
            }
        }

        return undefined;
    }
}
