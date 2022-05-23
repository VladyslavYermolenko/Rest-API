CREATE TABLE listsTable (
    listId    SERIAL PRIMARY KEY, 
    listName  varchar
);

CREATE TABLE tasksTable (
    id        SERIAL PRIMARY KEY, 
    taskName  varchar not null, 
    done      boolean default false,
    datetime  date, 
    listId    int REFERENCES listsTable
);

INSERT INTO listsTable (listName) 
VALUES ('List 1'), ('List 2'), ('List 3');

INSERT INTO taskstable (taskName, done, listId) 
VALUES  ('Task 1', true, 2), 
        ('Task 2', true, 2),
        ('Task 3', true, 3),
        ('Task 4', false, 3),
        ('Task 5', false, 3),
        ('Task 6', true, 2);