import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {InscricaoEvento} from "../../../api/model/inscricao-evento";
import {FormComponent} from "@gafs/infra-formulario";
import {Evento} from "../../../api/model/evento";
import {EventoService} from "../../../api/service/evento.service";
import {LoaderComponent, Mensageria, TipoMensagem} from "@gafs/infra-core";

@Component({
    selector: 'app-form-inscricao',
    templateUrl: './form-inscricao.component.html',
    styleUrls: ['./form-inscricao.component.scss']
})
export class FormInscricaoComponent implements OnInit {

    inscricao: InscricaoEvento = {valores: {}};

    @ViewChild(FormComponent) form: FormComponent;
    @ViewChild('loader') loader: LoaderComponent;

    @Input() evento: Evento;
    @Output() inscritoAdicionado = new EventEmitter<InscricaoEvento>();

    constructor(
        private eventoService: EventoService,
        private mensageria: Mensageria
    ) { }

    ngOnInit() {}

    async adicionar() {
      let inscricao = await this.loader.listen(this.eventoService.realizarInscricao(
          this.evento.id,
          [this.inscricao]
      )).toPromise();

      this.inscricao = {valores: {}};
      this.form.reset();
      this.inscritoAdicionado.emit(inscricao);

      this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
      });
    }

}
