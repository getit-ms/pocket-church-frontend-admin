import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {EventoAconselhamento} from "../../../api/model/evento-aconselhamento";
import {AgendamentoAtendimento} from "../../../api/model/agendamento-atendimento";
import {Membro} from "../../../api/model/membro";
import {MembroService} from "../../../api/service/membro.service";
import {NgForm} from "@angular/forms";
import {AcaoService, DialogService, Mensageria, TipoMensagem} from "@gafs/infra-core";
import {AconselhamentoService} from "../../../api/service/aconselhamento.service";
import {CalendarioAtendimento} from "../../../api/model/calendario-atendimento";

@Component({
    selector: 'app-modal-horario',
    templateUrl: './modal-horario.component.html',
    styleUrls: ['./modal-horario.component.scss']
})
export class ModalHorarioComponent implements OnInit {

    calendario: CalendarioAtendimento;
    horario: EventoAconselhamento;
    agendamento: AgendamentoAtendimento;
    membro: Membro;
    membros: Array<Membro>;

    constructor(
        private mensageria: Mensageria,
        private dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) data : any,
        private membroService: MembroService,
        private dialogService: DialogService,
        private aconselhamentoService: AconselhamentoService,
        private acaoService: AcaoService
    ) {
        this.calendario = data.calendario;
        this.horario = data.horario;
        this.agendamento = data.agendamento;
    }

    ngOnInit() {
        this.buscaMembro(undefined);
    }

    async buscaMembro(filtro) {
        let membros = await this.membroService.consulta(filtro, undefined, undefined, 1, 50).toPromise();

        this.membros = membros.resultados;
    }

    async agendar(form: NgForm) {
        if (this.horario && form.valid) {
            let agendamento = await this.aconselhamentoService.agendar(
                this.calendario.id,
                this.membro.id,
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
            await this.aconselhamentoService.confirmar(
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
            await this.aconselhamentoService.cancelar(
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
                    await this.aconselhamentoService.removeHorarioDia(
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
                    await this.aconselhamentoService.removeHorarioPeriodo(
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
