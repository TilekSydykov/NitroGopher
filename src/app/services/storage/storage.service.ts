import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Project} from '../../builder/models/Project';
import {Observable} from 'rxjs';
import {EndPoint} from '../../builder/models/EndPoint';
import {Model} from '../../builder/models/Model';
import {DBConnection} from '../../builder/models/DBConnection';

export interface IHash<T> {
  [details: string] : T;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  logged_in: EventEmitter<Boolean>= new EventEmitter<Boolean>();

  token: string | null = null;
  user: User | null = null;

  constructor() {
    this._endpoints = {};
    this._projects = {};
  }

  logOut(){
    this.deleteToken();
    this.setUser(new User());
    this.logged_in.emit(false);
  }

  getToken(): string{
    return <string>localStorage.getItem('token');
  }

  static  token(): string{
    return <string>localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token')
  }

  getUser(): User | null {
    if (this.user == null){
      this.user = JSON.parse(<string>localStorage.getItem('user'));
    }
    return this.user;
  }

  setUser(user: User){
    this.user = null;
    localStorage.setItem("user", JSON.stringify(user))
  }

  // Project
  _projects: IHash<Project> = {};
  projects: EventEmitter<IHash<Project>> = new EventEmitter<IHash<Project>>();

  addProject(p: Project){
    this._projects[p.ID] = p;
    this.saveProjects();
    this.updateProjects();
  }

  saveProject(project: Project) {
    this._projects[project.ID] = project;
    this.saveProjects();
    this.updateProjects();
  }

  saveProjects(){
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  updateProjects(){
    this._projects = JSON.parse(<string>localStorage.getItem("projects"));
    if(this._projects == null){
      this._projects = {}
    }
    this.projects.emit(this._projects);
  }

  // EndPoint

  _endpoints: IHash<EndPoint> = {};
  endpoints: EventEmitter<IHash<EndPoint>> = new EventEmitter<IHash<EndPoint>>();

  addEndPoint(p: EndPoint){
    this._endpoints[p.ID] = (p);
    this.saveEndPoints();
    this.updateEndPoints();
  }

  saveEndPoint(project: EndPoint) {
    this._endpoints[project.ID] = project;
    this.saveEndPoints();
    this.updateEndPoints();
  }

  saveEndPoints(){
    localStorage.setItem("EndPoint", JSON.stringify(this._endpoints));
  }

  updateEndPoints(){
    this._endpoints = JSON.parse(<string>localStorage.getItem("EndPoint"));
    if(this._endpoints == null){
      this._endpoints = {}
    }
    this.endpoints.emit(this._endpoints);
  }

  // DBConnection

  _dbConnection: IHash<DBConnection> = {};
  dbConnection: EventEmitter<IHash<DBConnection>> = new EventEmitter<IHash<DBConnection>>();


  addDBConnection(p: DBConnection){
    this._dbConnection[p.ID] = (p);
    this.saveDBConnections();
    this.updateDBConnections();
  }


  saveDBConnection(connection: DBConnection) {
    this._dbConnection[connection.ID] = connection;
    this.saveDBConnections();
    this.updateDBConnections();
  }

  saveDBConnections(){
    localStorage.setItem("connection", JSON.stringify(this._dbConnection));
  }

  updateDBConnections(){
    this._dbConnection = JSON.parse(<string>localStorage.getItem("connection"));
    if(this._dbConnection == null){
      this._dbConnection = {}
    }
    this.dbConnection.emit(this._dbConnection);
  }

  // Model

  _models: IHash<Model> = {};
  models: EventEmitter<IHash<Model>> = new EventEmitter<IHash<Model>>();


  addModel(p: Model){
    this._models[p.ID] = (p);
    this.saveModels();
    this.updateModels();
  }

  saveModel(model: Model) {
    this._models[model.ID] = model;
    this.saveModels();
    this.updateModels();
  }

  saveModels(){
    localStorage.setItem("Model", JSON.stringify(this._models));
  }

  updateModels(){
    this._models = JSON.parse(<string>localStorage.getItem("Model"));
    if(this._models == null){
      this._models = {}
    }
    this.models.emit(this._models);
  }
}
