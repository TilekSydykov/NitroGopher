import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {HttpService} from '../../services/http/http.service';
import {StorageService} from '../../services/storage/storage.service';
import {ToastrService} from 'ngx-toastr';
import {LoginResponse} from '../../models/response/login-response';

interface Map {
  [key: string]: boolean | undefined
}

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {

  user: User = new User();

  files: Map = {
    signin: false,
    signup: false,
    about: false,
    main: true,
  };

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {}

  select(key: string){
    for (let filesKey in this.files) {
      this.files[filesKey] = false
    }
    this.files[key] = true
  }

  login() {
    this.httpService.login(this.user).subscribe((res: LoginResponse) => {
      if (res.Status) {
        this.storageService.setToken(res.Token);
        this.storageService.setUser(res.User);
        this.toastr.success(res.Message);
        this.storageService.logged_in.emit(true);

        window.location.reload();
      } else {
        this.toastr.error(res.Message);
      }
    })
  }

  register() {
    this.httpService.login(this.user).subscribe((res: LoginResponse) => {
      if (res.Status) {
        this.storageService.setToken(res.Token);
        this.storageService.setUser(res.User);
        this.toastr.success(res.Message);
        this.storageService.logged_in.emit(true);

        window.location.reload();
      } else {
        this.toastr.error(res.Message);
      }
    })
  }
}
