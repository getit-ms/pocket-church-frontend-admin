import {Component, OnInit} from '@angular/core';
import {ModalAjudaComponent} from "./modal-ajuda/modal-ajuda.component";
import {MatDialog} from "@angular/material";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-ajuda',
    templateUrl: './ajuda.component.html',
    styleUrls: ['./ajuda.component.scss']
})
export class AjudaComponent implements OnInit {

    path: string;

    constructor(
        private dialog: MatDialog,
        private router: Router
    ) { }

    ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                let match = this.router.routerState.snapshot.url.match(/[^/]+/g);
                this.path = match ? match[0] : undefined;
            }
        })
    }

    ajuda() {
        this.dialog.open(ModalAjudaComponent, {
            data: this.path
        });
    }
}
