import { v4 as uuidv4 } from 'uuid';
import {isToday,isThisWeek,isThisMonth,formatDistance,parseISO,differenceInDays,differenceInWeeks,differenceInMonths} from 'date-fns'

export default class ToDo {
    constructor(isFinished,name,project,dueDate,priority,id){
        this._name = name;
        this._project = project;
        this._isFinished = isFinished;
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
        return [this._id,this._priority,this._isFinished,this._name,this.getTimeLeft(),this._dueDate];
    }

    editDetails(isFinished,toDoTitle,dueDate,priority){
        this._isFinished=isFinished;
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

    getTimeLeftInDays(){
        if(this._dueDate==='not set') return 'not set';
        formatDistanceToNowStrict(parseISO(this._dueDate),new Date(),{unit:'day'})
    }
    isWithinInteral(period){
        switch(period){
            case 'Today':
                // console.log(isToday(parseISO(this._dueDate)));
                // return isToday(parseISO(this._dueDate));
                return differenceInDays(parseISO(this._dueDate),new Date())<=1;
            case 'This week':
                // return isThisWeek(parseISO(this._dueDate));
                return differenceInWeeks(parseISO(this._dueDate),new Date())<=1;
            case 'This month':
                return differenceInMonths(parseISO(this._dueDate),new Date())<=1;
                // return isThisMonth(parseISO(this._dueDate));
        }
    }
}