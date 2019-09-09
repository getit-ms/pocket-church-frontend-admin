import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcessoService} from './service/acesso.service';
import {HttpClientModule} from '@angular/common/http';
import {EmpresaService} from './service/empresa.service';
import {InstitucionalService} from './service/institucional.service';
import {AplicativoService} from './service/aplicativo.service';
import {PerfilService} from './service/perfil.service';
import {ColaboradorService} from './service/colaborador.service';
import {InfraCoreModule} from '@gafs/infra-core';
import {ArquivoService} from './service/arquivo.service';
import {AudioService} from './service/audio.service';
import {NoticiaService} from './service/noticia.service';
import {EstatisticaService} from './service/estatistica.service';
import {BoletimService} from './service/boletim.service';
import {AssetsService} from './service/assets.service';
import {DocumentoService} from './service/documento.service';
import {NotificacaoService} from './service/notificacao.service';
import {MensagemDiaService} from './service/mensagem-dia.service';
import {EnqueteService} from "./service/enquete.service";
import {ContatoColaboradorService} from "./service/contato-colaborador.service";
import {AtendimentoService} from "./service/atendimento.service";
import {EventoService} from "./service/evento.service";
import {ConfiguracaoService} from "./service/configuracao.service";
import {FotoService} from "./service/foto.service";
import {YoutubeService} from "./service/youtube.service";
import {CalendarioService} from "./service/calendario.service";
import {ChamadoService} from "./service/chamado.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        InfraCoreModule
    ],
    providers: [
        AcessoService,
        EmpresaService,
        InstitucionalService,
        AplicativoService,
        ArquivoService,
        PerfilService,
        ColaboradorService,
        AudioService,
        NoticiaService,
        EstatisticaService,
        BoletimService,
        AssetsService,
        DocumentoService,
        NotificacaoService,
        MensagemDiaService,
        EnqueteService,
        ContatoColaboradorService,
        AtendimentoService,
        EventoService,
        ConfiguracaoService,
        FotoService,
        YoutubeService,
        CalendarioService,
        ChamadoService
    ]
})
export class ApiModule { }
