CREATE TABLE listsTable (
    [id]        SERIAL PRIMARY KEY, 
    [taskName]  varchar(64),
    [done]      boolean default false, 
    [listId]    int not null
);

CREATE TABLE tasksTable (
    [id]        SERIAL PRIMARY KEY, 
    [taskName]  varchar not null, 
    [done]      boolean, 
    [datetime]  date, 
    [listId]    int REFERENCES listsTable
);