let newNote = document.querySelector('.newNote'),
    addButton = document.querySelector('.add'),
    todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}

addButton.addEventListener('click', function(){
    let newTodo = {
        todo: newNote.value,
        checked: false,
        important: false
    }

    if(newNote.value.indexOf('<') > -1 || newNote.value.indexOf('>') > -1){
        alert('Запись не должна содержать символы < и >');
    }else{
        todoList.push(newTodo);
    }
    
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
});

function displayMessages(){
    let displayMessage = '';
    todoList.forEach(function(item, i){
        displayMessage += `
        <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class = ${item.important ? 'important' : ''}>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
    })
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for=' + idInput + ']');
    let valueLabel = forLabel.innerHTML;   

    todoList.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
    console.log('valueLabel: ', valueLabel);
})


todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todoList.forEach(function(item){
        if(item.todo === event.target.innerHTML){
            item.important = !item.important;
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})