import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AbstractFormComponent} from '@gafs/infra-template';
import {ActivatedRoute, Router} from '@angular/router';
import {LoaderComponent, Mensageria, TipoMensagem} from '@gafs/infra-core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {CalendarioAtendimento} from "../../../api/model/calendario-atendimento";
import {AconselhamentoService} from "../../../api/service/aconselhamento.service";
import {Membro} from "../../../api/model/membro";
import {CalendarSchedulerEvent, CalendarSchedulerEventAction} from "angular-calendar-scheduler";
import {DatePipe} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material";
import {ModalHorarioComponent} from "../modal-horario/modal-horario.component";
import {HorarioAtendimento} from "../../../api/model/horario-atendimento";

@Component({
    selector: 'app-edicao',
    templateUrl: './edicao.component.html',
    styleUrls: ['./edicao.component.scss']
})
export class EdicaoComponent extends AbstractFormComponent<CalendarioAtendimento> implements AfterViewInit {

    pastores: Array<Membro>;

    viewDate: Date;
    minHour: number;
    maxHour: number;
    events: CalendarSchedulerEvent[] = [];

    horario: HorarioAtendimento = {};

    private dataPipe = new DatePipe('pt-br');

    @ViewChild('loader') loader: LoaderComponent;

    constructor(
        private sessaoService: SessaoService,
        private mensageria: Mensageria,
        private dialog: MatDialog,
        private translateService: TranslateService,
        private aconselhamentoService: AconselhamentoService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
    ) {
        super();

        this.aconselhamentoService.buscaPastores()
            .subscribe(pastores => {
                if (!this.calendario.id) {
                    this.pastores = pastores;
                }
            });
    }

    get calendario() {
        return this.entidade;
    }

    protected async carregaEntidade(id: any) {
        this.entidade = await this.aconselhamentoService.detalha(id).toPromise();
        this.pastores = [this.entidade.pastor];
        this.hoje();
    }

    async adicionarHorario(horario: HorarioAtendimento) {
        await this.aconselhamentoService.cadastraHorario(
            this.calendario.id,
            horario
        ).toPromise();

        this.buscaEventos();

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

    async salvar() {
        if (this.entidade.id) {
            return;
        }

        this.entidade = await this.aconselhamentoService.cadastra(this.calendario).toPromise();

        await this.router.navigate(['../', String(this.calendario.id), 'update'], {
            relativeTo: this.activatedRoute
        });

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

    proxima() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + 7);
        this.buscaEventos();
    }

    hoje() {
        this.viewDate = new Date();
        this.buscaEventos();
    }

    anterior() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - 7);
        this.buscaEventos();
    }

    abrir(event) {
        this.dialog.open(ModalHorarioComponent, {
            data: {
                calendario: this.calendario,
                horario: event.event.horario,
                agendamento: event.event.agendamento
            }
        }).afterClosed().subscribe((sucesso) => {
            if (sucesso) {
                this.buscaEventos();
            }
        });
    }

    private async buscaEventos() {
        this.minHour = 8;
        this.maxHour = 18;

        let horarios = await this.loader.listen(this.aconselhamentoService.buscaHorarios(
            this.calendario.id,
            new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - this.viewDate.getDay()),
            new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + (7 - this.viewDate.getDay()))
        )).toPromise();

        horarios.forEach(h => {
            if (h.dataInicio.getHours() < this.minHour) {
                this.minHour = h.dataInicio.getHours();
            }

            if (h.dataTermino.getHours() > this.maxHour) {
                this.maxHour = h.dataTermino.getHours();
            }
        });

        let eventos: any = horarios.map(h => ({
            start: h.dataInicio,
            end: h.dataTermino,
            color: {
                primary: '#333',
                secondary: '#eee'
            },
            content: this.translateService.instant('agenda.horario.titulo'),
            title: `${this.dataPipe.transform(h.dataInicio, 'HH:mm')} - ${this.dataPipe.transform(h.dataTermino, 'HH:mm')}`,
            isClickable: true,
            actions: [],
            horario: h
        }));

        let agendamentos = await this.loader.listen(this.aconselhamentoService.buscaAgendamentos(
            this.calendario.id,
            new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() - this.viewDate.getDay()),
            new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + (7 - this.viewDate.getDay()))
        )).toPromise();

        agendamentos.forEach(a => {
            if (a.dataHoraInicio.getHours() < this.minHour) {
                this.minHour = a.dataHoraInicio.getHours();
            }

            if (a.dataHoraFim.getHours() > this.maxHour) {
                this.maxHour = a.dataHoraFim.getHours();
            }
        });

        eventos.push(...agendamentos.map(a => ({
            start: a.dataHoraInicio,
            end: a.dataHoraFim,
            color: !a.naoConfirmado ? undefined : {
                primary: '#f33',
                secondary: '#fcc'
            },
            title: `${this.dataPipe.transform(a.dataHoraInicio, 'HH:mm')} - ${this.dataPipe.transform(a.dataHoraFim, 'HH:mm')}`,
            content: a.membro.nome,
            isClickable: true,
            actions: [],
            agendamento: a
        })));

        this.events = eventos;
    }
}
