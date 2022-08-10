let newTaskCount = 0
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

    

    $("#task_form").submit(function(event) {
        event.preventDefault();
        let taskInput = $("#task_name");
        let taskName = taskInput.val();
        taskInput.val("");
        addTask(taskName);
    });

    function addTask(taskName) {
    
        let taskList = $("#listas");

        let dynamicTaskID = `checkbox_${newTaskCount}`;

        taskList.prepend(`
        <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" id="${dynamicTaskID}">
            <label class="form-check-label" for="${dynamicTaskID}">${taskName}</label>  
        </li>`);
        newTaskCount++; 
    }

    $('#listas').on('click', '.trinti', function () {
        $(this).parent().parent().remove();
    });


    function getTasks() {
        let apiURL = 'http://localhost:3000/tasks'
        $.get(apiURL, function (data) {
            for (let i = 0; i < data.length; i++) {
                addTask(data[i].name)
            }
        })
    }

    function saveTask(){
        
    }
})