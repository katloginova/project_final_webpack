'use strict';

import $ from "jquery";
import BaseCollection from "../BaseCollection";
import { URL_DISHES } from "../../config";

export default class DishesCollection extends BaseCollection{
    constructor(){
        super();
        this._url = URL_DISHES;
        this.filteredList = [];
    }

    filterDishes(category){
        this.filteredList = this.list.filter((item) => item.category == category);
    }
}
