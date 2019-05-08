import {Component, Input, OnInit} from '@angular/core';
import {EstudoService} from "../../../api/service/estudo.service";
import {CategoriaEstudo} from "../../../api/model/categoria-estudo";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {ModalCategoriaEstudoComponent} from "../modal-categoria-estudo/modal-categoria-estudo.component";

@Component({
    selector: 'app-input-categoria-estudo',
    templateUrl: './input-categoria-estudo.component.html',
    styleUrls: ['./input-categoria-estudo.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputCategoriaEstudoComponent,
        multi: true
    }]
})
export class InputCategoriaEstudoComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};

    private $value: CategoriaEstudo;

    categorias: Array<CategoriaEstudo>;

    disabled: boolean;

    @Input() placeholder: string;

    constructor(
        private dialog: MatDialog,
        private estudoService: EstudoService
    ) { }

    get value() {
        return this.$value;
    }

    set value(value: CategoriaEstudo) {
        this.$value = value;
        this.onChange(this.$value);
    }

    ngOnInit() {
        this.busca();
    }

    adicionar() {
        this.dialog.open(ModalCategoriaEstudoComponent)
            .afterClosed().subscribe((cat) => {
            if (cat) {
                this.busca();
                this.value = cat;
            }
        });
    }

    private async busca() {
        this.categorias = await this.estudoService.buscaCategorias().toPromise();
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
