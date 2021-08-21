import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HorarioAtendimento} from "../../../api/model/horario-atendimento";
import {FormComponent} from "@gafs/infra-formulario";

@Component({
  selector: 'app-form-horario',
  templateUrl: './form-horario.component.html',
  styleUrls: ['./form-horario.component.scss']
})
export class FormHorarioComponent implements OnInit {

  horario: HorarioAtendimento = {};

  @Output() horarioAdicionado: EventEmitter<HorarioAtendimento> = new EventEmitter<HorarioAtendimento>();

  @ViewChild(FormComponent) form: FormComponent;

  constructor() { }

  ngOnInit() {}

  adicionar() {
    this.horarioAdicionado.emit(this.horario);
    this.horario = {};
    this.form.reset();
  }

}
