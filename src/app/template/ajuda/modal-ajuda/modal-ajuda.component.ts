import {Component, Inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DispositivoService} from "../../../infra/dispositivo/dispositivo.service";
import {EmpresasUsuarioService} from "../../../infra/contexto/empresas-usuario.service";
import {TokenService} from "@gafs/infra-autorizacao";
import {environment} from "../../../../environments/environment";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
    selector: 'app-modal-ajuda',
    templateUrl: './modal-ajuda.component.html',
    styleUrls: ['./modal-ajuda.component.scss']
})
export class ModalAjudaComponent implements OnInit {

    poster: string;
    sources: Array<{src: string, type: string}>;

    constructor(
        private tokenService: TokenService,
        private dispositivoService: DispositivoService,
        private empresasUsuarioService: EmpresasUsuarioService,
        @Inject(MAT_DIALOG_DATA) private path: string
    ) { }

    ngOnInit() {
        let dispositivo = this.dispositivoService.uuid;
        let empresa = this.empresasUsuarioService.atual.empresa.chave;
        let token = this.tokenService.token;

        this.poster = `${environment.ajudaPath}/${this.path}.jpg?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`;
        this.sources = [
            {
                src: `${environment.ajudaPath}/${this.path}.m4v?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`,
                type: 'video/m4v'
            },
            {
                src: `${environment.ajudaPath}/${this.path}.webm?Dispositivo=${dispositivo}&Empresa=${empresa}&Authorization=${token}`,
                type: 'video/webm'
            }
        ];
    }

}
