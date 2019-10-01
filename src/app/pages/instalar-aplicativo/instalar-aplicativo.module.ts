import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DownloadComponent} from './download/download.component';
import {InfraCoreModule} from "@gafs/infra-core";
import {ComponentesModule} from "../../componentes/componentes.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatCardModule, MatIconModule} from "@angular/material";
import {InfraDataModule} from "@gafs/infra-data";
import {InfraFormularioModule} from "@gafs/infra-formulario";

@NgModule({
  declarations: [DownloadComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatIconModule,
        ComponentesModule,
        TranslateModule.forChild(),
        InfraCoreModule,
        InfraDataModule,
        InfraFormularioModule.forChild(),
        RouterModule.forChild([
            {
                path: ':empresa',
                component: DownloadComponent
            }
        ])
    ]
})
export class InstalarAplicativoModule { }
