import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AcessoService} from './service/acesso.service';
import {HttpClientModule} from '@angular/common/http';
import {IgrejaService} from './service/igreja.service';
import {InstitucionalService} from './service/institucional.service';
import {AplicativoService} from './service/aplicativo.service';
import {MinisterioService} from './service/ministerio.service';
import {PerfilService} from './service/perfil.service';
import {MembroService} from './service/membro.service';
import {InfraCoreModule} from '@gafs/infra-core';
import {ArquivoService} from './service/arquivo.service';
import {AudioService} from './service/audio.service';
import {NoticiaService} from './service/noticia.service';
import {EstatisticaService} from './service/estatistica.service';
import {BoletimService} from './service/boletim.service';
import {CifraService} from './service/cifra.service';
import {AssetsService} from './service/assets.service';
import {EstudoService} from './service/estudo.service';
import {NotificacaoService} from './service/notificacao.service';
import {VersiculoService} from './service/versiculo.service';
import {PlanoLeituraService} from "./service/plano-leitura.service";
import {VotacaoService} from "./service/votacao.service";
import {PedidoOracaoService} from "./service/pedido-oracao.service";
import {AconselhamentoService} from "./service/aconselhamento.service";
import {EventoService} from "./service/evento.service";
import {ConfiguracaoService} from "./service/configuracao.service";
import {FotoService} from "./service/foto.service";
import {VideoFacebookService} from "./service/video-facebook.service";
import {YoutubeService} from "./service/youtube.service";
import {CalendarioService} from "./service/calendario.service";
import {ChamadoService} from "./service/chamado.service";
import {DevocionarioService} from "./service/devocionario.service";
import {TermoAceiteService} from "./service/termo-aceite.service";
import {BannerService} from "./service/banner.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        InfraCoreModule
    ],
    providers: [
        AcessoService,
        IgrejaService,
        InstitucionalService,
        AplicativoService,
        MinisterioService,
        ArquivoService,
        PerfilService,
        MembroService,
        AudioService,
        NoticiaService,
        EstatisticaService,
        BoletimService,
        CifraService,
        AssetsService,
        EstudoService,
        NotificacaoService,
        VersiculoService,
        PlanoLeituraService,
        VotacaoService,
        PedidoOracaoService,
        AconselhamentoService,
        EventoService,
        ConfiguracaoService,
        FotoService,
        VideoFacebookService,
        YoutubeService,
        CalendarioService,
        ChamadoService,
        DevocionarioService,
        TermoAceiteService,
        BannerService,
    ]
})
export class ApiModule { }
