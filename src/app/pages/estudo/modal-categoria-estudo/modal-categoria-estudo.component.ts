import { Component, OnInit } from '@angular/core';
import {EstudoService} from "../../../api/service/estudo.service";
import {MatDialogRef} from "@angular/material";
import {CategoriaEstudo} from "../../../api/model/categoria-estudo";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";

@Component({
  selector: 'app-modal-categoria-estudo',
  templateUrl: './modal-categoria-estudo.component.html',
  styleUrls: ['./modal-categoria-estudo.component.scss']
})
export class ModalCategoriaEstudoComponent implements OnInit {

  categoria: CategoriaEstudo = {};

  constructor(
      private estudoService: EstudoService,
      private dialogRef: MatDialogRef<CategoriaEstudo>,
      private mensageria: Mensageria
  ) { }

  ngOnInit() {}

  async salvar() {
    await this.estudoService.cadastraCategorias(this.categoria).toPromise();
    this.dialogRef.afterClosed().subscribe(() => {
      this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
      });
    });
    this.dialogRef.close(this.categoria);
  }

  cancelar() {
      this.dialogRef.close();
  }
}
