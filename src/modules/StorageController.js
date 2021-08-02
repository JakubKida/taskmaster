import ProjectsList from "./ProjectsList";

export default class StorageController{


    static loadFromStorage(){
        let projectList = new ProjectsList();
        
        if(localStorage.getItem('projectList')!==null) {
            //if there are projects in storage, create list of projects from localStorage
            let object = JSON.parse(localStorage.getItem('projectList'));
            object._projects.forEach(projectToAdd => {
                projectList.addProject(projectToAdd._name,projectToAdd._id,projectToAdd._toDos);
            });
        } else {
            //if there is no projects in localStorage, add a default 'General' one 
            projectList.addProject('General');
        }

        return projectList;
    }

    static saveToStorage(projectList){
        localStorage.setItem('projectList',JSON.stringify(projectList));
    }

    //functions for manipulating projects in storage
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

    static getProjectDetails(projectId){
        let projects = this.loadFromStorage();
        let foundProject = projects.getProjectInfo(projectId)
        this.saveToStorage(projects);
        return foundProject;
    }

    static listAllProjects(){
        let projects = this.loadFromStorage();
        let result = projects.getAllProjectNames();
        this.saveToStorage(projects);
        return result;
    }

    static removeProject(projectId){
        let projects = this.loadFromStorage();
        if(projects.getProject(projectId)._name==='General') return;
        projects.deleteProject(projectId);
        this.saveToStorage(projects);
    }

    //functions for manipulating todos in storage
    static addTodo(projectId,toDoTitle,dueDate,priority){
        let projects = this.loadFromStorage();
        projects.addToDoToProject(projectId,toDoTitle,dueDate,priority)
        this.saveToStorage(projects);
    }

    static editToDo(projectId,todoId,isFinished,todoTitle,dueDate,priority){
        let projects = this.loadFromStorage();
        projects.editToDoInProject(projectId,todoId,isFinished,todoTitle,dueDate,priority);
        this.saveToStorage(projects);
    }

    static listAllTodosFromProject(projectId){
        let projects = this.loadFromStorage();
        let projectToList = projects.getProject(projectId);
        this.saveToStorage(projects);
        return projectToList.listAllTodos();
    }

    static listTodosFromPeriod(period){
        let projects = this.loadFromStorage();
        let periodTodos = projects.getTodosFromPeriod(period);
        this.saveToStorage(projects);
        return periodTodos;
    }

    static deleteTodo(projectId,toDoId){
        let projects = this.loadFromStorage();
        projects.deleteToDoFromProject(projectId,toDoId)
        this.saveToStorage(projects);
    }

}