const db = require('../database')

class AnotherModels {
    async dashboard() {
        const countTasks = await knex.select(knex.raw(`count(*)::int`),)
                                    .from(`taskstable`)
                                    .where("done", false)
                                    .andWhereBetween("datetime", [knex.raw('CURRENT_DATE'), knex.raw('CURRENT_DATE')]);
        const tasks = await knex.select(`liststable.listid`, `liststable.listname`, 
                            knex.raw(`count(taskstable.done)::int AS unfulfilled_task_count`))
                            .from(`taskstable`)
                            .rightOuterJoin(`liststable`, function() {
                                this.on("taskstable.listid", "liststable.listid")
                                .andOn("taskstable.done", false).orOn("taskstable.done", "NULL")
                            }).groupByRaw(`liststable.listid`).orderByRaw(`liststable.listid`);
        return {
            count: countTasks.rows[0],
            tasks: tasks.rows
        }
    }
    async collection() {
        const task =  await knex.select(
            `taskstable.listid`, 
            `liststable.listname`, 
            `taskstable.id AS taskid`, 
            `taskstable.taskname`, 
            `taskstable.done`, 
            `taskstable.datetime`, 
        ).from(`liststable`)
        .innerJoin(`taskstable`, function() {
            this.on("taskstable.listid","=","liststable.listid")
            .andOnBetween("datetime", [knex.raw('CURRENT_DATE'), knex.raw('datetime')])
        }).groupByRaw(`liststable.listname, taskstable.id`);
        return task;
    }
}

module.exports = new AnotherModels();
