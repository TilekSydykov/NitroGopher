import {Component, OnInit} from '@angular/core';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {EndPointReference, Project} from '../../builder/models/project';
import {DbConnection} from '../../builder/models/db-connection';
import {EndPoint} from '../../builder/models/end-point';
import {IHashPaginator} from '../../util/IHashPaginator';
import {CodeEngine} from '../../builder/engine/code-engine';
import {Model} from '../../builder/models/model';
import {Param} from '../../util/Functions';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})

export class ProjectsComponent implements OnInit {

  codeEngine = new CodeEngine();

  selectedTab = 0;

  projects: IHash<Project> = {};
  selectedProject: Project = new Project();
  newProject: Project = new Project();

  connections: Array<DbConnection> = [];
  connectionsHash: IHash<DbConnection> = {};

  models: Array<Model> = [];
  modelsHash: IHash<Model> = {};

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

      this.paginator.update(proj);
      this.paginator.getPage();
      console.log("updates");
    });
    this.storageService.dbConnection.subscribe(conn => {
      this.connections = [];
      this.connectionsHash = conn;
      Object.keys(conn).forEach(i => {
        this.connections.push(conn[i]);
      });
    });
    this.storageService.endpoints.subscribe(conn => {
      this.endpoints = [];
      this.endpointsHash = conn;
      Object.keys(conn).forEach(i => this.endpoints.push(conn[i]));
    });
    this.storageService.models.subscribe(conn => {
      this.models = [];
      this.modelsHash = conn;
      Object.keys(conn).forEach(i => this.models.push(conn[i]));
      console.log("models update");
    });
    this.storageService.updateDBConnections();
    this.storageService.updateEndPoints();
    this.storageService.updateProjects();
    this.storageService.updateModels();
  }

  createProject() {
    this.newProject.ID = '' + Math.floor(Math.random() * 999_999_999);
    this.storageService.addProject(this.newProject);
    this.newProject = new Project();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveProject(this.selectedProject);
  }

  addEndpoint() {
    this.selectedProject.endPoints[this.newEndPoint.key] = this.newEndPoint;
    this.newEndPoint = new EndPointReference();
    this.saveSelected();
  }

  selectProject(project: Project) {
    this.selectedProject = this.projects[project.ID];
    this.generateCode();
    this.endPointPaginator.update(this.selectedProject.endPoints);
    this.endPointPaginator.getPage();
  }

  generateCode() {
    this.selectedProject.code =
      this.codeEngine.generateProjectCode(this.selectedProject,
        this.modelsHash,
        this.endpointsHash,
        this.connectionsHash);
    this.selectedProject.codeVersion = this.selectedProject.version;
    this.storageService.saveProject(this.selectedProject);
  }

  deleteSelected(){
    let ok = confirm("You want to delete this project?");
    console.log(ok);
    if (ok){
      this.storageService.deleteProject(this.selectedProject);
      this.selectedProject = new Project()
    }
  }
}
