import { Component, OnInit } from '@angular/core';
import {Project} from '../../builder/models/Project';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {EndPoint} from '../../builder/models/EndPoint';
import {IHashPaginator} from '../../util/IHashPaginator';
import {Model} from '../../builder/models/Model';

@Component({
  selector: 'app-end-points',
  templateUrl: './end-points.component.html',
  styleUrls: ['./end-points.component.css']
})
export class EndPointsComponent implements OnInit {

  endpoints: IHash<EndPoint> = {};
  selectedEndPoint: EndPoint = new EndPoint();
  newEndpoint: EndPoint = new EndPoint();

  editSelected: boolean = false;
  paginator: IHashPaginator<EndPoint> = new IHashPaginator<EndPoint>();
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.endpoints.subscribe((endp) => {
      this.endpoints = endp;
      for (let projectsKey in endp) {
        if(endp.hasOwnProperty(projectsKey)){
          this.selectedEndPoint = endp[projectsKey];
          break;
        }
      }
      this.paginator.update(endp);
      this.paginator.getPage();
    });
    this.storageService.updateEndPoints();
  }

  createEndPoint(){
    this.newEndpoint.ID = ""+Math.floor(Math.random() * 999_999_999);
    this.storageService.addEndPoint(this.newEndpoint);
    this.newEndpoint = new EndPoint();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveEndPoint(this.selectedEndPoint);
  }

}
