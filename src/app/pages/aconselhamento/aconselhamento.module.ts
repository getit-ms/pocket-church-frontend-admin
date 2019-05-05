import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsultaComponent} from './consulta/consulta.component';
import {EdicaoComponent} from './edicao/edicao.component';
import {MatChipsModule, MatDialogModule, MatIconModule, MatMenuModule} from '@angular/material';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import {InfraTemplateCrudModule} from '@gafs/infra-template';
import {InfraDataModule} from '@gafs/infra-data';
import {TranslateModule} from '@ngx-translate/core';
import {InfraCoreModule} from '@gafs/infra-core';
import {ComponentesModule} from '../../componentes/componentes.module';
import {SchedulerDateFormatter, SchedulerModule} from "angular-calendar-scheduler";
import {CalendarDateFormatter, CalendarModule} from 'angular-calendar';
import { ModalHorarioComponent } from './modal-horario/modal-horario.component';
import { FormHorarioComponent } from './form-horario/form-horario.component';

@NgModule({
    declarations: [ConsultaComponent, EdicaoComponent, ModalHorarioComponent, FormHorarioComponent],
    imports: [
        CommonModule,

        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        InfraDataModule,
        InfraCoreModule,
        ComponentesModule,
        CalendarModule,
        SchedulerModule,
        TranslateModule.forChild(),
        InfraFormularioModule.forChild(),
        InfraTemplateCrudModule.forChild({
            bundleBase: 'agenda',
            updateComponent: EdicaoComponent,
            readComponent: ConsultaComponent
        })
    ],
    entryComponents: [ModalHorarioComponent],
    providers: [{
        provide: CalendarDateFormatter,
        useClass: SchedulerDateFormatter
    }]
})
export class AconselhamentoModule { }
