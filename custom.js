$(document).ready(function () {
    //kvieciam funkcija
    getTasks();
    let newTaskCount = 0;

    // $("#add_task").click(function () {
    //     let name = $('#listas').text = $('#task_name').val()
    //     $('#listas').prepend(`<li class="list-group-item d-flex justify-content-between">
    // <div>
    // <input class="form-check-input me-1" type="checkbox" value="" id="${dynamicTaskID}" >
    // <label class="form-check-label" for="${dynamicTaskID}">${name}</label>
    // </div>
    // <div>
    // <button  type="button" class="trinti btn-close" aria-label="Close"
    // </div>
    // </li>`)
    //     newTaskCount++;
    // });

    // inputo reiksme ir jo isvalymas
    $("#task_form").submit(function (event) {
        event.preventDefault();
        let taskInput = $("#task_name");
        let taskName = taskInput.val();
        //sukuriame task obejkta
        let task = {
            "name": taskName,
            "status": 'inprogress'
        };
        taskInput.val("");

        //pridedam i duombaze
        saveTask(task);



    });


    // pridejimas list item su norimu input
    function addTask(task) {
        let taskList = $("#listas");
        let dynamicTaskID = `checkbox_${newTaskCount}`;
        let taskInputAttributes = '';
        if (task.status === 'done') {
            taskInputAttributes = 'checked'
        }
        taskList.prepend(`<li data-task='${task.id}'class="list-group-item d-flex justify-content-between">
    <div>
    <input class= "form-check-input me-1 task-checkbox " ${taskInputAttributes} type="checkbox" value="" id="${dynamicTaskID}" >
    <label class="checkBox form-check-label " for="${dynamicTaskID}">${task.name}(#${task.id})</label>
    </div>
    <div>
    <button data-task='${task.id}' type="button" class="trinti btn-close" aria-label="Close"</button>
    </div>
    </li>`)
        newTaskCount++;

    }


    $('#listas').on('change', '.task-checkbox', function () {
        let status = this.checked
        let taskID = $(this).parent().parent().data('task')
        console.log(taskID)
        taskStatusUpdate(taskID, status)
    })

    function taskStatusUpdate(taskID, status) {
        let apiURL = 'http://localhost:3000/tasks/' + taskID;
        let taskStatusValue;
        if (status === true) {
            taskStatusValue = 'done'
        } else if (status === false) {
            taskStatusValue = 'inprogress'
        }
        $.ajax({
            url: apiURL,
            method: "PATCH",
            data: {
                status: taskStatusValue
            },
            success: (function () {

            })
        });
    }

    // x mygtykas istrina eilute
    $('#listas').on('click', '.trinti', function () {
        $(this).parent().parent().remove();
        let taskID = $(this).data('task')
        deleteTask(taskID)
    });


    function getTasks() {
        let apiURL = 'http://localhost:3000/tasks'
        $.get(apiURL, function (data) {
            for (let i = 0; i < data.length; i++) {
                addTask(data[i])
            }
        })
    }

    function saveTask(task) {
        let apiURL = 'http://localhost:3000/tasks'
        let data = task
        $.post(apiURL, data, function (data) {
            console.log('post uzklausos rezultatus')
            console.log(data);
            addTask(data)
            
        })
    }

    function deleteTask(taskID) {
        let apiURL = 'http://localhost:3000/tasks/' + taskID
        $.ajax({
            url: apiURL,
            method: "DELETE",
            data: {},
            error: function () {
                $.growl.error({
                    message: "The kitten is attacking!"
                });
            },
            success: (function () {
                $.growl({
                    title: "Deleted",
                    message: "Task was deleted!"
                });
            })
        });
    }

})