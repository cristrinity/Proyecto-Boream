import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatSelectModule, MatIconModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MyProjectsComponent } from './pages/projects/table-projects/table-projects.component';
import { MyPacksComponent } from './pages/my-packs/my-packs.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { NavbarLeftComponent } from './shared/components/navbar-left/navbar-left.component';
import { ModalPaymentComponent } from './shared/components/modal-payment/modal-payment.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { MatTableModule } from '@angular/material/table';
import { FormProjectComponent } from './pages/projects/form-project/form-project.component';
import { ProjectsComponent } from './pages/projects/project.component';
import { ProjectsService } from './services/project.service';
import { NavbarTopComponent } from './shared/components/navbar-top/navbar-top.component';
import { CreateProjectComponent } from './pages/projects/create-project/create-project.component';
import { EditProjectComponent } from './pages/projects/edit-project/edit-project.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { LoginComponent } from './shared/components/login/login.component';
import { LogginFakeInterceptor } from './interceptors/logginFake.interceptor';
import { AuthorizationService } from './services/authorization.service';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { UsernavComponent } from './shared/components/user-nav/usernav.component';
import { EditTaskComponent } from './pages/my-tasks/edit-task/edit-task.component';
import { CreateTaskComponent } from './pages/my-tasks/create-task/create-task.component';
import { TasksService } from './services/task.service';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { TableTaskComponent } from './pages/my-tasks/table-task/table-task.component';
import { FormTaskComponent } from './pages/my-tasks/form-task/form-task.component';
import { AccountService } from './services/account.service';
import { FormAccountComponent } from './pages/my-account/form-account/form-account.component';
import { TableAccountComponent } from './pages/my-account/table-account/table-account.component';
import { EditAccountComponent } from './pages/my-account/edit-account/edit-account.component';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ClientService } from './services/client.service';
import { PackService } from './services/pack.service';
import { TablePackComponent } from './pages/my-packs/table-packs/table-packs.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { StatusTaskComponent } from './shared/components/status-task/status-task.component';
import { DatePipe } from '@angular/common';
import { MyClientsComponent } from './pages/my-clients/my-clients.component';
import { TableClientComponent } from './pages/my-clients/table-clients/table-clients.component';
import { CreateClientComponent } from './pages/my-clients/create-client/create-client.component';
import { CreateAccountComponent } from './pages/my-account/create-account/create-account.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivateGuard } from './services/can-activate.service';
import { SureExit } from './services/sure-exit.service';
import { CheckFormsService } from './services/check-forms.service';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LogginInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
 // { provide: HTTP_INTERCEPTORS, useClass: LogginFakeInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    TableTaskComponent,
    MyTasksComponent,
    MyProjectsComponent,
    MyPacksComponent,
    MyAccountComponent,
    NavbarLeftComponent,
    ModalPaymentComponent,
    NotFoundComponent,
    FormProjectComponent,
    ProjectsComponent,
    NavbarTopComponent,
    CreateProjectComponent,
    EditProjectComponent,
    LoginComponent,
    UsernavComponent,
    EditTaskComponent,
    CreateTaskComponent,
    FormTaskComponent,
    MyTasksComponent,
    FormAccountComponent,
    TableAccountComponent,
    EditAccountComponent,
    UsernavComponent,
    TablePackComponent,
    StatusTaskComponent,
    MyClientsComponent,
    TableClientComponent,
    CreateClientComponent,
    CreateAccountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatFileUploadModule,
    MatExpansionModule,
    MatDividerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    ProjectsService,
    AuthorizationService,
    LogginFakeInterceptor,
    LogginInterceptor,
    httpInterceptorProviders,
    TasksService,
    AccountService,
    ClientService,
    PackService,
    DatePipe,
    ActivateGuard,
    SureExit,
    CheckFormsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
