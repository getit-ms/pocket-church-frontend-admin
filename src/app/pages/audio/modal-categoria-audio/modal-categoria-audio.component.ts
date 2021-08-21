import { Component, OnInit } from '@angular/core';
import {AudioService} from "../../../api/service/audio.service";
import {MatDialogRef} from "@angular/material";
import {CategoriaAudio} from "../../../api/model/categoria-audio";
import {Mensageria, TipoMensagem} from "@gafs/infra-core";

@Component({
  selector: 'app-modal-categoria-audio',
  templateUrl: './modal-categoria-audio.component.html',
  styleUrls: ['./modal-categoria-audio.component.scss']
})
export class ModalCategoriaAudioComponent implements OnInit {

  categoria: CategoriaAudio = {};

  constructor(
      private audioService: AudioService,
      private dialogRef: MatDialogRef<CategoriaAudio>,
      private mensageria: Mensageria
  ) { }

  ngOnInit() {}

  async salvar() {
    await this.audioService.cadastraCategorias(this.categoria).toPromise();
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
