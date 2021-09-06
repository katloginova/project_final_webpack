'use strict';

import $ from "jquery";

export default class BaseController {
    constructor() {
        this.collection = null;
        this.view = null;

        this.config = {
            onSubmitData: (dish) => this.addItem(dish),
            onEditData: (item) => this.editItem(item),
            onDeleteData: (id) => this.deleteItem(id),
            onFillForm: (id) => this.fillForm(id),
        };
    }

    init() {
        return  this.collection.getCollection()
                    .then(() => this.view.renderList(this.collection.list));
    }


    addItem(item) {
        this.collection.addData(item)
            .then(() => this.view.renderList(this.collection.list));
    }

    editItem(item) {
        this.collection.editData(item)
            .then(() => this.view.renderList(this.collection.list));
    }

    deleteItem(id) {
        this.collection.deleteData(id);
        this.view.renderList(this.collection.list);
    }

    fillForm(id) {
        const item = this.collection.findItem(id);
        this.view.fillForm(item);
    }
}