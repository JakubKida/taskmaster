import Project from "./Project";

export default class ProjectsList{

    constructor(){
        this._projects = [];
    }

    //methods for manipulating projects
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


    //methods for manipulating todos
    addToDoToProject(projectId,toDoTitle,dueDate,priority){
        let projectToAddTo = this.getProject(projectId);
        if(projectToAddTo!==false) projectToAddTo.addToDo(false,toDoTitle,dueDate,priority);
    }

    editToDoInProject(projectId,toDoId,isFinished,toDoTitle,dueDate,priority){
        let projectToEditIn = this.getProject(projectId);
        if(projectToEditIn!==false) projectToEditIn.editToDo(toDoId,isFinished,toDoTitle,dueDate,priority);
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

    deleteToDoFromProject(projectId,toDoId){
        this.getProject(projectId).deleteToDo(toDoId);
    }
}