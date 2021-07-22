import ToDoList from './modules/ProjectsList.js'

let sampleDate = new Date(2021,6,24);
let sampleProjectList = new ToDoList();

// sampleProject.addToDo('Dishes',sampleDate,4);
// sampleProject.addToDo('Vacuum',sampleDate,5);
// sampleProject.addToDo('Cleaning',sampleDate,7);

// sampleProject.displayTodos();
// sampleProject._toDos[0].toggle();
// sampleProject.displayTodos();


sampleProjectList.displayAllProjects();
sampleProjectList.addToDoToProject('Today','Dishes',sampleDate,10);
sampleProjectList.displayAllProjects();
sampleProjectList.addProject('Learning');
sampleProjectList.addToDoToProject('Learning','python',sampleDate,10);
sampleProjectList.toggleToDoInProject('Today',0);
sampleProjectList.displayAllProjects();
sampleProjectList.editProjectName('Learning','Teaching');
sampleProjectList.displayAllProjects();
