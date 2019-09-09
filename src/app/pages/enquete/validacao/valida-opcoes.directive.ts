import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";
import {QuestaoEnquete} from "../../../api/model/questao-enquete";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";

@Directive({
    selector: 'app-input-questoes',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ValidaOpcoesDirective,
        multi: true
    }]
})
export class ValidaOpcoesDirective implements Validator{

    constructor(
        private mensageria: Mensageria
    ) { }

    validate(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            for (let questao of control.value) {

                if (!questao.questao) {
                  return {
                    questao_required: true
                  };
                }

                if (!questao.opcoes || !questao.opcoes.length) {
                    return {
                        opcoes_required: true
                    };
                } else {
                  for (let opcao of questao.opcoes) {
                      if (!opcao.opcao) {
                          return {
                              opcao_required: true
                          };
                      }
                  }
                }

            }
        }

        return undefined;
    }

}
