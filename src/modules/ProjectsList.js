import Project from "./Project";

export default class ProjectsList{

    constructor(){
        let _projects = [];
        _projects.push(new Project('General'));
        _projects.push(new Project('Today'));
        _projects.push(new Project('This Week'));
    }

    addProject(projectName){
        if(projectName!==undefined){
        this._projects.push(new Project(projectName));
        return true;
        } else {
            return false;
        }
    }

    getProject(projectName){
        let foundProject = this._projects.find(project=>project.name===projectName);
        if(foundProject !== undefined){
            return foundProject;
        } else {
            return false;
        }
    }

    editProjectName(projectName,newProjectName){
        let projectToEdit = this.getProject(projectName);
        projectToEdit.name = newProjectName;
    }

    addToDoToProject(projectName,toDoTitle,dueDate,priority){
        this.getProject(projectName).addToDo(toDoTitle,dueDate,priority);
    }

    editToDoInProject(projectName,toDoIndex,toDoTitle,dueDate,priority){
        this.getProject(projectName,)
    }  

    toggleToDoInProject(projectName,toDoIndex){
        this.getProject(projectName).getTodo(toDoIndex).toggle();
    }

    // getToDoFromProject(projectName,toDoIndex){
    //     return this.getProject(projectName).getTodo(toDoIndex);
    // }

    // displayProject(projectName){
    //     let foundProject = this.getProject(projectName);
    //     foundProject.displayTodos();
    // }

    deleteToDoFromProject(projectName,toDoIndex){
        this.getProject(projectName);
    }

    getAllProjects(){
        return this._projects;
    }

    // displayAllProjects(){
    //     this._projects.forEach(project=>project.displayTodos());
    // }

}