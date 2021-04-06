import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ProjectsComponent} from './components/projects/projects.component';
import {DbConnectionsComponent} from './components/db-connections/db-connections.component';
import {EndPointsComponent} from './components/end-points/end-points.component';
import {ModelsComponent} from './components/models/models.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'connections', component: DbConnectionsComponent},
  {path: 'points', component: EndPointsComponent},
  {path: 'models', component: ModelsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
