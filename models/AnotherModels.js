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
            `SELECT listsTable.listId, listsTable.listName, count(tasksTable.done) 
            FROM tasksTable RIGHT JOIN listsTable 
            ON tasksTable.listId = listsTable.listId
            GROUP BY listsTable.listId
            HAVING tasksTable.done = false OR tasksTable.done = null;`
        );
    }
}

module.exports = new AnotherModels();