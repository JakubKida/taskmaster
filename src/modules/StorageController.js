import Project from "./Project";
import ProjectsList from "./ProjectsList";

export default class StorageController{

    static loadFromStorage(){
        let projectList = new ProjectsList();

        if(localStorage.getItem('projectList')===null) {
            projectList.addProject('General');
            return projectList;
        }

        let object = JSON.parse(localStorage.getItem('projectList'));
        // if(object===null) return;
        object._projects.forEach(projectToAdd => {
            projectList.addProject(projectToAdd._name,projectToAdd._id,projectToAdd._toDos);
        });

        return projectList;
    }

    static saveToStorage(projectsList){
        localStorage.setItem('projectList',JSON.stringify(projectsList));
    }

    static listAllProjects(){
        let projects = this.loadFromStorage();
        let result = projects.getAllProjectNames();
        return result;
    }

    static addNewProject(projectName){
        let projects = this.loadFromStorage();
        projects.addProject(projectName);
        this.saveToStorage(projects);
    }

    static editProject(projectId,newProjectName){
        let projects = this.loadFromStorage();
        projects.editProjectName(projectId,newProjectName)
        this.saveToStorage(projects);
    }

    static removeProject(projectId){
        let projects = this.loadFromStorage();
        if(projects.getProject(projectId)._name==='General') return;
        projects.deleteProject(projectId);
        this.saveToStorage(projects);
    }

    static listAllTodosFromProject(projectId){
        let projects = this.loadFromStorage();
        let projectToList = projects.getProject(projectId);
        return projectToList.listAllTodos();
    }

    

    static addTodo(projectId,toDoTitle,dueDate,priority){
        let projects = this.loadFromStorage();
        projects.addToDoToProject(projectId,toDoTitle,dueDate,priority)
        this.saveToStorage(projects);
    }

    static deleteTodo(projectId,toDoId){
        let projects = this.loadFromStorage();
        projects.deleteToDoFromProject(projectId,toDoId)
        this.saveToStorage(projects);
    }

}