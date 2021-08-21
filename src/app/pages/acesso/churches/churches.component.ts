import { Component, OnInit } from '@angular/core';
import {IgrejasUsuarioService} from '../../../infra/contexto/igrejas-usuario.service';
import {ResumoIgreja} from '../../../api/model/resumo-igreja';
import {Router} from '@angular/router';

@Component({
  selector: 'app-churches',
  templateUrl: './churches.component.html',
  styleUrls: ['./churches.component.scss']
})
export class ChurchesComponent implements OnInit {

  igrejas: ResumoIgreja[];

  constructor(
    private router: Router,
    private igrejasUsuarioService: IgrejasUsuarioService
  ) {
    if (this.igrejasUsuarioService.atual) {
      if (this.igrejasUsuarioService.atual.token) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['acesso', 'password']);
      }
    } else if (!this.igrejasUsuarioService.contextos) {
      this.router.navigate(['acesso', 'login']);
    }
  }

  ngOnInit() {
    this.igrejas = this.igrejasUsuarioService.contextos
      .map(ctx => ctx.igreja).sort((i1, i2) => i1.nomeAplicativo.localeCompare(i2.nomeAplicativo));
  }

  seleciona(igreja: ResumoIgreja) {
    this.igrejasUsuarioService.select(igreja);
  }

  cancelar() {
    this.igrejasUsuarioService.logout();
  }

}
