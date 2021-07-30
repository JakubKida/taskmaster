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
        // console.table(projectList);
        // StorageController.addNewProject('Test1');
        // StorageController.addNewProject('Test2')

        $("div#content")
        .append(`<main id="main-wrapper">
        <div id="projects-picker">
            <div id='time-tabs'>
                <h2 id="projects-header">
                    Main & Upcoming Tasks
                </h2>
                <div id="general-tasks" class="project-tab project-tab-switchable" data-UUID=${projectList[0][0]}>
                    <span class="icon-hidden"><i class="project-icon fas fa-exclamation fa-sm"></i></span>
                    ${projectList[0][1]}
                </div>
                <div id="today-tasks" class="project-tab project-tab-switchable" data-UUID="Today">
                    <span class="icon-shown"><i class="project-icon fas fa-exclamation fa-sm"></i></span>
                    <div class="project-title">Today</div>
                </div>
                <div id="week-tasks" class="project-tab project-tab-switchable" data-UUID="This week">
                    <span class="icon-shown"><i class="project-icon fas fa-calendar-day fa-sm" ></i></span>
                    This week
                </div>
                <div id="month-tasks" class="project-tab project-tab-switchable" data-UUID="This month">
                    <span class="icon-shown"><i class="project-icon fas fa-calendar-alt fa-sm"></i></span>
                    This month
                </div>
            </div>
            <h2 id="projects-header">Projects</h2>
            
            <div id="project-tabs">
            </div>
        </div>
        <div class="project-area">
        </div>
        </main>`);  
        this.loadProjectX(projectList[0][0]);
        this.loadCustomProjectsTabs();
    }

    static loadProjectX(projectId){
        let projectDetails = [];
        let todos = [];
        if(projectId==='Today'||projectId==='This week'||projectId==='This month'){
            projectDetails.push(projectId.replace(/\s/g, ""),projectId);
            todos = StorageController.listTodosFromPeriod(projectId);  
        } else {
            projectDetails = StorageController.getProjectDetails(projectId);
            todos = StorageController.listAllTodosFromProject(projectId);
        }

        $('.project-area').empty();
        $('.project-area')
            .append(`
            <div class="project-card" data-UUID="${projectDetails[0]}">
                <div class="project-name">${projectDetails[1]}</div>
                <div class='todos-area'>
                        <div class="add-clear-todos">
                            <div class='todo add-todo' data-UUID=${projectDetails[0]}>
                                <p class='add-todo-text'>Add new To-Do</p>
                            </div>
                            <div class='todo clear-todo' data-UUID=${projectDetails[0]}>
                                <p class='add-todo-text'>Clear completed To-Dos</p>
                            </div>
                        </div>
                </div>
            </div>
            `)
        if(projectId==='Today'||projectId==='This week'||projectId==='This month') $('.add-todo').remove()
        this.loadTodosX(todos);
    }

    static loadTodosX(todos){
        todos.forEach(todoDetails=>{
            $('.todos-area')
            .append(`
            <div class='todo' data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]}>
                <div class="todo-priority-indicator" data-priority=${todoDetails[1]}></div>
                <input data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]} class="todo-checkbox" type="checkbox" ${todoDetails[2]?'checked':'unchecked'}>
                <p class='todo-title' data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]}>${todoDetails[3]}</p>
                <p class='todo-time-left'>${todoDetails[4]==='not set'?'':todoDetails[4]}</p>
                <input class='todo-edit-date' type="date" data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]} value=${todoDetails[5]}>
                <i class="delete-todo-icon fas fa-times" data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]}></i>
            </div>
            `)
        })
        $('.todo-title').on('click',this.openChangeNameTextInput.bind(this));
        $('.todo-edit-date').on('change',this.editTodo.bind(this));
        $('.todo-checkbox').on('change',this.editTodo.bind(this));
        $('.add-todo').on('click',this.openAddTodoForm.bind(this));
        $('.delete-todo-icon').on('click',this.deleteTodo.bind(this));
    }

    static loadCustomProjectsTabs(){
        let projectList = StorageController.listAllProjects();

        $('#project-tabs').empty();
        $('#project-tabs').append(`<div id="add-project-button" class="project-tab">Add new project</div>`)

        projectList.forEach((project)=>{
            if(project[1]==='General') return;
            $('#project-tabs')
                .append(`
                <div class="project-tab project-tab-switchable" data-uuid=${project[0]}>
                    <p class="project-title">${project[1]}</p>
                    <i class="delete-project-icon fas fa-times" data-uuid=${project[0]}></i>
                </div>
                `)
        })
        // $('.project-tab-switchable').on('click',this.switchProject.bind(this));
        $('.project-tab-switchable').on('click',(e)=>{this.loadProjectX(e.currentTarget.dataset.uuid)});
        $('i.delete-project-icon').on('click',this.deleteProject.bind(this));
        $('#add-project-button').on('click',this.openAddProjectForm.bind(this));
    }

    // static loadProjectX(projectID){

    //     let projectDetails = StorageController.getProjectDetails(projectID);
        
    //     $('.project-area').empty();
    //     $('.project-area')
    //         .append(`
    //         <div class="project-card" data-UUID=${projectDetails[0]}>
    //             <div class="project-name">${projectDetails[1]}</div>
    //             <div class='todos-area'>
    //                     <div class="add-clear-todos">
    //                         <div class='todo add-todo' data-UUID=${projectDetails[0]}>
    //                             <p class='add-todo-text'>Add new To-Do</p>
    //                         </div>
    //                         <div class='todo clear-todo'>
    //                             <p class='add-todo-text'>Clear completed To-Dos</p>
    //                         </div>
    //                     </div>
    //             </div>
    //         </div>
    //         `)

    //     this.loadTodosFromProject(projectID);

    //     $('.add-todo').on('click',this.openAddTodoForm.bind(this));
    //     $('.delete-todo-icon').on('click',this.deleteTodo.bind(this));
    // }

    // static loadTodosFromPeriod(period){
    //     let todos = StorageController.listTodosFromPeriod(period);
    //     $('.project-area').empty();
    //     $('.project-area')
    //         .append(`
    //         <div class="project-card">
    //             <div class="project-name" data-uuid=${period}>${period}</div>
    //             <div class='todos-area'>
    //                     <div class="add-clear-todos">
    //                         <div class='todo add-todo'>
    //                             <p class='add-todo-text'>Add new To-Do</p>
    //                         </div>
    //                         <div class='todo clear-todo'>
    //                             <p class='add-todo-text'>Clear completed To-Dos</p>
    //                         </div>
    //                     </div>
    //             </div>
    //         </div>
    //         `)
        
    //     todos.forEach(todoDetails=>{
    //         $('.todos-area')
    //         .append(`
    //         <div class='todo' data-UUID=${todoDetails[0]} data-project-uuid="${todoDetails[5]}">
    //             <div class="priority-indicator" data-priority=${todoDetails[1]}></div>
    //             <input class="todo-checkbox" type="checkbox" ${todoDetails[2]?'checked':'unchecked'}>
    //             <p class='todo-title'>${todoDetails[3]}</p>
    //             <p class='todo-time-left'>${todoDetails[4]}</p>
    //             <i class="delete-todo-icon fas fa-times" data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]}></i>
    //         </div>
    //         `)
    //     })
    //     $('.delete-todo-icon').on('click',this.deleteTodo.bind(this));
    // }

    // static loadTodosFromProject(projectID){
    //     let projectList = StorageController.listAllProjects();
    //     // console.table(projectList);
    //     let todosList = StorageController.listAllTodosFromProject(projectID);
    //     // console.table(todosList);
    //     todosList.forEach(todoDetails=>{
    //         $('.todos-area')
    //         .append(`
    //         <div class='todo' data-UUID=${todoDetails[0]}>
    //             <div class="priority-indicator" data-priority=${todoDetails[1]}></div>
    //             <input class="todo-checkbox" type="checkbox" ${todoDetails[2]?'checked':'unchecked'}>
    //             <p class='todo-title'>${todoDetails[3]}</p>
    //             <p class='todo-time-left'>${todoDetails[4]==='not set'?'':todoDetails[4]}</p>
    //             <i class="delete-todo-icon fas fa-times" data-UUID=${todoDetails[0]} data-project-uuid=${todoDetails[6]}></i>
    //         </div>
    //         `)
    //     })
    // }

    // static switchProject(e){
    //     switch(e.target.id){
    //         case 'today-tasks':
    //             this.loadTodosFromPeriod('Today');
    //             break;
    //         case 'week-tasks':
    //             this.loadTodosFromPeriod('This week');
    //             break;
    //         case 'month-tasks':
    //             this.loadTodosFromPeriod('This month');
    //             break;
    //         default:
    //             this.loadProjectX(e.currentTarget.dataset.uuid);
    //             break;
    //     }
    // }

    static openAddProjectForm(){
        $('#add-project-button')
            .replaceWith(`                
                <div class='project-tab add-project-input'>
                <input class="project-text-input" type="text" placeholder='Project Name'>
                <i class="confirm-project-icon fas fa-check"></i>
                <i class="cancel-project-icon fas fa-times"></i>
                </div>
            `)
        $('.confirm-project-icon ').on('click',this.confirmAddProjectForm.bind(this));
        $('.cancel-project-icon').on('click',this.cancelAddProjectForm.bind(this));
    }

    static confirmAddProjectForm(e){
        let projectName = $('.project-text-input').val();
        if(projectName==='') {
            alert(`Project name can't be empty!`);
            return;
        }
        StorageController.addNewProject(projectName);
        this.loadCustomProjectsTabs();

    }

    static cancelAddProjectForm(){
        this.loadCustomProjectsTabs();
    }

    static deleteProject(e){
        if(confirm('Do you want to delete this project?')){
            let uuidToDelete=e.currentTarget.dataset.uuid;
            StorageController.removeProject(uuidToDelete)
            $(`.project-tab[data-uuid="${uuidToDelete}"]`).remove();
            this.loadProjectX($(`#general-tasks`).data('uuid'));
        }
    }

    static openAddTodoForm(e){
        $('.add-clear-todos').replaceWith(`
        <div class='todo create-todo-form'>
            <input class="todo-name-input" type="text" placeholder="What needs to be done?">
                <label for="todo-priority-picker">Priority:</label>
                <select id="todo-priority-picker" class="todo-priority-picker" value='0'>
                    <option value='0' selected>Not set</option>
                    <option value='1'>Relevant</option>
                    <option value='2'>Important</option>
                    <option value='3'>Critical</option>
                </select>
                <label for="due-date-picker">Due date:</label>
                <input id='due-date-picker' class='due-date-picker' class="due-date-picker" type="date" placeholder="pick due date"> 
                <div class="accept-new-todo">Add</div>
            <div class="cancel-new-todo">Cancel</div>
        </div>
        `)
        $('.accept-new-todo').on('click',this.confirmNewTodo.bind(this));
        $('.cancel-new-todo').on('click',this.cancelNewTodo.bind(this));
    }

    static confirmNewTodo(){
        let projectId = $(`.project-card`).data('uuid');
        let name = $('.todo-name-input').val();
        if(name==='') {
            alert(`The name of the todo can't be empty!`);
            return;
        }
        let priority = $('.todo-priority-picker').val();
        let duedate = $('.due-date-picker').val() || 'not set';
        StorageController.addTodo(projectId,name,duedate,priority);
        this.loadProjectX(projectId);
    }

    static cancelNewTodo(){
        this.loadProjectX($(`.project-card`).data('uuid'));
    }
    
    static deleteTodo(e){
        let projectId = e.currentTarget.dataset.projectUuid;
        let todoId = e.currentTarget.dataset.uuid;
        StorageController.deleteTodo(projectId,todoId);
        $(".todo[data-uuid=" + todoId +"]").remove();
    }

    static editTodo(e){
        let todoId=e.currentTarget.dataset.uuid;
        let projectId=e.currentTarget.dataset.projectUuid;
        let todoToEdit = $(".todo[data-uuid=" + todoId +"]");

        let title = todoToEdit.find('.todo-title').val() || todoToEdit.find('.todo-title').text();
        let isFinished = todoToEdit.find('.todo-checkbox').prop('checked');
        let dueDate = todoToEdit.find('.todo-edit-date').val();
        let priority = todoToEdit.find('.todo-priority-indicator').data('priority');

        // let title = $(".todo-title[data-uuid=" + todoId +"]").text();
        // let isFinished = $(".todo-checkbox[data-uuid=" + todoId +"]").prop('checked');
        // let sampleDate = new Date(2022,1,1);
        // let samplePriority = 0;

        StorageController.editToDo(projectId,todoId,isFinished,title,dueDate?dueDate:'not set',priority);
        // console.log(e.currentTarget.dataset.uuid,e.currentTarget.dataset.projectUuid);
        // this.loadProjectX(projectId)
        this.loadProjectX($(`.project-card`).data('uuid'));
        // console.log(StorageController.listAllTodosFromProject(projectId))
    }

    static openChangeNameTextInput(e){
        let todoId=e.currentTarget.dataset.uuid;
        let projectId=e.currentTarget.dataset.projectUuid;
        let todoToEdit = $(".todo[data-uuid=" + todoId +"]");
        let title = todoToEdit.find('.todo-title').text()
        $(".todo-title[data-uuid=" + todoId +"]").replaceWith(`<input class="edit-name-input todo-title" type="text" value="${title}" data-UUID=${todoId} data-project-uuid=${projectId}>`);
        $('.edit-name-input').focus()
        $('.edit-name-input').on('focusout',this.editTodo.bind(this));
    
        // $(`.edit-name-input`).replaceWith($(".todo-title[data-uuid=" + todoId +"]"))
    }

    //TO DO - clearing completed todos, displaying priority, css editing for responsiveness (hamburger menu)  
}
