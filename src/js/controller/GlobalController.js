'use strict';

import $ from "jquery";
import PersonnelController from "./pagePersonnel/PersonnelController";
import DishesController from "./pageMenu/DishesController";
import OrderController from "./pageOrder/OrderController";

const PERSONNEL_BTN_CLASS = 'personnel-btn';
const MENU_BTN_CLASS = 'menu-btn';
const ORDER_BTN_CLASS = 'order-btn';


export default class GlobalController {
    constructor($body) {
        this.$body = $body;
        this.listWaiters = [];
        this.$el = null;

        this.personnelController = new PersonnelController();
        this.dishesController = new DishesController();
        this.orderController = new OrderController({
            onRenderWaitersList: () => this.renderWaitersList(),
            onRenderTablesList: () => this.renderTablesList(),
            onRenderDishesList: () => this.renderDishesList(),
            onSelectWaiter: (id) => this.selectWaiter(id),
            onSelectTable: (id) => this.selectTable(id),
            onSelectDish: (id) => this.selectDish(id),
        });

        
        this.init();

        this.$body
            .append(this.$el)
            .append(this.$container);
    }

    init() {
        this.$el = $(`<<nav class="navigation"></nav>`);
        this.$elNav = $(`<div class="navigation__menu menu-nav"></div>`);
        this.$elPagePersonnel = $(`<div class="menu-nav__item personnel-btn">Персонал</div>`);
        this.$elPageMenu = $(`<div class="menu-nav__item menu-btn">Меню</div>`);
        this.$elPageOrder = $(`<div class="menu-nav__item order-btn">Заказ</div>`);
        this.$container = $(`<div class="container"></div>`);


        this.$el
            .append(this.$elNav
                .append(this.$elPagePersonnel)
                .append(this.$elPageMenu)
                .append(this.$elPageOrder));



        this.$container
            .append(this.personnelController.$elWaiters)
            .append(this.personnelController.$elTables);

        this.$elNav.on('click', this.onTogglePagesClick.bind(this));
    }

    onTogglePagesClick(e) {
        switch (true) {
            case ($(e.target).hasClass(PERSONNEL_BTN_CLASS)):
                this.$container.html('');

                this.$container
                    .append(this.personnelController.$elWaiters)
                    .append(this.personnelController.$elTables);
                break;

            case ($(e.target).hasClass(MENU_BTN_CLASS)):
                this.$container.html('');

                this.$container
                    .append(this.dishesController.$elDishes);
                break;

            case ($(e.target).hasClass(ORDER_BTN_CLASS)):
                this.$container.html('');

                this.$container
                    .append(this.orderController.$elOrder);

                break;
        }
    }

    renderWaitersList() {
        this.personnelController.waitersCollection.getCollection()
            .then(() => this.orderController.renderWaitersList(this.personnelController.waitersCollection.list));
    }

    renderTablesList() {
        this.personnelController.tablesCollection.getCollection()
            .then(() => this.orderController.renderTablesList(this.personnelController.tablesCollection.list));
    }

    renderDishesList() {
        this.dishesController.dishesCollection.getCollection()
            .then(() => this.orderController.renderDishesList(this.dishesController.dishesCollection.list));
    }

    selectWaiter(id) {
        const waiter = this.personnelController.waitersCollection.findItem(id);
        this.orderController.fillDataWaiter(waiter);
    }

    selectTable(id) {
        const table = this.personnelController.tablesCollection.findItem(id);
        this.orderController.fillDataTable(table);
    }

    selectDish(id) {
        const dish = this.dishesController.dishesCollection.findItem(id);
        this.orderController.fillDataDish(dish, id);
    }
}