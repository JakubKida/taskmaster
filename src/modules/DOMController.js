import $ from "jquery";
import StorageController from "./StorageController";
// import ProjectsList from './modules/ProjectsList.js'
// import Project from './modules/Project.js'

export default class DOMController{

    static initializePage(){
        $(() => {
            this.loadHeader();
            this.loadMainContent();
        });
    }

    static loadHeader(){
        $("div#content")
        .append(`
            <header id="header"> 
                <h1 id="title">
                    <i class="far fa-check-square"></i>
                    TaskMaster - just check it!
                </h1>
            </header>
        `);
    }

    static loadMainContent(){
        let projectList = StorageController.listAllProjects();
        console.table(projectList);
        StorageController.addNewProject('Test1');
        StorageController.addNewProject('Test2')

        $("div#content")
        .append(`<main id="main-wrapper">
        <div id="projects-picker">
            <div id='time-tabs'>
                <h2 id="projects-header">
                    Main & Upcoming Tasks
                </h2>
                <div id="general-tasks" class="project-tab" data-UUID=${projectList[0][0]}>
                    <span class="icon-hidden"><i class="project-icon fas fa-exclamation fa-sm"></i></span>
                    ${projectList[0][1]}
                </div>
                <div id="today-tasks" class="project-tab">
                    <span class="icon-shown"><i class="project-icon fas fa-exclamation fa-sm"></i></span>
                    <div class="project-title">Today</div>
                </div>
                <div id="week-tasks" class="project-tab">
                    <span class="icon-shown"><i class="project-icon fas fa-calendar-day fa-sm"></i></span>
                    This Week
                </div>
                <div id="month-tasks" class="project-tab">
                    <span class="icon-shown"><i class="project-icon fas fa-calendar-alt fa-sm"></i></span>
                    This Month
                </div>
            </div>
            <div id="project-tabs">
                <h2 id="projects-header"> Projects</h2>
                <div id="add-project-button" class="project-tab">Add new project</div>
            </div>
        </div>
        <div class="project-area">

        </div>
        </main>`);  
        // // this.loadCustomProjects();
        StorageController.addTodo(projectList[0][0],'Today',new Date(2021,6,28,20),1);
        StorageController.addTodo(projectList[0][0],'Tommorow',new Date(2021,6,30),1);
        StorageController.addTodo(projectList[0][0],'Day After Tommorow',new Date(2021,6,31),1);
        StorageController.addTodo(projectList[0][0],'New Month',new Date(2021,7,0),1);
        StorageController.addTodo(projectList[0][0],'Habib',new Date(2021,7,16),1);
        StorageController.addTodo(projectList[0][0],'Outto',new Date(2021,8,30),1);
        // StorageController.addTodo(projectList[0][0],'JEl',new Date(),1);
        // StorageController.addTodo(projectList[1][0],'This is anotherrrr',new Date(),1);
        // StorageController.addTodo(projectList[1][0],'Yoo co cool',new Date(),1);
    
        this.loadProject(projectList[0][0]);
        this.loadCustomProjects();
        $('.project-tab').on('click',this.switchProject.bind(this));
    }

    static loadCustomProjects(){
        let projectList = StorageController.listAllProjects();
        projectList.forEach((project)=>{
            if(project[1]==='General') return;
            $('#project-tabs')
                .append(`
                <div class="project-tab" data-uuid=${project[0]}>
                    <p class="project-title">${project[1]}</p>
                    <i class="delete-project-icon fas fa-times"></i>
                </div>
                `)
        })
    }

    static loadProject(projectID){

        let projectDetails = StorageController.getProjectDetails(projectID);
        
        $('.project-area').empty();
        $('.project-area')
            .append(`
            <div class="project-card" data-UUID=${projectDetails[0]}>
                <div class="project-name">${projectDetails[1]}</div>
                <div class='todos-area'>
                        <div class="add-clear-todos">
                            <div class='todo add-todo'>
                                <p class='add-todo-text' data-UUID='bjak-osic-ajvc-isau'>Add new To-Do</p>
                            </div>
                            <div class='todo clear-todo'>
                                <p class='add-todo-text'>Clear completed To-Dos</p>
                            </div>
                        </div>
                </div>
            </div>
            `)
        this.loadTodos(projectID);
    }

    static loadTodosFromPeriod(period){
        let todos = StorageController.listTodosFromPeriod(period);
        console.table(todos);
        $('.project-area').empty();
        $('.project-area')
            .append(`
            <div class="project-card">
                <div class="project-name">${period}</div>
                <div class='todos-area'>
                        <div class="add-clear-todos">
                            <div class='todo add-todo'>
                                <p class='add-todo-text' data-UUID='bjak-osic-ajvc-isau'>Add new To-Do</p>
                            </div>
                            <div class='todo clear-todo'>
                                <p class='add-todo-text'>Clear completed To-Dos</p>
                            </div>
                        </div>
                </div>
            </div>
            `)
        
        todos.forEach(todoDetails=>{
            $('.todos-area')
            .append(`
            <div class='todo' data-UUID=${todoDetails[0]}>
                <div class="priority-indicator" data-priority=${todoDetails[1]}></div>
                <input class="todo-checkbox" type="checkbox" ${todoDetails[2]?'checked':'unchecked'}>
                <p class='todo-title'>${todoDetails[3]}</p>
                <p class='todo-time-left'>${todoDetails[4]}</p>
                <i class="delete-todo-icon fas fa-times"></i>
            </div>
            `)
        })
    }

    static loadTodos(projectID){
        let projectList = StorageController.listAllProjects();
        console.table(projectList);
        let todosList = StorageController.listAllTodosFromProject(projectID);
        console.table(todosList);
        todosList.forEach(todoDetails=>{
            $('.todos-area')
            .append(`
            <div class='todo' data-UUID=${todoDetails[0]}>
                <div class="priority-indicator" data-priority=${todoDetails[1]}></div>
                <input class="todo-checkbox" type="checkbox" ${todoDetails[2]?'checked':'unchecked'}>
                <p class='todo-title'>${todoDetails[3]}</p>
                <p class='todo-time-left'>${todoDetails[4]}</p>
                <i class="delete-todo-icon fas fa-times"></i>
            </div>
            `)
        })
    }

    static switchProject(e){
        

        switch(e.target.id){
            case 'today-tasks':
                this.loadTodosFromPeriod('Today');
                break;
            case 'week-tasks':
                this.loadTodosFromPeriod('This week');
                break;
            case 'month-tasks':
                this.loadTodosFromPeriod('This month');
                break;
            default:
                this.loadProject(e.currentTarget.dataset.uuid);
                break;
        }
        console.log(e.target.dataset.uuid);
    }
}