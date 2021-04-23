import { Component, OnInit } from '@angular/core';
import {EndPoint} from '../../builder/models/end-point';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {DbConnection} from '../../builder/models/db-connection';
import {IHashPaginator} from '../../util/IHashPaginator';
import {Model} from '../../builder/models/model';

@Component({
  selector: 'app-db-connections',
  templateUrl: './db-connections.component.html',
  styleUrls: ['./db-connections.component.css']
})
export class DbConnectionsComponent implements OnInit {

  dbConnection: IHash<DbConnection> = {};
  selectedDbConn: DbConnection = new DbConnection();
  newConn: DbConnection = new DbConnection();

  editSelected: boolean = false;
  paginator: IHashPaginator<DbConnection> = new IHashPaginator<DbConnection>();

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
    this.newConn = new DbConnection();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveDBConnection(this.selectedDbConn);
  }
}
