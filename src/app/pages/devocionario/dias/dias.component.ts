import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AcaoService, DialogService, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {DevocionarioService} from "../../../api/service/devocionario.service";
import {take} from "rxjs/operators";
import {DiaDevocionario} from "../../../api/model/dia-devocionario";
import {Boletim} from "../../../api/model/boletim";
import {DatePipe} from "@angular/common";
import {Arquivo} from "../../../api/model/arquivo";
import {NgModel} from "@angular/forms";

@Component({
    selector: 'app-dias',
    templateUrl: './dias.component.html',
    styleUrls: ['./dias.component.scss']
})
export class DiasComponent implements OnInit {

    private dataPipe = new DatePipe('pt-br');

    dataInicio: Date;
    dataTermino: Date;
    dias: Array<DiaDevocionario>;

    constructor(
        private mensageria: Mensageria,
        private dialogService: DialogService,
        private acaoService: AcaoService,
        private devocionarioService: DevocionarioService,
        private translateService: TranslateService
    ) {
    }

    ngOnInit() {
        const hoje = new Date();
        this.dataInicio = new Date(
            hoje.getFullYear(),
            hoje.getMonth(),
            1
        );
        this.dataTermino = new Date(
            hoje.getFullYear(),
            hoje.getMonth() + 1,
            0
        );

        this.buscaMes()
    }

    private buscaMes() {
        let dias = [];
        for (let d = this.dataInicio; d.getTime() <= this.dataTermino.getTime();
             d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
            dias.push({
                data: d,
            });
        }

        this.acaoService.executa(async () => {
            try {
                const resultado = await this.devocionarioService.consulta(
                    this.dataInicio,
                    this.dataTermino,
                    1,
                    31
                ).pipe(take(1)).toPromise();

                if (resultado.resultados) {
                    resultado.resultados.forEach(dia => {
                        let d = dias.find(d0 =>
                            d0.data.getFullYear() === dia.data.getFullYear() &&
                            d0.data.getMonth() === dia.data.getMonth() &&
                            d0.data.getDate() === dia.data.getDate()
                        );

                        if (d) {
                            dias.splice(dias.indexOf(d), 1, dia);
                        }
                    });
                }
            } catch (ex) {
                console.log(ex);
            }

            this.dias = dias;
        });
    }

    async proximo() {
        this.dataInicio = new Date(
            this.dataInicio.getFullYear(),
            this.dataInicio.getMonth() + 1,
            1
        );
        this.dataTermino = new Date(
            this.dataTermino.getFullYear(),
            this.dataTermino.getMonth() + 2,
            0
        );

        await this.buscaMes()
    }

    async anterior() {
        this.dataInicio = new Date(
            this.dataInicio.getFullYear(),
            this.dataInicio.getMonth() - 1,
            1
        );
        this.dataTermino = new Date(
            this.dataTermino.getFullYear(),
            this.dataTermino.getMonth(),
            0
        );

        await this.buscaMes()
    }

    arquivoAtualizado(dia: DiaDevocionario) {
        dia.processando = false;
        dia.publicado = false;
        dia.rejeitado = false;
    }

    salvar() {
        this.acaoService.executa(async () => {
            for (let dia of this.dias) {
                if (dia.arquivo) {
                    if (dia.id) {
                        await this.devocionarioService.atualiza(dia).pipe(take(1)).toPromise();
                    } else {
                        await this.devocionarioService.cadastra(dia).pipe(take(1)).toPromise();
                    }
                } else if (!dia.arquivo && dia.id) {
                    await this.devocionarioService.remove(dia.id).pipe(take(1)).toPromise();

                }
            }

            await this.buscaMes();

            this.mensageria.addMensagem({
                mensagem: 'mensagens.MSG-001',
                tipo: TipoMensagem.SUCESSO
            });
        });
    }


}
