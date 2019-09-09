import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatCardModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {InfraCoreModule} from '@gafs/infra-core';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {ComponentesModule} from '../../componentes/componentes.module';
import {RedefineComponent} from "./redefine/redefine.component";

@NgModule({
    declarations: [RedefineComponent],
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
                path: 'redefine/:empresa/:token',
                component: RedefineComponent
            }
        ])
    ]
})
export class SenhaModule { }
