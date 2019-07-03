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


const routes: Routes = [{

  path: 'create-task',
  component: CreateTaskComponent
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
  component: MyAccountComponent
},
{
  path: 'proyectos/create-project',
  component: CreateProjectComponent
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
  path: '',
  component: LoginComponent
},
{
  path: '**',
  component: NotFoundComponent
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
