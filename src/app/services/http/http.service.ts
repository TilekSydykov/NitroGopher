import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../../models/user";
import {Observable} from "rxjs";
import {LoginResponse} from "../../models/response/login-response";
import {Endpoints} from "./endpoints";
import {StorageService} from "../storage/storage.service";
import {Config} from "../../models/config";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private e: Endpoints;

  constructor(private http: HttpClient, private storageService: StorageService) {
    this.e = new Endpoints();
  }

  public register(user: User){
    return this.http.post<LoginResponse>(this.e.login, user)
  }

  public login(user: User): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.e.login, user)
  }



  public getUsers(): Observable<Array<User>>{
    return this.http.get<Array<User>>(this.e.user)
  }

  public saveUser(u: User): Observable<User>{
    return this.http.put<User>(this.e.user + "/" + u.ID, u)
  }

  getConfig(): Observable<Config>{
    return this.http.get<Config>(this.e.config)
  }

  updateConfig(c: Config): Observable<Config>{
    return this.http.put<Config>(this.e.config + "/" + c.ID, c)
  }

}
