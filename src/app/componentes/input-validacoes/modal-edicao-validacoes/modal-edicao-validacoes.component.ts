import {Component, Inject, OnInit} from '@angular/core';
import {FormatoCampoEvento, TipoCampoEvento, TipoValidacaoCampo} from "../../../api/model/campo-evento";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface ModalEdicaoData {
    placeholder: string;
    tipo: TipoCampoEvento,
    formato: FormatoCampoEvento;
    disabled: boolean;
    validacoes: any;
}

@Component({
    selector: 'app-modal-edicao-validacoes',
    templateUrl: './modal-edicao-validacoes.component.html',
    styleUrls: ['./modal-edicao-validacoes.component.scss']
})
export class ModalEdicaoValidacoesComponent implements OnInit {

    validacoes: any = {};

    constructor(
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: ModalEdicaoData,
    ) {
        this.validacoes = data.validacoes || {};
    }

    ngOnInit() {
    }

    aplicar() {
        this.dialogRef.close(this.validacoes);
    }

    cancelar() {
        this.dialogRef.close();
    }

}
