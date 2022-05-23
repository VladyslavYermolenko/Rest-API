const db = require('../database')

class AnotherModels {
    async dashboard() {
        const countTasks = await db.query(
            `SELECT count(*) 
            FROM tasksTable 
            WHERE done = false and datetime 
            BETWEEN (CURRENT_DATE) and (CURRENT_DATE);`
        );
        const task = await db.query(
            `SELECT listsTable.listId, listsTable.listName, count(tasksTable.done) as unfulfilled_task_count
            FROM tasksTable RIGHT JOIN listsTable
            ON tasksTable.listId = listsTable.listId and tasksTable.done = false OR tasksTable.done = null
            GROUP BY listsTable.listId
            ORDER BY listsTable.listId;`
        );
    }
}

module.exports = new AnotherModels();
