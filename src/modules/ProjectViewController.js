import StorageController from './StorageController.js';
import ProjectsList from './ProjectsList.js';
import DOMController from './DOMController.js';

export default class ProjectViewController{
    constructor(){
        this.projectList = new ProjectsList();
        this.storageController = new StorageController();
        this.storageController.getAllProjects().forEach(project=>this.projectList.addProject(project));
        this.DOMController = new DOMController();
        this.DOMController.initializePage();
        this.currentProject = this.projectList.getProject('General');
    }

    switchProject(name){
        this.currentProject = this.projectList.getProject(name);
        this.DOMController.openProject(name);
    }

    addNewProject(name){
        this.projectList.addProject(name);
    }
}