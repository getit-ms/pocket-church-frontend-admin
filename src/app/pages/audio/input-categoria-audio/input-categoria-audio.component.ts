import {Component, Input, OnInit} from '@angular/core';
import {AudioService} from "../../../api/service/audio.service";
import {CategoriaAudio} from "../../../api/model/categoria-audio";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {ModalCategoriaAudioComponent} from "../modal-categoria-audio/modal-categoria-audio.component";

@Component({
    selector: 'app-input-categoria-audio',
    templateUrl: './input-categoria-audio.component.html',
    styleUrls: ['./input-categoria-audio.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputCategoriaAudioComponent,
        multi: true
    }]
})
export class InputCategoriaAudioComponent implements OnInit, ControlValueAccessor {

    private onChange: any = () => {};
    private onTouched: any = () => {};

    private $value: CategoriaAudio;

    categorias: Array<CategoriaAudio>;

    disabled: boolean;

    @Input() placeholder: string;

    constructor(
        private dialog: MatDialog,
        private audioService: AudioService
    ) { }

    get value() {
        return this.$value;
    }

    set value(value: CategoriaAudio) {
        this.$value = value;
        this.onChange(this.$value);
    }

    ngOnInit() {
        this.busca();
    }

    adicionar() {
        this.dialog.open(ModalCategoriaAudioComponent)
            .afterClosed().subscribe((cat) => {
            if (cat) {
                this.busca();
                this.value = cat;
            }
        });
    }

    private async busca() {
        this.categorias = await this.audioService.buscaCategorias().toPromise();
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
