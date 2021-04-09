import { Component, OnInit } from '@angular/core';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {EndPointReference, Project} from '../../builder/models/Project';
import {DBConnection} from '../../builder/models/DBConnection';
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

  endpointsHash: IHash<EndPoint> = {};
  endpoints: Array<EndPoint> = [];
  newEndPoint: EndPointReference = new EndPointReference();
  endPointPaginator = new IHashPaginator<EndPointReference>();

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
          this.selectProject(proj[projectsKey]);
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
      this.endpointsHash = conn;
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

  addEndpoint(){
    this.selectedProject.endPoints[this.newEndPoint.key]  = this.newEndPoint;
    console.log(this.selectedProject.endPoints);
    this.newEndPoint = new EndPointReference();
    this.saveSelected();
  }

  selectProject(project: Project){
    this.selectedProject = this.projects[project.ID];
    this.endPointPaginator.update(this.selectedProject.endPoints);
    this.endPointPaginator.getPage();
  }
}
