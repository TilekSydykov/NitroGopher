import { Component, OnInit } from '@angular/core';
import {StorageService} from '../../services/storage/storage.service';
import {Project} from '../../builder/models/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project> = new Array<Project>();
  selectedProject: Project = new Project();
  newProject: Project = new Project();

  editSelected: boolean = false;
  constructor(
    private storageService: StorageService
  ) {

  }

  ngOnInit(): void {
    this.storageService.projects.subscribe((proj) => {
      this.projects = proj;
      if(this.selectedProject.ID == 0 && proj.length > 0){
        this.selectedProject = proj[0]
      }
    });
    this.storageService.updateProjects();
  }

  createProject(){
    this.newProject.ID = Math.floor(Math.random() * 999_999_999);
    this.storageService.addProject(this.newProject);
    this.newProject = new Project();
  }

  saveSelected() {
    this.editSelected = false;
    this.storageService.saveProject(this.selectedProject);
  }

}
