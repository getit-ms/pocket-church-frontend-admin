import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {AcessoService} from "../../../api/service/acesso.service";
import {ResumoIgreja} from "../../../api/model/resumo-igreja";
import {IgrejaService} from "../../../api/service/igreja.service";
import {LoaderComponent} from "@gafs/infra-core";
import {Membro} from "../../../api/model/membro";
import {IgrejasUsuarioService} from "../../../infra/contexto/igrejas-usuario.service";

@Component({
    selector: 'app-redefine',
    templateUrl: './redefine.component.html',
    styleUrls: ['./redefine.component.scss'],
})
export class RedefineComponent implements AfterViewInit {

    igreja: ResumoIgreja;
    membro: Membro;

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private igrejaService: IgrejaService,
        private igrejasUsuarioService: IgrejasUsuarioService,
        private activatedRoute: ActivatedRoute,
        private acessoService: AcessoService
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (params.igreja) {
                this.buscaIgreja(params.igreja);
            }
        });
    }

    private async buscaIgreja(chave: string) {
        this.igreja = await this.igrejaService.busca(chave).toPromise();

        await this.igrejasUsuarioService.applyMetadata(this.igreja);
    }

    async ngAfterViewInit() {
        let token = this.activatedRoute.snapshot.params.token;

        this.membro = await this.loader.listen(
            this.acessoService.redefinirSenha(token)
        ).toPromise();
    }

    fechar() {
      window.close();
    }
}
