import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioDeleteComponent } from './components/usuario/usuario-delete/usuario-delete.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { ProfissionalListComponent } from './components/profissional/profissional-list/profissional-list.component';
import { ProfissionalCreateComponent } from './components/profissional/profissional-create/profissional-create.component';
import { ProfissionalDeleteComponent } from './components/profissional/profissional-delete/profissional-delete.component';
import { ProfissionalUpdateComponent } from './components/profissional/profissional-update/profissional-update.component';
import { PlanoListComponent } from './components/plano/plano-list/plano-list.component';
import { PlanoCreateComponent } from './components/plano/plano-create/plano-create.component';
import { PlanoDeleteComponent } from './components/plano/plano-delete/plano-delete.component';
import { PlanoUpdateComponent } from './components/plano/plano-update/plano-update.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: NavComponent, canActivate: [AuthGuard] ,children: [

    {path: 'home', component: HomeComponent},

    {path: 'usuarios', component: UsuarioListComponent},
    {path: 'usuarios/create', component: UsuarioCreateComponent},
    {path: 'usuarios/delete/:id', component: UsuarioDeleteComponent},
    {path: 'usuarios/update/:id', component: UsuarioUpdateComponent},

    {path:'profissionais', component: ProfissionalListComponent},
    {path:'profissionais/create', component: ProfissionalCreateComponent},
    {path:'profissionais/delete/:id', component: ProfissionalDeleteComponent},
    {path:'profissionais/update/:id', component: ProfissionalUpdateComponent},

    {path: 'planos', component: PlanoListComponent},
    {path: 'planos/create', component: PlanoCreateComponent},
    {path: 'planos/delete/:id', component: PlanoDeleteComponent},
    {path: 'planos/update/:id', component: PlanoUpdateComponent},

    {path: 'clientes', component: ClienteListComponent},
    {path: 'clientes/create', component: ClienteCreateComponent},

  ]}
]
