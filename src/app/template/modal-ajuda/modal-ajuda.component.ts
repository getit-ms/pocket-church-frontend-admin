import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DispositivoService} from "../../infra/dispositivo/dispositivo.service";
import {IgrejasUsuarioService} from "../../infra/contexto/igrejas-usuario.service";
import {TokenService} from "@gafs/infra-autorizacao";
import {environment} from "../../../environments/environment";

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
        private igrejasUsuarioService: IgrejasUsuarioService,
        private router: Router
    ) { }

    ngOnInit() {
        let path = this.router.routerState.snapshot.url.match(/[^/]+/g)[0];
        let dispositivo = this.dispositivoService.uuid;
        let igreja = this.igrejasUsuarioService.atual.igreja.chave;
        let token = this.tokenService.token;

        this.poster = `${environment.ajudaPath}/${path}.jpg?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`;
        this.sources = [
            {
                src: `${environment.ajudaPath}/${path}.m4v?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`,
                type: 'video/m4v'
            },
            {
                src: `${environment.ajudaPath}/${path}.webm?Dispositivo=${dispositivo}&Igreja=${igreja}&Authorization=${token}`,
                type: 'video/webm'
            }
        ];
    }

}
