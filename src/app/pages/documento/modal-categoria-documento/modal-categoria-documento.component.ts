import { Component, OnInit } from '@angular/core';
import {DocumentoService} from "../../../api/service/documento.service";
import {MatDialogRef} from "@angular/material";
import {CategoriaDocumento} from "../../../api/model/categoria-documento";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";

@Component({
  selector: 'app-modal-categoria-documento',
  templateUrl: './modal-categoria-documento.component.html',
  styleUrls: ['./modal-categoria-documento.component.scss']
})
export class ModalCategoriaDocumentoComponent implements OnInit {

  categoria: CategoriaDocumento = {};

  constructor(
      private documentoService: DocumentoService,
      private dialogRef: MatDialogRef<CategoriaDocumento>,
      private mensageria: Mensageria
  ) { }

  ngOnInit() {}

  async salvar() {
    await this.documentoService.cadastraCategorias(this.categoria).toPromise();
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
