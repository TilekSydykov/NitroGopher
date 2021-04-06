import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { StorageService } from "./services/storage/storage.service";
import { HttpService } from "./services/http/http.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from "./services/http/AuthInterceptor";
import { AppLoginComponent } from './components/app-login/app-login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { DbConnectionsComponent } from './components/db-connections/db-connections.component';
import { ModelsComponent } from './components/models/models.component';
import { EndPointsComponent } from './components/end-points/end-points.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AppLoginComponent,
    ProjectsComponent,
    DbConnectionsComponent,
    ModelsComponent,
    EndPointsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
    ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    StorageService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
