'use strict';

import $ from "jquery";
import BaseController from "../BaseController";
import DishesCollection from "../../model/pageMenu/DishesCollection";
import DishesView from "../../view/pageMenu/DishesView";

export default class DishesController extends BaseController {
    constructor($container) {
        super();
        this.$container = $container;

        this.config.onFilterDishes = (category) => this.filterDishes(category);
        this.config.onRenderAllDishes = () => this.view.renderList(this.collection.list);

        this.collection = new DishesCollection();
        this.view = new DishesView(this.config);

        this.dishesCollection = this.collection;
        this.$elDishes = this.view.$el;


        this.init().then(() => this.view.renderListCategories(this.collection.list));
    }


    filterDishes(category){
        this.collection.filterDishes(category);
        this.view.renderList(this.collection.filteredList);
    }
}