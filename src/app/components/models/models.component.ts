import { Component, OnInit } from '@angular/core';
import {IHash, StorageService} from '../../services/storage/storage.service';
import {Field, FieldType, initialTypes, Model} from '../../builder/models/Model';
import {IHashPaginator} from '../../util/IHashPaginator';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  models: IHash<Model> = {};
  selectedModel: Model = new Model();
  newModel: Model = new Model();
  newField: Field = new Field();

  types: Array<FieldType> = initialTypes;

  customTypes: Array<FieldType> = [];

  relations: Array<String> = [
    "oneToOne",
    "oneToMany",
    "manyToMany",
    "manyToOne"
  ];

  editSelected: boolean = false;
  paginator: IHashPaginator<Model> = new IHashPaginator<Model>();
  constructor(
    private storageService: StorageService,
    private toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.storageService.models.subscribe((endp: IHash<Model>) => {
      this.models = endp;
      if(this.selectedModel.ID == ""){
        for (let projectsKey in endp) {
          if(endp.hasOwnProperty(projectsKey)){
            this.selectedModel = endp[projectsKey];
            break;
          }
        }
      }
      this.paginator.update(endp);
      this.paginator.getPage();
      this.addCustomTypes();
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

  addField(){
    this.newField.name = this.newField.name.trim();
    this.newField.type.name = this.newField.type.name.trim();

    if(this.newField.name == "" ||
      this.newField.type.name == "" ||
      this.selectedModel.fields.filter((i) => {return i.name === this.newField.name}).length > 0){
      this.toast.error("name or type error or dublication");
      return;
    }
    this.saveField()
  }

  saveField(){
    this.selectedModel.fields.push(this.newField);
    this.storageService.saveModel(this.selectedModel);
    this.newField= new Field();
    this.toast.success("success");
  }

  deleteField(index: number){
    this.selectedModel.fields.splice(index, 1);
    this.storageService.saveModel(this.selectedModel);
  }

  addCustomTypes(){
    this.customTypes = [];
    Object.keys(this.models).forEach(i => {
      // TODO: needs validator of type
      let f = new FieldType(this.models[i].name, this.models[i].ID);
      f.isCustom = true;
      this.customTypes.push(f);
    })
  }

}
