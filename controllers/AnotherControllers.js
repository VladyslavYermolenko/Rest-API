const AnotherModels = require('../models/AnotherModels')

class AnotherControllers {
    async getGashboard(_, res) {
        const task = await AnotherModels.dashboard();
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async getCollectionToday(_, res) {
        const task = await AnotherModels.collection();
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
}

module.exports = new AnotherControllers();