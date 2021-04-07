import { Component, OnInit } from '@angular/core';
import {EndPoint} from '../../builder/models/EndPoint';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {DBConnection} from '../../builder/models/DBConnection';
import {IHashPaginator} from '../../util/IHashPaginator';
import {Model} from '../../builder/models/Model';

@Component({
  selector: 'app-db-connections',
  templateUrl: './db-connections.component.html',
  styleUrls: ['./db-connections.component.css']
})
export class DbConnectionsComponent implements OnInit {

  dbConnection: IHash<DBConnection> = {};
  selectedDbConn: DBConnection = new DBConnection();
  newConn: DBConnection = new DBConnection();

  editSelected: boolean = false;
  paginator: IHashPaginator<DBConnection> = new IHashPaginator<DBConnection>();

  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.dbConnection.subscribe((endp) => {
      this.dbConnection = endp;
      for (let projectsKey in endp) {
        if(endp.hasOwnProperty(projectsKey)){
          this.selectedDbConn = endp[projectsKey];
          break;
        }
      }
      this.paginator.update(endp);
      this.paginator.getPage();
    });
    this.storageService.updateDBConnections();
  }

  createConnection(){
    this.newConn.ID = ""+Math.floor(Math.random() * 999_999_999);
    this.storageService.addDBConnection(this.newConn);
    this.newConn = new DBConnection();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveDBConnection(this.selectedDbConn);
  }
}
