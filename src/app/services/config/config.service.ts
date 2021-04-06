import { Injectable } from '@angular/core';
import {Config} from "../../models/config";
import {HttpService} from "../http/http.service";
import {TerminalTableConfigs} from "./models/TerminalTableConfigs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configs = new Config();
  terminalTableConfigs: TerminalTableConfigs = new TerminalTableConfigs();

  constructor(private httpService: HttpService, private toast: ToastrService) {
    httpService.getConfig().subscribe((c) => {
      this.configs  = c;
      this.terminalTableConfigs = JSON.parse(c.TerminalTableConfig)
    })
  }

  saveConfigs(){
    console.log("send");
    this.configs.TerminalTableConfig = JSON.stringify(this.terminalTableConfigs);
    this.httpService.updateConfig(this.configs).subscribe((c)=> {
      this.configs = c;
      this.toast.success("Сохранено")
    })
  }
}
