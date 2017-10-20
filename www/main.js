$(document).ready(function () { 
  //Append a ToDoList container to the DOM
  $('body').append('<div id="listContainer"></div>');
  $('body').append('<div id="list"></div>');
  $('body').append('<input id="input"></input><button id="button">Submit</button>');

  $('#button').click(createToDo);
    
  //request ToDoList from database
  function getToDoList() {
    $.ajax({
      type: 'GET',
      url: 'todo/get',
      success: onSuccess,
      dataType: 'json'
    });
    
    //PARSE the AJAX response
    function onSuccess(data) {
      //Build the HTML for the messsage list
      $('#listContainer').empty();
      for (let i = 0; i < data.length; i += 1) {
        let html = '<input id="' + data[i]._id + '" value="' + data[i].todo + '"></input><button id="' + i + '">X</button><br>';
        $('#listContainer').append(html);
        $('#' + data[i]._id).keypress(function(e) {
          if (e.which === 13) {
            let id = data[i]._id;
           updateToDo(id);
          }
        });
        $('#' + i).click({ id: data[i]._id }, deleteToDo);

      }
    }
  }
  
  getToDoList();

  function createToDo() {
    let result = $('#input').val();
    let data = { todo: result };
    $('#input').val('');

    $.ajax({
      type: 'POST',
      url: 'todo/create',
      data: data,
      success: getToDoList,
      dataType: 'json',
    });
  }

  function updateToDo(id) {
    let result = $('#' + id).val();
    let data = { todo: result };

    $.ajax({
      type: 'POST',
      url: 'todo/update/' + id,
      data: data,
      success: getToDoList,
      dataType: 'json',
    });
  }

  
  function deleteToDo (data) {
    let id = data.data.id;
    $.ajax({
      type: 'DELETE',
      url: 'todo/delete/' + id,
      success: getToDoList,
      dataType: 'json'
    });
  }

});
