import ProjectsList from './modules/ProjectsList.js'
import StorageController from './modules/StorageController.js'
import Project from './modules/Project.js'


let sampleDate = new Date(2021,6,24);
let sampleProjectList = new ProjectsList();
let exampPro = new Project('Lala');
// console.log(exampPro)

// sampleProject.addToDo('Dishes',sampleDate,4);
// sampleProject.addToDo('Vacuum',sampleDate,5);
// sampleProject.addToDo('Cleaning',sampleDate,7);

// sampleProject.displayTodos();
// sampleProject._toDos[0].toggle();
// sampleProject.displayTodos();

// let stor = new StorageController();

// StorageController.saveAllProjects(sampleProjectList);

StorageController.loadFromStorage();
// sampleProjectList.displayAllProjects();
// sampleProjectList.addToDoToProject(sampleProjectList._projects[0]._id,'Dishes',sampleDate,10);
// console.log(sampleProjectList)
StorageController.addNewProject('lala');
StorageController.addNewProject('lalaraj');
let uuid = StorageController.listAllProjects()
console.log(StorageController.listAllProjects());
StorageController.addTodo(uuid[0][0],'Jojo',sampleDate,0);

// StorageController.addTodo(uuid[0][0],'Jeje',sampleDate,0);
// StorageController.addTodo(uuid[0][0],'Juju',sampleDate,0);
// StorageController.addTodo(uuid[0][0],'haha',sampleDate,0);
// StorageController.addTodo(uuid[0][0],'Bobo',sampleDate,0);
// console.log();
console.table(StorageController.listAllTodosFromProject(uuid[0][0]));
StorageController.deleteTodo(uuid[0][0],'f1ee642e-43c7-44b1-98c5-c8d1300e606b');
console.table(StorageController.listAllTodosFromProject(uuid[0][0]));
// StorageController.editProject()
// StorageController.saveAllProjects(sampleProjectList);
// console.log(StorageController.loadFromStorage());
// sampleProjectList.addProject('Learning');
// sampleProjectList.addToDoToProject('Learning','python',sampleDate,10);
// sampleProjectList.toggleToDoInProject('Today',0);
// sampleProjectList.displayAllProjects();
// sampleProjectList.editProjectName('Learning','Teaching');
// sampleProjectList.displayAllProjects();
