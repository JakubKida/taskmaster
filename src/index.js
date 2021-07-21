import {formatDistance} from 'date-fns'

class ToDo {
    constructor(name,project,dueDate,priority){
        this.name = name;
        this.project = project;
        this.isFinished = false
        this.creationDate = new Date();
        this.dueDate = dueDate;
        this.priority = priority;
    }
    displayItems(){
        // console.log(this.name,this.isFinished,this.project,this.creationDate.getDate(),this.dueDate.getDate(),this.priority);
        console.log(`\nName : ${this.name}`);
        console.log(`Is it done ? ${this.isFinished?'v':'x'}`);
        console.log(`Time Left: ${formatDistance(this.dueDate,new Date())}`);
    }


    toggle(){
        this.isFinished=(this.isFinished?false:true);
    }
}
let sampleDate = new Date(2021,6,24);

// let sampleToDo = new toDo('Dishes','Homework',sampleDate,10);

// sampleToDo.displayItems();

class Project {
    constructor(name){
        this.name = name;
    }
    _toDos =[];

    addToDo(title,dueDate,priority){
        this._toDos.push(new ToDo(title,this.name,dueDate,priority))
    }

    displayTodos(){
        console.log(`Project: ${this.name}`);
        this._toDos.forEach((toDo)=>{
            toDo.displayItems();
        })
    }
}

let sampleProject = new Project('Homework');

sampleProject.addToDo('Dishes',sampleDate,4);
sampleProject.addToDo('Vacuum',sampleDate,5);
sampleProject.addToDo('Cleaning',sampleDate,7);

sampleProject.displayTodos();
sampleProject._toDos[0].toggle();
sampleProject.displayTodos();
