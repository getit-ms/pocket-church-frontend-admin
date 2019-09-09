import {Component, OnInit} from '@angular/core';
import {EmpresasUsuarioService} from '../../infra/contexto/empresas-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private empresasUsuarioService: EmpresasUsuarioService
  ) { }

  ngOnInit() {}

  get empresa() {
    return this.empresasUsuarioService.atual.empresa;
  }

}
