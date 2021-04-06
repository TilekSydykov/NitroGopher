import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../../models/user";
import {Project} from '../../builder/models/Project';
import {Observable} from 'rxjs';
import {EndPoint} from '../../builder/models/EndPoint';
import {Model} from '../../builder/models/Model';
import {DBConnection} from '../../builder/models/DBConnection';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  logged_in: EventEmitter<Boolean>= new EventEmitter<Boolean>();

  token: string | null = null;
  user: User | null = null;

  constructor() {
    this._endpoints = [];
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
  _projects: Array<Project> = new Array<Project>();
  projects: EventEmitter<Array<Project>> = new EventEmitter<Array<Project>>();

  getProjects(): Observable<Array<Project>>{
    return this.projects
  }

  addProject(p: Project){
    this._projects.push(p);
    this.saveProjects();
    this.updateProjects();
  }

  findProjectById(id: number): Project {
    // @ts-ignore
    this._projects.forEach(i => {
      if(id == i.ID){
        return i
      }
    });
    return new Project();
  }

  saveProject(project: Project) {
    for (let i = 0; i < this._projects.length; i++) {
      if(this._projects[i].ID == project.ID){
        this._projects[i] = project;
      }
    }
    this.saveProjects();
    this.updateProjects();
  }

  saveProjects(){
    localStorage.setItem("projects", JSON.stringify(this._projects));
  }

  updateProjects(){
    this._projects = JSON.parse(<string>localStorage.getItem("projects"));
    this.projects.emit(this._projects);
  }

  // EndPoint

  _endpoints: Array<EndPoint> = [];
  endpoints: EventEmitter<Array<EndPoint>> = new EventEmitter<Array<EndPoint>>();
  getEndPoints(): Observable<Array<EndPoint>>{
    return this.endpoints
  }

  addEndPoint(p: EndPoint){
    this._endpoints.push(p);
    this.saveEndPoints();
    this.updateEndPoints();
  }

  findEndPointById(id: number): EndPoint {
    // @ts-ignore
    this._endpoints.forEach(i => {
      if(id == i.ID){
        return i
      }
    });
    return new EndPoint();
  }

  saveEndPoint(project: EndPoint) {
    for (let i = 0; i < this._endpoints.length; i++) {
      if(this._endpoints[i].ID == project.ID){
        this._endpoints[i] = project;
      }
    }
    this.saveEndPoints();
    this.updateEndPoints();
  }

  saveEndPoints(){
    localStorage.setItem("EndPoint", JSON.stringify(this._endpoints));
  }

  updateEndPoints(){
    this._endpoints = JSON.parse(<string>localStorage.getItem("EndPoint"));
    if(this._endpoints == null){
      this._endpoints = []
    }
    this.endpoints.emit(this._endpoints);
  }

  // DBConnection

  _dbConnection: Array<DBConnection> = [];
  dbConnection: EventEmitter<Array<DBConnection>> = new EventEmitter<Array<DBConnection>>();
  getDBConnections(): Observable<Array<DBConnection>>{
    return this.dbConnection
  }

  addDBConnection(p: DBConnection){
    this._dbConnection.push(p);
    this.saveDBConnections();
    this.updateDBConnections();
  }

  findDBConnectionById(id: number): DBConnection {
    // @ts-ignore
    this._dbConnection.forEach(i => {
      if(id == i.ID){
        return i
      }
    });
    return new DBConnection();
  }

  saveDBConnection(connection: DBConnection) {
    for (let i = 0; i < this._dbConnection.length; i++) {
      if(this._dbConnection[i].ID == connection.ID){
        this._dbConnection[i] = connection;
      }
    }
    this.saveDBConnections();
    this.updateDBConnections();
  }

  saveDBConnections(){
    localStorage.setItem("connection", JSON.stringify(this._dbConnection));
  }

  updateDBConnections(){
    this._dbConnection = JSON.parse(<string>localStorage.getItem("connection"));
    if(this._dbConnection == null){
      this._dbConnection = []
    }
    this.dbConnection.emit(this._dbConnection);
  }

  // Model

  _models: Array<Model> = [];
  models: EventEmitter<Array<Model>> = new EventEmitter<Array<Model>>();
  getModels(): Observable<Array<Model>>{
    return this.models
  }

  addModel(p: Model){
    this._models.push(p);
    this.saveModels();
    this.updateModels();
  }

  findModelById(id: number): Model {
    // @ts-ignore
    this._models.forEach(i => {
      if(id == i.ID){
        return i
      }
    });
    return new Model();
  }

  saveModel(model: Model) {
    for (let i = 0; i < this._models.length; i++) {
      if(this._models[i].ID == model.ID){
        this._models[i] = model;
      }
    }
    this.saveModels();
    this.updateModels();
  }

  saveModels(){
    localStorage.setItem("Model", JSON.stringify(this._models));
  }

  updateModels(){
    this._models = JSON.parse(<string>localStorage.getItem("Model"));
    if(this._models == null){
      this._models = []
    }
    this.models.emit(this._models);
  }
}
