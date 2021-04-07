import { Component, OnInit } from '@angular/core';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {Project} from '../../builder/models/Project';
import {DBConnection} from '../../builder/models/DBConnection';
import {Model} from '../../builder/models/Model';
import {EndPoint} from '../../builder/models/EndPoint';
import {IHashPaginator} from '../../util/IHashPaginator';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: IHash<Project> = {};
  selectedProject: Project = new Project();
  newProject: Project = new Project();

  connections: Array<DBConnection> = [];
  connectionsHash: IHash<DBConnection> = {};
  endpoints: Array<EndPoint> = [];

  editSelected: boolean = false;

  paginator: IHashPaginator<Project> = new IHashPaginator<Project>();

  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.projects.subscribe((proj) => {
      this.projects = proj;
      for (let projectsKey in proj) {
        if(proj.hasOwnProperty(projectsKey)){
          this.selectedProject = proj[projectsKey];
          break;
        }
      }
      this.paginator.update(proj);
      this.paginator.getPage();
    });
    this.storageService.dbConnection.subscribe(conn => {
      this.connections = [];
      this.connectionsHash = conn;
      Object.keys(conn).forEach(i => {
        this.connections.push(conn[i])
      });
      console.log(this.connections)
    });
    this.storageService.endpoints.subscribe(conn => {
      this.endpoints = [];
      Object.keys(conn).forEach(i => this.endpoints.push(conn[i]));
    });
    this.storageService.updateDBConnections();
    this.storageService.updateEndPoints();
    this.storageService.updateProjects();
  }

  createProject(){
    this.newProject.ID = ""+Math.floor(Math.random() * 999_999_999);
    this.storageService.addProject(this.newProject);
    this.newProject = new Project();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveProject(this.selectedProject);
  }

}
