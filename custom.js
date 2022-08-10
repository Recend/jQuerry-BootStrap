



let newTaskCount = 0
$(document).ready(function(){

    let dynamicTaskID = `checkbox_${newTaskCount}`

$("#add_task").click(function () {
    let name = $('#listas').text = $('#task_name').val()
    $('#listas').prepend(`<li class="list-group-item d-flex justify-content-between">
    <div>
    <input class="form-check-input me-1" type="checkbox" value="" id="${dynamicTaskID}" >
    <label class="form-check-label" for="${dynamicTaskID}">${name}</label>
    </div>
    <div>
    <button  type="button" class="trinti btn-close" aria-label="Close"
    </div>
    </li>`)
    newTaskCount++;
});

$('#listas').on('click', '.trinti', function () {
    $(this).parent().parent().remove();
});

    $('#task_form').submit(function(event){
        event.preventDefault();
        let taskInput = $('#task_name');
        let taskName = taskInput.val();
        taskInput.val('')
    })

})