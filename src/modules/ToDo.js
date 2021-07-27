import { v4 as uuidv4 } from 'uuid';
import {formatDistance,parseISO} from 'date-fns'

export default class ToDo {
    constructor(name,project,dueDate,priority,id){
        this._name = name;
        this._project = project;
        this._isFinished = false;
        this._creationDate = new Date();
        this._dueDate = dueDate;
        this._priority = priority;

        if (id !== undefined) {
            this._id=id;
        } else { 
            this._id = uuidv4(); 
        }
    }
    
    displayItems(){
        console.log(`\nId : ${this._id}`);
        console.log(`Name : ${this._name}`);
        console.log(`Is it done ? ${this._isFinished?'v':'x'}`);
        console.log(`Time Left: ${formatDistance(this._dueDate,new Date())}`);
    }

    getDetails(){
        return [this._isFinished,this._name,this._creationDate,this.getTimeleft(),this._priority];
    }

    editDetails(toDoTitle,dueDate,priority){
        this._name=toDoTitle;
        this._dueDate=dueDate;
        this._priority=priority;
    }

    toggle(){
        this._isFinished=(this._isFinished?false:true);
    }

    getTimeLeft(){
        if(this._dueDate==='not set') return 'not set';
        return formatDistance(parseISO(this._dueDate),new Date());
    }
}