import { Component, OnInit } from '@angular/core';
import {EmpresasUsuarioService} from '../../../infra/contexto/empresas-usuario.service';
import {ResumoEmpresa} from '../../../api/model/resumo-empresa';
import {Router} from '@angular/router';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.scss']
})
export class EmpresasComponent implements OnInit {

  empresas: ResumoEmpresa[];

  constructor(
    private router: Router,
    private empresasUsuarioService: EmpresasUsuarioService
  ) {
    if (this.empresasUsuarioService.atual) {
      if (this.empresasUsuarioService.atual.token) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['acesso', 'password']);
      }
    } else if (!this.empresasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'login']);
    }
  }

  ngOnInit() {
    this.empresas = this.empresasUsuarioService.contextos
      .map(ctx => ctx.empresa).sort((i1, i2) => i1.nomeAplicativo.localeCompare(i2.nomeAplicativo));
  }

  seleciona(empresa: ResumoEmpresa) {
    this.empresasUsuarioService.select(empresa);
  }

  cancelar() {
    this.empresasUsuarioService.logout();
  }

}
