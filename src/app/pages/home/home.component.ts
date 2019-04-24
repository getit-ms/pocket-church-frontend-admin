import {Component, OnInit} from '@angular/core';
import {IgrejasUsuarioService} from '../../infra/contexto/igrejas-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private igrejasUsuarioService: IgrejasUsuarioService
  ) { }

  ngOnInit() {}

  get igreja() {
    return this.igrejasUsuarioService.atual.igreja;
  }

}
