const db = require('../database')

class AnotherModels {
    async dashboard() {
        const countTasks = await db.query(
            `SELECT CAST(count(*) as int)
            FROM tasksTable 
            WHERE done = false and duedate 
            BETWEEN (CURRENT_DATE) and (CURRENT_DATE);`
        );
        const tasks = await db.query(
            `SELECT listsTable.listId, 
                    listsTable.listName, 
                    CAST(count(tasksTable.done) as int) as unfulfilled_task_count
            FROM tasksTable RIGHT JOIN listsTable
            ON tasksTable.listId = listsTable.listId AND 
            tasksTable.done = false OR tasksTable.done = null
            GROUP BY listsTable.listId
            ORDER BY listsTable.listId;`
        );
        return {
            count: countTasks.rows[0],
            tasks: tasks.rows
        }
    }
    async collection() {
        const task =  await db.query(
            `SELECT tasksTable.listId,
                    tasksTable.id as taskId,
                    tasksTable.taskName, 
                    tasksTable.taskDescription,
                    tasksTable.done,
                    tasksTable.duedate
            FROM listsTable INNER JOIN tasksTable
            ON tasksTable.listId = listsTable.listId AND 
            duedate BETWEEN (CURRENT_DATE) AND (duedate)
            GROUP BY listsTable.listName, tasksTable.id;`
        );
        return task.rows;
    }
}

module.exports = new AnotherModels();
