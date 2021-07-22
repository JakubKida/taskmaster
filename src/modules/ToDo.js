import {formatDistance} from 'date-fns'

export default class ToDo {
    constructor(name,project,dueDate,priority){
        this.name = name;
        this.project = project;
        this.isFinished = false;
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

    getDetails(){
        return [this,isFinished,this.name,this.creationDate,this.getTimeleft(),this.priority];
    }

    toggle(){
        this.isFinished=(this.isFinished?false:true);
    }

    getTimeLeft(){
        if(this.dueDate==='not set') return 'not set';
        return formatDistance(this.dueDate,new Date());
    }
}