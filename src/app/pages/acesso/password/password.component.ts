import {Component, OnInit} from '@angular/core';
import {EmpresasUsuarioService} from '../../../infra/contexto/empresas-usuario.service';
import {AcessoService} from '../../../api/service/acesso.service';
import {RequisicaoLogin} from '../../../api/model/requisicao-login';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  requisicao: RequisicaoLogin = {
    tipoDispositivo: 'PC',
    version: environment.version
  };

  constructor(
    private router: Router,
    private empresasUsuarioService: EmpresasUsuarioService,
    private acessoService: AcessoService
  ) {
    if (this.empresasUsuarioService.atual) {
      if (this.empresasUsuarioService.atual.token) {
        this.router.navigate(['']);
      }
    } else if (this.empresasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'empresas']);
    } else {
      this.router.navigate(['acesso', 'login']);
    }
  }

  ngOnInit() {
    this.requisicao.username = this.empresasUsuarioService.username;
  }

  get empresa() {
    return this.empresasUsuarioService.atual.empresa;
  }

  cancelar() {
    this.empresasUsuarioService.logout();
  }

  async login() {
    const acesso = await this.acessoService.login(this.requisicao).toPromise();
    this.empresasUsuarioService.login(acesso.auth, {
      colaborador: acesso.colaborador,
      funcionalidades: acesso.funcionalidades
    });
  }

}
