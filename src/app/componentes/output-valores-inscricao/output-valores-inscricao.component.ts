import {Component, Input, OnInit} from '@angular/core';
import {ValorInscricaoEvento} from "../../api/model/inscricao-evento";

@Component({
    selector: 'app-output-valores-inscricao',
    templateUrl: './output-valores-inscricao.component.html',
    styleUrls: ['./output-valores-inscricao.component.scss']
})
export class OutputValoresInscricaoComponent implements OnInit {

    @Input() valores:Array<ValorInscricaoEvento> = [];

    constructor() {
    }

    ngOnInit() {
    }

}
