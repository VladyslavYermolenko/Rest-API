const app = require('./app')

const port = 3000;
app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server listens http://localhost:${port}`);
});

//////////////////////////////////////////////////////////////////////
//                     Test commands (lists)                        //
//////////////////////////////////////////////////////////////////////
// GET:     http :3000/lists                                        //
// or:      http :3000/lists/1/tasks                                //
//                                                                  //
// POST:    http POST :3000/lists listName="New List"               //
//                                                                  //
// DELETE:  http DELETE :3000/lists listId=1                        //
//                                                                  //
// PUT:     http PUT :3000/lists?listId=1 listName="Put List"       //
//                                                                  //
// PATCH: http PATCH :3000/lists?listId=1 listName="Patch List"     //
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
//                     Test commands (tasks)                        //
//////////////////////////////////////////////////////////////////////
// GET:     http :3000/tasks                                        //
// or:      http :3000/tasks?listId=1                               //
//                                                                  //
// POST:    http POST :3000/tasks/1 taskName="New Task"             //
//                                                                  //
// DELETE:  http DELETE :3000/tasks taskId=1                        //
//                                                                  //
// PUT:     http PUT :3000/tasks?taskId=1 done=true                 //
// or       http PUT :3000/tasks?taskId=1 taskName="Put Task"       //
//                                                                  //
// PATCH: http PATCH :3000/tasks?taskId=1 done=true                 //
// or:    http PATCH :3000/tasks?taskId=1 taskName="Patch Task"     //
//////////////////////////////////////////////////////////////////////