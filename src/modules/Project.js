import { v4 as uuidv4 } from 'uuid';
import ToDo from './ToDo.js'

export default class Project {
    constructor(name,id,todos){
        this._name = name;
        this._toDos = [];
        if(todos!==undefined)
            todos.forEach(todo=>this.addToDo(todo._isFinished,todo._name,todo._dueDate,todo._priority,todo._id))

        if(id===undefined)
            this._id = uuidv4();
        else {
            this._id = id;
        }
    }

    getTodo(toDoId){
        return this._toDos.find((todo)=>todo._id===toDoId);
    }

    addToDo(isFinished,title,dueDate,priority,id){
        this._toDos.push(new ToDo(isFinished,title,this._name,dueDate,priority,id))
    }

    deleteToDo(toDoId){
        let toDoToIndex = this._toDos.findIndex((toDo)=>toDo._id===toDoId)
        this._toDos.splice(toDoToIndex,1);
    }

    editToDo(toDoId,isFinished,toDoTitle,dueDate,priority){
        this.getTodo(toDoId).editDetails(isFinished,toDoTitle,dueDate,priority);
    }

    // for console designing
    displayTodos(){
        console.log(`Project: ${this.name}`);
        console.log(this);
        this._toDos.forEach((toDo)=>{
            toDo.displayItems();
        })
    }

    listAllTodos(){
        let todosDetailList = [];
        this._toDos.forEach(todo=>{
            todosDetailList.push([todo._id,todo._priority,todo._isFinished,todo._name,todo.getTimeLeft(),todo._dueDate,this._id])
        })
        return todosDetailList;
    }


}