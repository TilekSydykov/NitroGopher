import { Component, OnInit } from '@angular/core';
import {EndPoint} from '../../builder/models/EndPoint';
import {StorageService} from '../../services/storage/storage.service';
import {DBConnection} from '../../builder/models/DBConnection';

@Component({
  selector: 'app-db-connections',
  templateUrl: './db-connections.component.html',
  styleUrls: ['./db-connections.component.css']
})
export class DbConnectionsComponent implements OnInit {

  dbConnection: Array<DBConnection> = new Array<DBConnection>();
  selectedDbConn: DBConnection = new DBConnection();
  newConn: DBConnection = new DBConnection();

  editSelected: boolean = false;
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.dbConnection.subscribe((endp) => {
      this.dbConnection = endp;
      if(this.selectedDbConn.ID == 0 && endp.length > 0){
        this.selectedDbConn = endp[0]
      }
    });
    this.storageService.updateDBConnections();
  }

  createConnection(){
    this.newConn.ID = Math.floor(Math.random() * 999_999_999);
    this.storageService.addDBConnection(this.newConn);
    this.newConn = new DBConnection();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveDBConnection(this.selectedDbConn);
  }
}
