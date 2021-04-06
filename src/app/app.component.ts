import { Component } from '@angular/core';
import {StorageService} from "./services/storage/storage.service";
import {User} from "./models/user";
import {SocketService} from "./services/socket/socket.service";
import {ConfigService} from "./services/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FigaroAdmin';
  logged_in: boolean = true;
  user: User = new User();

  constructor(private storageService: StorageService,
              private socketService: SocketService,
              private configs: ConfigService) {
    // let token = storageService.getToken();
    // if (token !== '' && token !== null && token !== undefined){
    //   this.logged_in = true;
    // }
    // storageService.logged_in.subscribe( (val: boolean) => {
    //   this.logged_in = val
    // });
    let u = storageService.getUser();
    if (u !== null){
      this.user = u;
    }
  }

  logOut(){
    this.storageService.logOut();
  }
}
