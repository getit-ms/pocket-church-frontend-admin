import {Component, Input, OnInit} from '@angular/core';

interface Valor {
    label: string;
    valor: string;
}

@Component({
    selector: 'app-output-valores-inscricao',
    templateUrl: './output-valores-inscricao.component.html',
    styleUrls: ['./output-valores-inscricao.component.scss']
})
export class OutputValoresInscricaoComponent implements OnInit {

    $valores: Array<Valor> = [];

    constructor() {
    }

    @Input() set valores(valores: any) {
        this.$valores = [];
        if (valores) {
            for (const k of Object.keys(valores)) {
                this.$valores.push({
                    label: k,
                    valor: valores[k]
                });
            }
        }
    }

    get arrayValores() {
        return this.$valores;
    }

    ngOnInit() {
    }

}
