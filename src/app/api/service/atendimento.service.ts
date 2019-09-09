import {Injectable} from '@angular/core';
import {Observable} from "rxjs/index";
import {Audio} from "../model/audio";
import {AbstractApiService} from "./api-service.abstract";
import {CalendarioAtendimento} from "../model/calendario-atendimento";
import {Colaborador} from "../model/colaborador";
import {HorarioAtendimento} from "../model/horario-atendimento";
import {AgendamentoAtendimento} from "../model/agendamento-atendimento";
import {EventoAtendimento} from "../model/evento-atendimento";

declare var moment: any;

@Injectable()
export class AtendimentoService extends AbstractApiService {

    consulta(): Observable<Array<CalendarioAtendimento>> {
        return this.doGet('/agenda');
    }

    buscaGerentes(): Observable<Array<Colaborador>> {
        return this.doGet(`/agenda/gerentes`);
    }

    detalha(id: number): Observable<CalendarioAtendimento> {
        return this.doGet(`/agenda/${id}`);
    }

    remove(id: number): Observable<Audio> {
        return this.doDelete(`/agenda/${id}`);
    }

    cadastra(entidade: Audio): Observable<CalendarioAtendimento> {
        return this.doPost('/agenda', entidade);
    }

    cadastraHorario(id: number, horario: HorarioAtendimento): Observable<HorarioAtendimento> {
        return this.doPost(`/agenda/${id}/horario`, {
            diasSemana: horario.diasSemana,
            dataInicio: horario.dataInicio ? moment(horario.dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : undefined,
            dataFim: horario.dataFim ? moment(horario.dataFim).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : undefined,
            horaInicio: horario.horaInicio ? moment(horario.horaInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : undefined,
            horaFim: horario.horaFim ? moment(horario.horaFim).format("YYYY-MM-DDTHH:mm:ss.SSSZZ") : undefined,
        });
    }

    removeHorarioDia(id: number, horario: number, data?: Date): Observable<void> {
        return this.doDelete(`/agenda/${id}/horario/${horario}/dia`, {
            params: {
                data: data ? [<string>moment(data).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : []
            }
        });
    }

    removeHorarioPeriodo(id: number, horario: number, inicio?: Date, termino?: Date): Observable<void> {
        return this.doDelete(`/agenda/${id}/horario/${horario}/periodo`, {
            params: {
                inicio: inicio ? [<string>moment(inicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                fim: termino ? [<string>moment(termino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : []
            }
        });
    }

    agendar(id: number, colaborador: number, horario: number, data: Date): Observable<AgendamentoAtendimento> {
        return this.doPost(`/agenda/${id}/agendar`, {
            colaborador: colaborador,
            horario: horario,
            data: moment(data).format("YYYY-MM-DD")
        });
    }

    confirmar(id: number, aconselhamento: number): Observable<AgendamentoAtendimento> {
        return this.doPost(`/agenda/${id}/confirmar/${aconselhamento}`);
    }

    cancelar(id: number, aconselhamento: number): Observable<AgendamentoAtendimento> {
        return this.doPost(`/agenda/${id}/cancelar/${aconselhamento}`);
    }

    buscaAgendamentos(id?: number, dataInicio?: Date, dataTermino?: Date): Observable<Array<AgendamentoAtendimento>> {
        return this.doGet(`/agenda/${id}/agendamentos`, {
            params: {
                di: dataInicio ? [<string>moment(dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                df: dataTermino ? [<string>moment(dataTermino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : []
            }
        });
    }

    buscaHorarios(id?: number, dataInicio?: Date, dataTermino?: Date): Observable<Array<EventoAtendimento>> {
        return this.doGet(`/agenda/${id}/agenda`, {
            params: {
                di: dataInicio ? [<string>moment(dataInicio).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : [],
                df: dataTermino ? [<string>moment(dataTermino).format("YYYY-MM-DDTHH:mm:ss.SSSZZ")] : []
            }
        });
    }
}