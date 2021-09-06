'use strict';

import $ from "jquery";
import BaseCollection from "../BaseCollection";
import {URL_ORDERS} from "../../config";

export default class OrderCollection extends BaseCollection {
    constructor() {
        super();
        this._url = URL_ORDERS;
        this.waiter = {};
        this.table = {};
        this.orderedDish = {};
        this.dish = {};
        this.count = 1;

        this.listDishes = [];
    }

    addData(formData){
        return fetch(this._url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then((data) => {
            this.check = data;
            this.list.push(data);
        });
    }

    addDish(dish, id) {
        this.orderedDish = {
            dish: dish,
            count: this.count,
        };

        const index = this.listDishes.findIndex((item) => item.dish.id == id);

        if(index === -1){
            this.listDishes.push(this.orderedDish);
        }
    }

    deleteDish(id){
        this.listDishes = this.listDishes.filter((item) => item.dish.id != id);
    }

    setCountDishes(id, countDishes) {
        const dish = this.listDishes.find((item) => item.dish.id == id);

        dish.count = +countDishes;
    }

    createCheck() {
        return {
            waiter: this.waiter,
            table: this.table,
            order: this.listDishes,
        };
    }
}