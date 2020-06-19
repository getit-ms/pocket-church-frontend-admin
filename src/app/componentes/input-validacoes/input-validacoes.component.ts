import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {ModalEdicaoValidacoesComponent} from "./modal-edicao-validacoes/modal-edicao-validacoes.component";
import {FormatoCampoEvento, TipoCampoEvento, TipoValidacaoCampo} from "../../api/model/campo-evento";
import {DatePipe} from "@angular/common";
import {MonetarioPipe} from "@gafs/infra-data";

@Component({
    selector: 'app-input-validacoes',
    templateUrl: './input-validacoes.component.html',
    styleUrls: ['./input-validacoes.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputValidacoesComponent,
        multi: true
    }]
})
export class InputValidacoesComponent implements OnInit, ControlValueAccessor {

    private datePipe = new DatePipe('pt-br');
    private monetarioPipe = new MonetarioPipe();

    private onChange = (val) => {
    };
    private onTouched = () => {
    };

    @Input() placeholder: string;
    @Input() tipo: TipoCampoEvento;
    @Input() formato: FormatoCampoEvento;
    @Output() change = new EventEmitter();

    private validacoes: any;
    apresentacaoValidacoes: string;
    disabled = false;

    constructor(
        private translateService: TranslateService,
        private dialog: MatDialog,
    ) {
    }

    ngOnInit() {
    }

    writeValue(obj: any): void {
        this.validacoes = obj;
        this.apresentacaoValidacoes = this.parseApresentacao();
    }

    private parseApresentacao(): string {
        let apresentacao = [];
        if (this.validacoes) {

            if (this.validacoes[TipoValidacaoCampo.OBRIGATORIO]) {
                apresentacao.push(this.translateService.instant('campo_evento.validacao.obrigatorio'));
            }

            if (this.tipo === TipoCampoEvento.NUMERO) {
                if (this.formato === FormatoCampoEvento.MONETARIO) {
                    if (this.validacoes[TipoValidacaoCampo.VALOR_MINIMO]) {
                        apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_minimo',
                            {valor: this.monetarioPipe.transform(this.validacoes[TipoValidacaoCampo.VALOR_MINIMO])}));
                    }

                    if (this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO]) {
                        apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_maximo',
                            {valor: this.monetarioPipe.transform(this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO])}));
                    }
                } else {

                    if (this.validacoes[TipoValidacaoCampo.VALOR_MINIMO]) {
                        apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_minimo',
                            {valor: this.validacoes[TipoValidacaoCampo.VALOR_MINIMO]}));
                    }

                    if (this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO]) {
                        apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_maximo',
                            {valor: this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO]}));
                    }
                }
            }

            if (this.tipo === TipoCampoEvento.DATA) {
                if (this.validacoes[TipoValidacaoCampo.VALOR_MINIMO]) {
                    apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_minimo',
                        {valor: this.datePipe.transform(this.validacoes[TipoValidacaoCampo.VALOR_MINIMO], 'dd/MM/yyyy')}));
                }

                if (this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO]) {
                    apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_maximo',
                        {valor: this.datePipe.transform(this.validacoes[TipoValidacaoCampo.VALOR_MAXIMO], 'dd/MM/yyyy')}));
                }
            }

            if (this.tipo === TipoCampoEvento.TEXTO && this.formato === FormatoCampoEvento.NENHUM) {
                if (this.validacoes[TipoValidacaoCampo.COMPRIMENTO_MINIMO]) {
                    apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_comprimento_minimo',
                        {valor: this.validacoes[TipoValidacaoCampo.COMPRIMENTO_MINIMO]}));
                }

                if (this.validacoes[TipoValidacaoCampo.COMPRIMENTO_MAXIMO]) {
                    apresentacao.push(this.translateService.instant('campo_evento.validacao.valor_comprimento_maximo',
                        {valor: this.validacoes[TipoValidacaoCampo.COMPRIMENTO_MAXIMO]}));
                }
            }

        }

        return apresentacao.length ? apresentacao.join('; ') :
            this.translateService.instant('campo_evento.validacao.sem_validacao');
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

    editar() {
        this.dialog.open(ModalEdicaoValidacoesComponent, {
            data: {
                placeholder: this.placeholder,
                diabled: this.disabled,
                validacoes: this.validacoes,
                tipo: this.tipo,
                formato: this.formato
            }
        }).afterClosed().subscribe(validacoes => {
            if (validacoes) {
                this.validacoes = validacoes;
                this.apresentacaoValidacoes = this.parseApresentacao();
                this.onChange(this.validacoes);
                this.change.emit(this.validacoes);
            }
        });
    }

}
