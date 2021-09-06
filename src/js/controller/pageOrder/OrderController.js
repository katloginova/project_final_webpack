'use strict';

import $ from "jquery";
import BaseController from "../BaseController";
import OrderCollection from "../../model/pageOrder/OrderCollection";
import OrderView from "../../view/pageOrder/OrderView";

export default class OrderController extends BaseController {
    constructor(config) {
        super();
        this.config = config;
        this.config.onCreateCheck = () => this.createCheck();
        this.config.onSetCount = (id, countDishes) => this.setCountDishes(id, countDishes);
        this.config.onDeleteDish = (id) => this.deleteDish(id);

        this.orderCollection = new OrderCollection();
        this.orderView = new OrderView(this.config);

        this.$elOrder = this.orderView.$el;
    }

    renderWaitersList(list) {
        this.orderView.renderWaitersList(list);
    }

    renderTablesList(list) {
        this.orderView.renderTablesList(list);
    }

    renderDishesList(list) {
        this.orderView.renderDishesList(list);
    }

    fillDataWaiter(waiter) {
        this.orderCollection.waiter = waiter;
        this.orderView.fillFormWaiter(this.orderCollection.waiter);
    }

    fillDataTable(table) {
        this.orderCollection.table = table;
        this.orderView.fillFormTable(this.orderCollection.table);
    }

    fillDataDish(dish, id) {
        this.orderCollection.addDish(dish, id);
        this.orderView.renderListOrderDishes(this.orderCollection.listDishes);
    }

    deleteDish(id){
        this.orderCollection.deleteDish(id);
        this.orderView.renderListOrderDishes(this.orderCollection.listDishes);
    }

    setCountDishes(id, countDishes) {
        this.orderCollection.setCountDishes(id, countDishes);
    }

    createCheck() {
        const check = this.orderCollection.createCheck();
        this.orderCollection.addData(check)
            .then(() => this.orderView.renderCheck(this.orderCollection.check))
            .then(() => this.orderCollection.listDishes = []);
    }
}