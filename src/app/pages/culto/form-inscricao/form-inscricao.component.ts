import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {InscricaoEvento, ValorInscricaoEvento} from "../../../api/model/inscricao-evento";
import {FormComponent} from "@gafs/infra-formulario";
import {Evento} from "../../../api/model/evento";
import {EventoService} from "../../../api/service/evento.service";
import {LoaderComponent, Mensageria, TipoMensagem} from "@gafs/infra-core";
import {TipoCampoEvento} from "../../../api/model/campo-evento";

@Component({
    selector: 'app-form-inscricao',
    templateUrl: './form-inscricao.component.html',
    styleUrls: ['./form-inscricao.component.scss']
})
export class FormInscricaoComponent implements OnInit {

    inscricao: InscricaoEvento = {};
    valoresInscricao: any = {};

    @ViewChild(FormComponent) form: FormComponent;
    @ViewChild('loader') loader: LoaderComponent;

    @Input() culto: Evento;
    @Output() inscritoAdicionado = new EventEmitter<InscricaoEvento>();

    constructor(
        private eventoService: EventoService,
        private mensageria: Mensageria
    ) {
    }

    ngOnInit() {
    }

    private mapValoresInscricao(): Array<ValorInscricaoEvento> {
        const valores = [];

        for (const k of Object.keys(this.valoresInscricao)) {
            const campo = this.culto.campos.find(c => String(c.id) === String(k));
            valores.push({
                nome: campo.nome,
                formato: campo.formato,
                valorTexto: campo.tipo === TipoCampoEvento.TEXTO ||
                            campo.tipo === TipoCampoEvento.MULTIPLA_ESCOLHA ? this.valoresInscricao[k] : undefined,
                valorNumero: campo.tipo === TipoCampoEvento.NUMERO ? this.valoresInscricao[k] : undefined,
                valorData: campo.tipo === TipoCampoEvento.DATA ? this.valoresInscricao[k] : undefined,
                valorAnexo: campo.tipo === TipoCampoEvento.ANEXO ? this.valoresInscricao[k] : undefined,
            });
        }

        return valores;
    }

    async adicionar() {
        let inscricao = await this.loader.listen(this.eventoService.realizarInscricao(
            this.culto.id,
            [{
                ...this.inscricao,
                valores: this.mapValoresInscricao(),
            }]
        )).toPromise();

        this.inscricao = {};
        this.valoresInscricao = {};
        this.form.reset();
        this.inscritoAdicionado.emit(inscricao);

        this.mensageria.addMensagem({
            mensagem: 'mensagens.MSG-001',
            tipo: TipoMensagem.SUCESSO
        });
    }

}
