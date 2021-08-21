import { Component, OnInit } from '@angular/core';
import {AcessoService} from '../../../api/service/acesso.service';
import {ResumoIgreja} from '../../../api/model/resumo-igreja';
import {IgrejasUsuarioService} from '../../../infra/contexto/igrejas-usuario.service';
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
    private igrejasUsuarioService: IgrejasUsuarioService,
    private acessoService: AcessoService
  ) { }

  ngOnInit() {
    if (this.igrejasUsuarioService.atual) {
      if (this.igrejasUsuarioService.atual.token) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['acesso', 'password']);
      }
    } else if (this.igrejasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'churches']);
    }
  }

  async inicia() {
    const acessos = await this.acessoService.iniciaLogin(this.usuario.email).toPromise();
    await this.igrejasUsuarioService.init(this.usuario.email, acessos);
  }

}
