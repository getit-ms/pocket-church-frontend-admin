import { Component, OnInit } from '@angular/core';
import {IgrejaService} from "../../api/service/igreja.service";
import {Template} from '../../api/model/template';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  template?: Template;

  constructor(
    private igrejaService: IgrejaService
  ) { }

  ngOnInit() {
    this.igrejaService.template().subscribe(template => this.template = template);
  }

}
