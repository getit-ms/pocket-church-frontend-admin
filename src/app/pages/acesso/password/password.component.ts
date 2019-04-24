import {Component, OnInit} from '@angular/core';
import {IgrejasUsuarioService} from '../../../infra/contexto/igrejas-usuario.service';
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
    private igrejasUsuarioService: IgrejasUsuarioService,
    private acessoService: AcessoService
  ) {
    if (this.igrejasUsuarioService.atual) {
      if (this.igrejasUsuarioService.atual.token) {
        this.router.navigate(['']);
      }
    } else if (this.igrejasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'churches']);
    } else {
      this.router.navigate(['acesso', 'login']);
    }
  }

  ngOnInit() {
    this.requisicao.username = this.igrejasUsuarioService.username;
  }

  get igreja() {
    return this.igrejasUsuarioService.atual.igreja;
  }

  cancelar() {
    this.igrejasUsuarioService.logout();
  }

  async login() {
    const acesso = await this.acessoService.login(this.requisicao).toPromise();
    this.igrejasUsuarioService.login(acesso.auth, {
      membro: acesso.membro,
      funcionalidades: acesso.funcionalidades
    });
  }

}
