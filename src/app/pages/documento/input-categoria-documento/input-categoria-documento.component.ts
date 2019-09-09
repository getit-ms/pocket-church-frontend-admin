import {Component, Input, OnInit} from '@angular/core';
import {DocumentoService} from "../../../api/service/documento.service";
import {CategoriaDocumento} from "../../../api/model/categoria-documento";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {ModalCategoriaDocumentoComponent} from "../modal-categoria-documento/modal-categoria-documento.component";

@Component({
    selector: 'app-input-categoria-documento',
    templateUrl: './input-categoria-documento.component.html',
    styleUrls: ['./input-categoria-documento.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputCategoriaDocumentoComponent,
        multi: true
    }]
})
export class InputCategoriaDocumentoComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};

    private $value: CategoriaDocumento;

    categorias: Array<CategoriaDocumento>;

    disabled: boolean;

    @Input() placeholder: string;

    constructor(
        private dialog: MatDialog,
        private documentoService: DocumentoService
    ) { }

    get value() {
        return this.$value;
    }

    set value(value: CategoriaDocumento) {
        this.$value = value;
        this.onChange(this.$value);
    }

    ngOnInit() {
        this.busca();
    }

    adicionar() {
        this.dialog.open(ModalCategoriaDocumentoComponent)
            .afterClosed().subscribe((cat) => {
            if (cat) {
                this.busca();
                this.value = cat;
            }
        });
    }

    private async busca() {
        this.categorias = await this.documentoService.buscaCategorias().toPromise();
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
