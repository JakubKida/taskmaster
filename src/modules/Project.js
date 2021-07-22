import ToDo from './ToDo.js'

export default class Project {
    constructor(name){
        this._name = name;
    }
    _toDos =[];

    get name(){
        return this._name;
    }

    set name(newName){
        this._name = newName;
    }

    get toDos(){
        return this._toDos;
    }

    getTodo(index){
        return this._toDos[index];
    }

    addToDo(title,dueDate,priority){
        this._toDos.push(new ToDo(title,this.name,dueDate,priority))
    }

    deleteToDo(index){
        this._toDos.splice(index,1);
    }

    //for console designing
    displayTodos(){
        console.log(`Project: ${this.name}`);
        this._toDos.forEach((toDo)=>{
            toDo.displayItems();
        })
    }


}