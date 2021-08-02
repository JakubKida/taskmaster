import $ from "jquery";
import StorageController from "./StorageController";

export default class DOMController{

    static initializePage(){
        $(() => {
            this.loadHeader();
            this.loadMainContent();
        });
    }

    //functions for loading main content
    static loadHeader(){
        $("div#content")
        .append(`
            <header id="header"> 
                <h1 id="title">
                    <i class="far fa-check-square"></i>
                    TaskMaster
                </h1>
                <i class="hamburger-menu fas fa-bars fa-5x"></i>
            </header>
        `);
        //hamburger menu handling for mobile devices
        $('.hamburger-menu').on('click',this.openBarMenu.bind(this))
    }

    static loadMainContent(){
        let projectList = StorageController.listAllProjects();

        $("div#content")
        .append(`
            <main id="main-wrapper">
                <div class="hidden projects-picker">
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
                    
                    <div id="custom-project-tabs">
                    </div>
                </div>
                <div class="project-area visible">
                </div>
            </main>`);  
        this.loadCustomProjectsTabs();

        //load general project by default on page load
        this.loadProject(projectList[0][0]);
    }


    //add tabs/buttons for switching between projects
    static loadCustomProjectsTabs(){
        let projectList = StorageController.listAllProjects();

        $('#custom-project-tabs').empty();
        $('#custom-project-tabs')
            .append(`
                    <div id="add-project-button" class="project-tab">Add new project</div>
                    `)

        projectList.forEach((project)=>{
            if(project[1]==='General') return;
            $('#custom-project-tabs')
                .append(`
                <div class="project-tab project-tab-switchable" data-uuid=${project[0]}>
                    <p class="project-title">${project[1]}</p>
                    <i class="delete-project-icon fas fa-times" data-uuid=${project[0]}></i>
                </div>
                `)
        })
        $('.project-tab-switchable').on('click',(e)=>{
            this.loadProject(e.currentTarget.dataset.uuid);
            this.closeBarMenu.call(this);
        });
        $('i.delete-project-icon').on('click',this.deleteProject.bind(this));
        $('#add-project-button').on('click',this.openAddProjectForm.bind(this));
    }

    static loadProject(projectId){
        let projectDetails = [];
        let todos = [];

        //choose the method for obtaining projects and todos based on view type (project/time period)
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
                            <div class='add-todo' data-UUID=${projectDetails[0]}>
                                <p class='add-todo-text'>Add new To-Do</p>
                            </div>
                            <div class='clear-todo' data-UUID=${projectDetails[0]}>
                                <p class='add-todo-text'>Clear completed To-Dos</p>
                            </div>
                        </div>
                </div>
            </div>
            `)

        $('.add-todo').on('click',this.openAddTodoForm.bind(this));
        $('.clear-todo').on('click',this.clearCompletedTodos.bind(this));

        //remove add todo button in time period view 
        if(projectId==='Today'||projectId==='This week'||projectId==='This month') $('.add-todo').remove();

        this.loadTodos(todos);
    }

    static loadTodos(todos){

        todos.forEach(todoDetails=>{
            let [todoId,priority,isFinished,title,timeLeft,dueDate,projectId]=todoDetails;
            $('.todos-area')
            .append(`
            <div class='todo' data-UUID=${todoId} data-project-uuid=${projectId}>
                <div class="todo-priority-indicator" data-priority=${priority} data-UUID=${todoId} data-project-uuid=${projectId}></div>
                <input data-UUID=${todoId} data-project-uuid=${projectId} class="todo-checkbox" type="checkbox" ${isFinished?'checked':'unchecked'}>
                <p class='todo-title' data-UUID=${todoId} data-project-uuid=${projectId}>${title}</p>
                <p class='todo-time-left' data-UUID=${todoId} data-project-uuid=${projectId}>${timeLeft}</p>
                <input class='todo-edit-date' type="date" data-UUID=${todoId} data-project-uuid=${projectId} value=${dueDate}>
                <i class="delete-todo-icon fas fa-times" data-UUID=${todoId} data-project-uuid=${projectId}></i>
            </div>
            `)
        })
        //event handlers for manipulating the todo
        $('.todo-priority-indicator').on('click',this.openPriorityInput.bind(this));
        $('.todo-title').on('click',this.openChangeNameTextInput.bind(this));
        $('.todo-edit-date').on('change',this.editTodo.bind(this));
        $('.todo-checkbox').on('change',this.editTodo.bind(this));
        $('.delete-todo-icon').on('click',this.deleteTodo.bind(this));

        //handle editing the due date for touchscreens (without hovering over the todo) - display date input when time left is clicked
        $('.todo-time-left').on('click',(e)=>{
           let todoId = e.currentTarget.dataset.uuid;
           let timeLeftElement = $(`.todo-time-left[data-uuid=${todoId}]`);
           let datePickerElement = $(`.todo-edit-date[data-uuid=${todoId}]`);

           timeLeftElement.css('display','none');

           datePickerElement.css('visibility','visible');
           datePickerElement.css('display','unset');
           datePickerElement.focus();
           datePickerElement.on('focusout',this.editTodo.bind(this));
        })
    }

    //functions for adding and deleting projects
    static openAddProjectForm(){

        $('#add-project-button')
            .replaceWith(`                
                <div class='project-tab add-project-input'>
                    <input class="project-text-input" type="text" placeholder='Project Name'>
                    <i class="confirm-project-icon fas fa-check"></i>
                    <i class="cancel-project-icon fas fa-times"></i>
                </div>
            `)
        $('.project-text-input').focus();
        $('.project-text-input').on('keypress',this.confirmAddProjectForm.bind(this));
        $('.confirm-project-icon ').on('click',this.confirmAddProjectForm.bind(this));
        $('.cancel-project-icon').on('click',this.cancelAddProjectForm.bind(this));
    }

    static confirmAddProjectForm(e){
        let projectName = $('.project-text-input').val();
        if(e.type === 'keypress' && e.which!==13) return;
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
            this.loadProject($(`#general-tasks`).data('uuid'));
        }
    }

    // functions for adding new todos
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
        $('.todo-name-input').focus();
        $('.todo-name-input').on('keypress',this.confirmNewTodo.bind(this));
        $('.accept-new-todo').on('click',this.confirmNewTodo.bind(this));
        $('.cancel-new-todo').on('click',this.cancelNewTodo.bind(this));
    }

    static confirmNewTodo(e){
        let projectId = $(`.project-card`).data('uuid');
        let name = $('.todo-name-input').val();
        if(e.type === 'keypress' && e.which!==13) return;
        if(name==='') {
            alert(`The name of the todo can't be empty!`);
            return;
        }
        let priority = $('.todo-priority-picker').val();
        let duedate = $('.due-date-picker').val() || 'not set';
        StorageController.addTodo(projectId,name,duedate,priority);
        this.loadProject(projectId);
    }

    static cancelNewTodo(){
        this.loadProject($(`.project-card`).data('uuid'));
    }
    
    //functions for editing todos
    static openChangeNameTextInput(e){
        let todoId=e.currentTarget.dataset.uuid;
        let projectId=e.currentTarget.dataset.projectUuid;
        let todoToEdit = $(".todo[data-uuid=" + todoId +"]");
        let title = todoToEdit.find('.todo-title').text();

        todoToEdit.toggleClass('hovered');
        $(".todo-title[data-uuid=" + todoId +"]")
            .replaceWith(`
                        <input class="edit-name-input todo-title" type="text" value="${title}" data-UUID=${todoId} data-project-uuid=${projectId}>
                        `);
        $('.edit-name-input').focus();
        $('.edit-name-input').on('focusout keypress',this.editTodo.bind(this));
    }

    static openPriorityInput(e){
        let todoId=e.currentTarget.dataset.uuid;
        let projectId=e.currentTarget.dataset.projectUuid;
        let priority = e.currentTarget.dataset.priority;

        $(".todo-priority-indicator[data-uuid=" + todoId +"]")
            .replaceWith(`
                        <select id="todo-priority-picker" class="todo-priority-picker" value=${priority} data-UUID=${todoId} data-project-uuid=${projectId}>
                            <option value='0'>Not set</option>
                            <option value='1'>Relevant</option>
                            <option value='2'>Important</option>
                            <option value='3'>Critical</option>
                        </select>
                        `);
        $('.todo-priority-picker').val(priority);
        $('.todo-priority-picker').focus();
        $('.todo-priority-picker').on('focusout',this.editTodo.bind(this));
    }

    static editTodo(e){
        
        let todoId=e.currentTarget.dataset.uuid;
        let projectId=e.currentTarget.dataset.projectUuid;
        let todoToEdit = $(".todo[data-uuid=" + todoId +"]");

        //get info about the changed todo from its elements - some fields require checking two types of elements depending on what was changed
        let title = todoToEdit.find('.todo-title').val() || todoToEdit.find('.todo-title').text();
        let isFinished = todoToEdit.find('.todo-checkbox').prop('checked');
        let dueDate = todoToEdit.find('.todo-edit-date').val();
        let priority = todoToEdit.find('.todo-priority-indicator').data('priority') || todoToEdit.find('.todo-priority-picker').val();

        if(e.type === 'keypress' && e.which!==13) return;
        if(title==='') {
            alert(`The name of the todo can't be empty!`);
            this.loadProject($(`.project-card`).data('uuid'));
            return;
        }

        StorageController.editToDo(projectId,todoId,isFinished,title,dueDate?dueDate:'not set',priority);
        this.loadProject($(`.project-card`).data('uuid'));
    }

    //functions for deleting todos 
    static clearCompletedTodos(e){
        let todosToClear = document.querySelectorAll(`input[type='checkbox']:checked`);
        todosToClear.forEach(todo=>{
            StorageController.deleteTodo(todo.dataset.projectUuid,todo.dataset.uuid);
        })
        this.loadProject($(`.project-card`).data('uuid'));
    }

    static deleteTodo(e){
        let projectId = e.currentTarget.dataset.projectUuid;
        let todoId = e.currentTarget.dataset.uuid;
        StorageController.deleteTodo(projectId,todoId);
        $(".todo[data-uuid=" + todoId +"]").remove();
    }

    //functions for opening bar ('hamburger') menu 
    static openBarMenu(){
        $('.hamburger-menu').replaceWith('<i class="hamburger-menu fas fa-times fa-5x"></i>');
        $('.projects-picker').toggleClass('visible');
        $('.projects-picker').toggleClass('hidden');
        $('.project-area').toggleClass('visible');
        $('.project-area').toggleClass('hidden');
        $('.hamburger-menu').on('click',this.closeBarMenu.bind(this));
    }

    static closeBarMenu(){
        $('.hamburger-menu').replaceWith('<i class="hamburger-menu fas fa-bars fa-5x"></i>');
        $('.projects-picker').toggleClass('visible');
        $('.projects-picker').toggleClass('hidden');
        $('.project-area').toggleClass('visible');
        $('.project-area').toggleClass('hidden');
        $('.hamburger-menu').on('click',this.openBarMenu.bind(this));
    }
}
