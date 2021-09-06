const http   = require('http');

const { getAllTodo, todoById, addTodo, deleteTodoId, updatedTodo} = require('./controller');
const todos = require('./data');
const getData = require('./utils');



const PORT = process.env.PORT || 3000;


const server = http.createServer( async (req, res) => {

    //@get all todos
    //@method GET

    if(req.url === "/api/todos" && req.method === "GET"){

        try{

            const todos = await getAllTodo();
    
            res.writeHead(200, {"Content-Type": "application/json"});
            
           
    
            res.end(JSON.stringify(todos));
        } catch ( err){

            res.writeHead( 404, {"Content-Type": "application/json "});
            res.end(JSON.stringify({ message: "route not found"}));
      
        }


        //@get todo by id
        //@method GET
    
    } else if(req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === "GET" ) {

        try{

            const id = req.url.split("/")[3];
    
            const todo = await todoById(id);
    
            res.writeHead(200, {"Content-type": "application/json"});
    
            res.end(JSON.stringify(todo));
        } catch(err){
            res.writeHead( 404, {"Content-Type": "application/json "});
            res.end(JSON.stringify({ message: "route not found"}));
      
        }

        //@add new todo
        //@method POST


    } else if(req.url === "/api/todo" && req.method ==="POST"){

        try{

            const tododata = await getData(req);
    
            const newTodo = await addTodo(tododata);
            todos.push(newTodo);
           
    
            res.writeHead(200, {"Content-type": "application/json"});
    
    
            res.end(JSON.stringify(newTodo));
        } catch (err){
            res.writeHead( 404, {"Content-Type": "application/json "});
            res.end(JSON.stringify({ message: "route not found"}));
      
        }

 
        //@delete todo by id
        // @method DELETE


    } else if(req.url.match(/\/api\/todo\/([0-9]+)/) && req.method ==="DELETE"){
        try{
            const id = req.url.split("/")[3];

            const todo = await deleteTodoId(id);

            res.writeHead(200, {"Content-type": "application/json"});
    
            res.end(JSON.stringify(todo));
        } catch(err){
            res.writeHead( 404, {"Content-Type": "application/json "});
            res.end(JSON.stringify({ message: "route not found"}));
      

        }


        // @update todo 
        // @method PUT


    } else if( req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === "PUT"){
        try{
            const id = req.url.split("/")[3];

            const updatedData = await getData(req);

            const todo = await updatedTodo(id , updatedData);

            res.writeHead(200, {"Content-type": "application/json"});
    
            res.end(JSON.stringify(todo));

        } catch(err){
            res.writeHead( 404, {"Content-Type": "application/json "});
            res.end(JSON.stringify({ message: "route not found"}));
        }
    }
    
    
    else {
        res.writeHead( 404, {"Content-Type": "application/json "});
        res.end(JSON.stringify({ message: "route not found"}));
    }

});

server.listen(PORT,()=>{
    console.log(`app is running at Port ${PORT}`);
});