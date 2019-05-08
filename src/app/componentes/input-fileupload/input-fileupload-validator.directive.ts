import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {Directive, Input} from "@angular/core";

@Directive({
    selector: 'input-fileupload',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: FileUploadValidatorDirective,
        multi: true
    }]
})
export class FileUploadValidatorDirective implements Validator {

    @Input() multiple: boolean;

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            if (this.multiple && Array.isArray(control.value)) {

                if (control.value.find(a => a.loading)) {
                    return {'uploading': true};
                } else if (control.value.find(a => a.invalidFormat)) {
                    return {'file_format': true};
                }

            } else if (control.value.loading) {
                return {'uploading': true};
            } else if (control.value.invalidFormat) {
                return {'file_format': true};
            }
        }

        return undefined;
    }

}
