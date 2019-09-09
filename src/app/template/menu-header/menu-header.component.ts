import { Component, OnInit } from '@angular/core';
import {EmpresaService} from "../../api/service/empresa.service";
import {Template} from '../../api/model/template';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  template?: Template;

  constructor(
    private empresaService: EmpresaService
  ) { }

  ngOnInit() {
    this.empresaService.template().subscribe(template => this.template = template);
  }

}
