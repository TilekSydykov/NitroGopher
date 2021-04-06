import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Model} from '../../builder/models/Model';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  models: Array<Model> = new Array<Model>();
  selectedModel: Model = new Model();
  newModel: Model = new Model();

  editSelected: boolean = false;
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.models.subscribe((endp) => {
      this.models = endp;
      if(this.selectedModel.ID == 0 && endp.length > 0){
        this.selectedModel = endp[0]
      }
    });
    this.storageService.updateModels();
  }

  createEndPoint(){
    this.newModel.ID = Math.floor(Math.random() * 999_999_999);
    this.storageService.addModel(this.newModel);
    this.newModel = new Model();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveModel(this.selectedModel);
  }

}
