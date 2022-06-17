CREATE TABLE listsTable (
    listId    SERIAL PRIMARY KEY, 
    listName  varchar
);

CREATE TABLE tasksTable (
    id              SERIAL PRIMARY KEY, 
    taskName        varchar not null, 
    taskDescription varchar not null, 
    done            boolean default false,
    duedate         date default CURRENT_DATE, 
    listId          int REFERENCES listsTable
);

INSERT INTO listsTable (listName) 
VALUES ('List 1'), ('List 2'), ('List 3');

INSERT INTO taskstable (taskName, taskDescription, done, listId) 
VALUES  ('Task 1', 'Description', true, 2), 
        ('Task 2', 'Description', true, 2),
        ('Task 3', 'Description', true, 3),
        ('Task 4', 'Description', false, 3),
        ('Task 5', 'Description', false, 3),
        ('Task 6', 'Description', true, 2);
