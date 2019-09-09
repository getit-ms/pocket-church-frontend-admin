import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {InfraCoreModule} from '@gafs/infra-core';
import {InfraDataModule} from '@gafs/infra-data';
import {InfraFormularioModule} from '@gafs/infra-formulario';
import { EmpresasComponent } from './empresas/empresas.component';
import { PasswordComponent } from './password/password.component';
import {ComponentesModule} from '../../componentes/componentes.module';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [LoginComponent, EmpresasComponent, PasswordComponent, BaseComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    ComponentesModule,
    TranslateModule.forChild(),
    InfraCoreModule,
    InfraDataModule,
    InfraFormularioModule.forChild(),
    RouterModule.forChild([
      {
        path: '',
        component: BaseComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'password',
            component: PasswordComponent
          },
          {
            path: 'empresas',
            component: EmpresasComponent
          },
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ]
})
export class AcessoModule { }
