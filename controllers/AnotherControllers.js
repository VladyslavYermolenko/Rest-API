const anotherModels = require('../models/AnotherModels')

class AnotherControllers {Another
    async dashboard(_, res) {
        const task = await anotherModels.dashboard();
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
    async collection(_, res) {
        const task = await anotherModels.collection();
        if (task) {
            res.status(200).json(task);
        }
        else {
            res.status(404).send('Not Found!');
        }
    }
}

module.exports = new AnotherControllers();