import { Component, OnInit } from '@angular/core';
import {DocumentoService} from "../../../api/service/documento.service";
import {MatDialogRef} from "@angular/material";
import {CategoriaDocumento} from "../../../api/model/categoria-documento";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";
import {LotacaoColaborador} from "../../../api/model/lotacao-colaborador";
import {ColaboradorService} from "../../../api/service/colaborador.service";

@Component({
  selector: 'app-modal-lotacao-colaborador',
  templateUrl: './modal-lotacao-colaborador.component.html',
  styleUrls: ['./modal-lotacao-colaborador.component.scss']
})
export class ModalLotacaoColaboradorComponent implements OnInit {

  lotacao: LotacaoColaborador = {};

  constructor(
      private colaboradorService: ColaboradorService,
      private dialogRef: MatDialogRef<LotacaoColaborador>,
      private mensageria: Mensageria
  ) { }

  ngOnInit() {}

  async salvar() {
    await this.colaboradorService.cadastraLotacao(this.lotacao).toPromise();
    this.dialogRef.afterClosed().subscribe(() => {
      this.mensageria.addMensagem({
          mensagem: 'mensagens.MSG-001',
          tipo: TipoMensagem.SUCESSO
      });
    });
    this.dialogRef.close(this.lotacao);
  }

  cancelar() {
      this.dialogRef.close();
  }
}
