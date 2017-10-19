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
      console.log(data);
      $('#listContainer').empty();
      for (let i = 0; i < data.length; i += 1) {
        console.log('in here');
        let html = '<input id="' + data[i]._id + '" value="' + data[i].todo + '"></input><button id="' + i + '">X</button><br>';
        $('#listContainer').append(html);
        $('#' + i).click({ id: data[i]._id }, deleteToDo);
      }
    }
  }
  
  getToDoList();


  function createToDo() {
    console.log('create called');
    let result = $('#input').val();
    let data = { todo: result };
    console.log(data);

    $.ajax({
      type: 'POST',
      url: 'todo/create',
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
