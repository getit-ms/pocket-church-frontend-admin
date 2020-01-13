import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EventoAtendimento} from "../../../api/model/evento-atendimento";
import {AgendamentoAtendimento} from "../../../api/model/agendamento-atendimento";
import {Colaborador} from "../../../api/model/colaborador";
import {ColaboradorService} from "../../../api/service/colaborador.service";
import {NgForm} from "@angular/forms";
import {AcaoService, DialogService, Mensageria, TipoMensagem} from "@gafs/infra-core";
import {AtendimentoService} from "../../../api/service/atendimento.service";
import {CalendarioAtendimento} from "../../../api/model/calendario-atendimento";

@Component({
    selector: 'app-modal-horario',
    templateUrl: './modal-horario.component.html',
    styleUrls: ['./modal-horario.component.scss']
})
export class ModalHorarioComponent implements OnInit {

    calendario: CalendarioAtendimento;
    horario: EventoAtendimento;
    agendamento: AgendamentoAtendimento;
    colaborador: Colaborador;
    colaboradores: Array<Colaborador>;

    constructor(
        private mensageria: Mensageria,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data : any,
        private colaboradorService: ColaboradorService,
        private dialogService: DialogService,
        private atendimentoService: AtendimentoService,
        private acaoService: AcaoService
    ) {
        this.calendario = data.calendario;
        this.horario = data.horario;
        this.agendamento = data.agendamento;
    }

    ngOnInit() {
        this.buscaColaborador(undefined);
    }

    async buscaColaborador(filtro) {
        let colaboradores = await this.colaboradorService.consulta(filtro, undefined, undefined, undefined, 1, 50).toPromise();

        this.colaboradores = colaboradores.resultados;
    }

    async agendar(form: NgForm) {
        if (this.horario && form.valid) {
            let agendamento = await this.atendimentoService.agendar(
                this.calendario.id,
                this.colaborador.id,
                this.horario.horario.id,
                this.horario.dataInicio
            ).toPromise();

            this.dialogRef.close(true);

            this.dialogRef.afterClosed().subscribe(() => {
                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        }
    }

    async confirmar() {
        if (this.agendamento) {
            await this.atendimentoService.confirmar(
                this.calendario.id,
                this.agendamento.id
            ).toPromise();

            this.dialogRef.close(true);

            this.dialogRef.afterClosed().subscribe(() => {
                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        }
    }

    async cancelar() {
        if (this.agendamento) {
            await this.atendimentoService.cancelar(
                this.calendario.id,
                this.agendamento.id
            ).toPromise();

            this.dialogRef.close(true);

            this.dialogRef.afterClosed().subscribe(() => {
                this.mensageria.addMensagem({
                    mensagem: 'mensagens.MSG-001',
                    tipo: TipoMensagem.SUCESSO
                });
            });
        }
    }

    removerDia() {
        if (this.horario) {
            this.dialogService.confirmacao(
                'mensagens.MSG-020',
                'global.confirmacao_exclusao',
                'global.sim',
                'global.nao'
            ).subscribe(() => {
                this.acaoService.executa(async () => {
                    await this.atendimentoService.removeHorarioDia(
                        this.calendario.id,
                        this.horario.horario.id,
                        this.horario.dataInicio
                    ).toPromise();

                    this.dialogRef.close(true);

                    this.dialogRef.afterClosed().subscribe(() => {
                        this.mensageria.addMensagem({
                            mensagem: 'mensagens.MSG-001',
                            tipo: TipoMensagem.SUCESSO
                        });
                    });
                });
            });
        }
    }

    removerFuturos() {
        if (this.horario) {
            this.dialogService.confirmacao(
                'mensagens.MSG-021',
                'global.confirmacao_exclusao',
                'global.sim',
                'global.nao'
            ).subscribe(() => {
                this.acaoService.executa(async () => {
                    await this.atendimentoService.removeHorarioPeriodo(
                        this.calendario.id,
                        this.horario.horario.id,
                        this.horario.dataInicio
                    ).toPromise();

                    this.dialogRef.close(true);

                    this.dialogRef.afterClosed().subscribe(() => {
                        this.mensageria.addMensagem({
                            mensagem: 'mensagens.MSG-001',
                            tipo: TipoMensagem.SUCESSO
                        });
                    });
                });
            });
        }
    }

}
