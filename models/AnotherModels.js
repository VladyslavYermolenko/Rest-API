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
            ``
        );
    }
}

module.exports = new AnotherModels();