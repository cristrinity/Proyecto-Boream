import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormTaskComponent } from './pages/my-tasks/form-task/form-task.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { MyProjectsComponent } from './pages/projects/table-projects/table-projects.component';
import { MyPacksComponent } from './pages/my-packs/my-packs.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FormProjectComponent } from './pages/projects/form-project/form-project.component';
import { ProjectsComponent } from './pages/projects/project.component';
import { CreateProjectComponent } from './pages/projects/create-project/create-project.component';
import { EditProjectComponent } from './pages/projects/edit-project/edit-project.component';
import { LoginComponent } from './shared/components/login/login.component';
import { CreateTaskComponent } from './pages/my-tasks/create-task/create-task.component';
import { TableAccountComponent } from './pages/my-account/table-account/table-account.component';
import { EditAccountComponent } from './pages/my-account/edit-account/edit-account.component';
import { EditTaskComponent } from './pages/my-tasks/edit-task/edit-task.component';
import { MyClientsComponent } from './pages/my-clients/my-clients.component';
import { CreateAccountComponent } from './pages/my-account/create-account/create-account.component';
import { ActivateGuard } from './services/can-activate.service';
import { SureExit } from './services/sure-exit.service';


const routes: Routes = [{

  path: 'create-account',
  component: CreateAccountComponent
},
{
  path: 'create-task',
  component: CreateTaskComponent,
  canDeactivate: [SureExit]
},
{
path: 'edit-task/:id',
  component: EditTaskComponent,
  // canDeactivate: [SureExit]
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'tareas',
  component: MyTasksComponent
},
{
  path: 'proyectos',
  component: ProjectsComponent
},
{
  path: 'packs',
  component: MyPacksComponent
},
{
  path: 'datos',
  component: MyAccountComponent, canActivate: [ActivateGuard]
},
{
  path: 'proyectos/create-project', 
  component: CreateProjectComponent, 
  // canActivate: [ActivateGuard],
  canDeactivate: [SureExit]
},
{
  path: 'proyectos/edit-project/:id',
  component: EditProjectComponent
},
{
path: 'edit-account/:id',
component: EditAccountComponent
},
{
path: 'clientes',
component: MyClientsComponent
},
{
  path: '',
  component: LoginComponent,
  // canActivate: [ActivateGuard],
  // canDeactivate: [SureExit]
},
{
  path: '**',
  component: NotFoundComponent,
    // canActivate: [ActivateGuard],
    // canDeactivate: [SureExit]
}

// {
//   path: 'list/:id',
//   component: ListIdComponent
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
