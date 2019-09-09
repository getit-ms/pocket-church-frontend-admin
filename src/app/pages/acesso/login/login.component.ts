import { Component, OnInit } from '@angular/core';
import {AcessoService} from '../../../api/service/acesso.service';
import {ResumoEmpresa} from '../../../api/model/resumo-empresa';
import {EmpresasUsuarioService} from '../../../infra/contexto/empresas-usuario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: {email?: string} = {};

  constructor(
    private router: Router,
    private empresasUsuarioService: EmpresasUsuarioService,
    private acessoService: AcessoService
  ) { }

  ngOnInit() {
    if (this.empresasUsuarioService.atual) {
      if (this.empresasUsuarioService.atual.token) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['acesso', 'password']);
      }
    } else if (this.empresasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'empresas']);
    }
  }

  async inicia() {
    const acessos = await this.acessoService.iniciaLogin(this.usuario.email).toPromise();
    await this.empresasUsuarioService.init(this.usuario.email, acessos);
  }

}
