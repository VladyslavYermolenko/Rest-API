const List = require('../models/List')

class ListController {
    getID(arr, curID) {
        return List.getID(arr, curID);
    }
    getAllLists() {
        return List.getAllLists();
    }
    getList(listID) {
        return List.getList(listID);
    }
    createList(lists) {
        return List.createList(lists);
    }
    deleteList(listID) {
        return List.deleteList(listID);
    }
    putList(listID, lists) {
        return List.putList(listID, lists);
    }
    patchList(listID, lists) {
        return List.patchList(listID, lists);
    }
}

module.exports = new ListController();

// done