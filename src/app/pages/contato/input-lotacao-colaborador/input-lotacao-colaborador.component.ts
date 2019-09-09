import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {LotacaoColaborador} from "../../../api/model/lotacao-colaborador";
import {ColaboradorService} from "../../../api/service/colaborador.service";
import {ModalLotacaoColaboradorComponent} from "../modal-lotacao-colaborador/modal-lotacao-colaborador.component";

@Component({
    selector: 'app-input-lotacao-colaborador',
    templateUrl: './input-lotacao-colaborador.component.html',
    styleUrls: ['./input-lotacao-colaborador.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputLotacaoColaboradorComponent,
        multi: true
    }]
})
export class InputLotacaoColaboradorComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};

    private $value: LotacaoColaborador;

    lotacoes: Array<LotacaoColaborador>;

    disabled: boolean;

    @Input() placeholder: string;

    constructor(
        private dialog: MatDialog,
        private colaboradorService: ColaboradorService
    ) { }

    get value() {
        return this.$value;
    }

    set value(value: LotacaoColaborador) {
        this.$value = value;
        this.onChange(this.$value);
    }

    ngOnInit() {
        this.busca();
    }

    adicionar() {
        this.dialog.open(ModalLotacaoColaboradorComponent)
            .afterClosed().subscribe((cat) => {
            if (cat) {
                this.busca();
                this.value = cat;
            }
        });
    }

    private async busca() {
        this.lotacoes = await this.colaboradorService.buscaLotacoes().toPromise();
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
        this.$value = obj;
    }

}
