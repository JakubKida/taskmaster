import Project from "./Project";

export default class ProjectsList{

    constructor(){
        this._projects = [];
        // this._projects.push(new Project('General'));
        // this._projects.push(new Project('Today'));
        // this._projects.push(new Project('This Week'));
    }

    addProject(projectName,projectId,todosList){
        if(projectName!==undefined){
        this._projects.push(new Project(projectName,projectId,todosList));
        return true;
        } else {
            return false;
        }
    }

    getProject(projectId){
        let foundProject = this._projects.find(project=>project._id===projectId);
        if(foundProject !== undefined){
            return foundProject;
        } else {
            return false;
        }
    }

    getProjectInfo(projectId){
        let projectToGetInfo = this.getProject(projectId);
        if (projectToGetInfo!==false){
            return [projectToGetInfo._id,projectToGetInfo._name]
        } else {
            return false;
        }
    }

    editProjectName(projectId,newProjectName){
        let projectToEdit = this.getProject(projectId);
        if (projectToEdit!==false) projectToEdit.name = newProjectName;
    }

    addToDoToProject(projectId,toDoTitle,dueDate,priority){
        let projectToAddTo = this.getProject(projectId);
        if(projectToAddTo!==false) projectToAddTo.addToDo(toDoTitle,dueDate,priority);
    }

    editToDoInProject(projectId,toDoId,toDoTitle,dueDate,priority){
        let projectToEditIn = this.getProject(projectId);
        if(projectToEditIn!==false) projectToEditIn.editToDo(toDoId,toDoTitle,dueDate,priority);
    }  

    toggleToDoInProject(projectId,toDoId){
        let projectToToggleIn = this.getProject(projectId);
        if(projectToToggleIn!==false) projectToToggleIn.getTodo(toDoId).toggle();
    }

    // getToDoFromProject(projectName,toDoIndex){
    //     return this.getProject(projectName).getTodo(toDoIndex);
    // }

    // displayProject(projectName){
    //     let foundProject = this.getProject(projectName);
    //     foundProject.displayTodos();
    // }
    getAllProjectNames(){
        let projectNames = [];
        this._projects.forEach(project=>{
            projectNames.push([project._id,project._name]);
        })
        return projectNames;        
    }

    deleteProject(projectId){
        let projectIndexToDelete = this._projects.findIndex((project)=>project._id===projectId);
        if(projectIndexToDelete!=-1) this._projects.splice(projectIndexToDelete,1);
    }

    deleteToDoFromProject(projectId,toDoId){
        this.getProject(projectId).deleteToDo(toDoId);
    }

    getAllProjects(){
        return this._projects;
    }

    displayAllProjects(){
        this._projects.forEach(project=>project.displayTodos());
    }

    getTodosFromPeriod(period){
        let periodTodos = [];
        this._projects.forEach(project=>{
            project._toDos.forEach(todo=>{
                if(todo.isWithinInteral(period)) periodTodos.push([...todo.getDetails(),project._id]);
            })
        })
        return periodTodos;
    }
    // saveToStorage(){}
    // getTodayTodos()
    // getThisWeekTodos()
    // getThisMonthTodos()

}