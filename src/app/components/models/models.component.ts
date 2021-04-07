import { Component, OnInit } from '@angular/core';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {Model} from '../../builder/models/Model';
import {IHashPaginator} from '../../util/IHashPaginator';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  models: IHash<Model> = {};
  selectedModel: Model = new Model();
  newModel: Model = new Model();

  editSelected: boolean = false;
  paginator: IHashPaginator<Model> = new IHashPaginator<Model>();
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.models.subscribe((endp) => {
      this.models = endp;
      for (let projectsKey in endp) {
        if(endp.hasOwnProperty(projectsKey)){
          this.selectedModel = endp[projectsKey];
          break;
        }
      }
      this.paginator.update(endp);
      this.paginator.getPage();
    });
    this.storageService.updateModels();
  }

  createEndPoint(){
    this.newModel.ID = ""+Math.floor(Math.random() * 999_999_999);
    this.storageService.addModel(this.newModel);
    this.newModel = new Model();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveModel(this.selectedModel);
  }



}
