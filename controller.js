const todos = require('./data');
const data = require('./data');




const controller = {};


controller.getAllTodo = async () => {
    return new Promise((res) => res(data));
}

controller.todoById = async (id) => {
    return new Promise((res, rej) => {
        const todo = data.find((todo) => todo.id === parseInt(id));

        if (todo) {
            res(todo);
        } else {
            rej(`todo with ${id} is not found`);
        }
    })
}



controller.addTodo = async (newTodo) => {
    return new Promise((res) => {
        const [lstItem] = data.slice(-1);
        const id = lstItem.id + 1;
        
        let todo = new Array();
        todo = 
        {
            id: id,
            ...newTodo
    };
    todos.push(todo);
    
    
        res(todo);
    })

}


controller.deleteTodoId = async (id) => {
    return new Promise((res, rej) => {
        const todo = todos.find((todo) => todo.id === parseInt (id));
        const index =  todos.indexOf(todo);
         if(index != -1){
             res(todo);
             todos.splice(index , 1);
             console.log(todos);
         } else{
             rej(`todo with ${id} is not found`)
         }
        
    })
}

controller.updatedTodo = async (id, updatedData) => {
    return new Promise((res, rej) => {
        const todo = todos.find((todo) => todo.id === parseInt (id));
        const {completed} = updatedData;
        console.log(completed);

        const updatedTodo = {
            ...todo,
            completed:updatedData.completed
        };



         if(todo){
             res(updatedTodo);
             
             console.log(updatedTodo);
         } else{
             rej(`todo with ${id} is not found`)
         }
        
    })
}


module.exports = controller;