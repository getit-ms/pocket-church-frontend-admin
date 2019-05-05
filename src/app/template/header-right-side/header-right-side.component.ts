import { Component, OnInit } from '@angular/core';
import {SessaoService} from '@gafs/infra-autorizacao';
import {Membro} from '../../api/model/membro';
import {MatDialog} from "@angular/material";
import {ModalAjudaComponent} from "../modal-ajuda/modal-ajuda.component";

@Component({
    selector: 'app-header-right-side',
    templateUrl: './header-right-side.component.html',
    styleUrls: ['./header-right-side.component.scss']
})
export class HeaderRightSideComponent implements OnInit {

    membro: Membro;

    constructor(
        private dialog: MatDialog,
        private sessaoService: SessaoService
    ) { }

    ngOnInit() {
        this.sessaoService.principal
            .subscribe(acesso => this.membro = acesso.membro);
    }

    ajuda() {
      this.dialog.open(ModalAjudaComponent);
    }

    logout() {
        this.sessaoService.logout();
    }
}
