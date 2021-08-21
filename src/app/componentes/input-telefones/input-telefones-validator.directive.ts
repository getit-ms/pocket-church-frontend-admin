import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Directive, Input} from "@angular/core";

@Directive({
    selector: 'app-input-telefones',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: InputTelefonesValidatorDirective,
        multi: true
    }]
})
export class InputTelefonesValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            if (control.value.find(tel => tel.length != 10 && tel.length != 11)) {
                return {telefone_incompleto: true};
            }
        }

        return undefined;
    }

}
