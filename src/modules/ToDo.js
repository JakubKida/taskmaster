import { v4 as uuidv4 } from 'uuid';
import {compareAsc,formatDistance,parseISO,differenceInDays,differenceInWeeks,differenceInMonths} from 'date-fns'

export default class ToDo {
    constructor(isFinished,name,project,dueDate,priority,id){
        this._name = name;
        this._project = project;
        this._isFinished = isFinished;
        this._creationDate = new Date();
        this._dueDate = dueDate;
        this._priority = priority;
        
        this._id=id||uuidv4(); 
    }

    getDetails(){
        return [this._id,this._priority,this._isFinished,this._name,this.getTimeLeft(),this._dueDate];
    }

    editDetails(isFinished,toDoTitle,dueDate,priority){
        this._isFinished=isFinished;
        this._name=toDoTitle;
        this._dueDate=dueDate;
        this._priority=priority;
    }

    getTimeLeft(){
        if(this._dueDate==='not set') return 'not set';
        if(compareAsc(parseISO(this._dueDate),new Date())===-1) return 'Date passed!';   
        return formatDistance(parseISO(this._dueDate),new Date());
    }

    isWithinInteral(period){
        switch(period){
            case 'Today':
                return differenceInDays(parseISO(this._dueDate),new Date())<=1;
            case 'This week':
                return differenceInWeeks(parseISO(this._dueDate),new Date())<=1;
            case 'This month':
                return differenceInMonths(parseISO(this._dueDate),new Date())<=1;
        }
    }
}