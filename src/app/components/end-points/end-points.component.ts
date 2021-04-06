import { Component, OnInit } from '@angular/core';
import {Project} from '../../builder/models/Project';
import {StorageService} from '../../services/storage/storage.service';
import {EndPoint} from '../../builder/models/EndPoint';

@Component({
  selector: 'app-end-points',
  templateUrl: './end-points.component.html',
  styleUrls: ['./end-points.component.css']
})
export class EndPointsComponent implements OnInit {

  endpoints: Array<EndPoint> = new Array<EndPoint>();
  selectedEndPoint: EndPoint = new EndPoint();
  newEndpoint: EndPoint = new EndPoint();

  editSelected: boolean = false;
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.endpoints.subscribe((endp) => {
      this.endpoints = endp;
      if(this.selectedEndPoint.ID == 0 && endp.length > 0){
        this.selectedEndPoint = endp[0]
      }
    });
    this.storageService.updateEndPoints();
  }

  createEndPoint(){
    this.newEndpoint.ID = Math.floor(Math.random() * 999_999_999);
    this.storageService.addEndPoint(this.newEndpoint);
    this.newEndpoint = new EndPoint();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveEndPoint(this.selectedEndPoint);
  }

}
