'use strict';

import $ from "jquery";
const WAITER_BTN_CLASS = 'waiter-btn';
const TABLE_BTN_CLASS = 'table-btn';
const DISH_BTN_CLASS = 'dish-btn';
const ITEM_WAITER_CLASS = 'item-waiter';
const ITEM_TABLE_CLASS = 'item-table';
const ITEM_DISH_CLASS = 'item-dish';

const LIST_ORDER_ITEM_SELECTOR = '.list-order__item';
const LIST_DISHES_ITEM_SELECTOR = '.list-dishes__item';
const DISH_COUNT_SELECTOR = '.dish-count';
const DELETE_SELECTOR = '.delete-dish';


export default class OrderView {
    constructor(config) {
        this.config = config;
        this.$el = null;

        this.$elButtons = null;
        this.$elBtnWaiter = null;
        this.$elBtnTable = null;
        this.$elBtnDish = null;
        this.$elOrderContainer = null;
        this.$elListCollection = null;
        this.$elForm = null;
        this.$elFormWaiter = null;
        this.$elWaiterTitle = null;
        this.$elWaiterName = null;
        this.$elFormTable = null;
        this.$elTableTitle = null;
        this.$elTableNumber = null;
        this.$elOrderDishes = null;
        this.$elDishesTitle = null;
        this.$elListDishes = null;
        this.$elSendBtns = null;
        this.$elBtnCreate = null;
        this.$elCheckReceipt = null;
        this.$elReceiptWaiter = null;
        this.$elReceiptTable = null;
        this.$elReceiptNumber = null;
        this.$elReceiptOrder = null;

        this.initView();
    }

    initView() {
        this.$el = $(`<div class="order"></div>`);

        this.$elButtons = $(`<div class="order-buttons"></div>`);
        this.$elBtnWaiter = $(`<button class="waiter-btn btn">выбрать официанта</button>`);
        this.$elBtnTable = $(`<button class="table-btn btn">выбрать столик</button>`);
        this.$elBtnDish = $(`<button class="dish-btn btn">выбрать блюда</button>`);
        this.$elOrderContainer = $(`<div class="order-container"></div>`);
        this.$elListCollection = $(`<div class="list-order"></div>`);
        this.$elForm = $(`<div class="order-form"></div>`);
        this.$elFormWaiter = $(`<div class="order-waiter"></div>`);
        this.$elWaiterTitle = $(`<div class="waiter-title">Официант:</div>`);
        this.$elWaiterName = $(`<div class="waiter-name"></div>`);
        this.$elFormTable = $(`<div class="order-table"></div>`);
        this.$elTableTitle = $(`<div class="table-title">Столик:</div>`);
        this.$elTableNumber = $(`<div class="table-number"></div>`);
        this.$elOrderDishes = $(`<div class="order-dishes"></div>`);
        this.$elDishesTitle = $(`<div class="dishes-title">Заказ блюд</div>`);
        this.$elListDishes = $(`<div class="list-dishes"></div>`);
        this.$elSendBtns = $(`<div class="order-send"></div> `);
        this.$elBtnCreate = $(`<button class="create-btn btn">создать заказ</button>`);
        this.$elCheckReceipt = $(`<div class="check-receipt"></div>`);
        this.$elReceiptWaiter = $(`<div class="receipt-waiter"></div>`);
        this.$elReceiptTable = $(`<div class="receipt-table"></div>`);
        this.$elReceiptNumber = $(`<div class="receipt-number"></div>`);
        this.$elReceiptOrder = $(`<div class="receipt-order"></div>`);


        this.addElements();


        this.$elButtons.on('click', this.onBtnSelectClick.bind(this));
        this.$elListCollection.on('click', this.onItemListClick.bind(this));
        this.$elListDishes.on('focusout', DISH_COUNT_SELECTOR, this.onCountFocusout.bind(this));
        this.$elBtnCreate.on('click', this.onCreateBtnClick.bind(this));
        this.$elListDishes.on('click', DELETE_SELECTOR, this.onDeleteClick.bind(this));

    }

    addElements() {
        this.$el
            .append(this.$elButtons
                .append(this.$elBtnWaiter)
                .append(this.$elBtnTable)
                .append(this.$elBtnDish))
            .append(this.$elOrderContainer
                .append(this.$elListCollection)
                .append(this.$elForm
                    .append(this.$elFormWaiter
                        .append(this.$elWaiterTitle)
                        .append(this.$elWaiterName)
                        .append(this.$elWaiterSurname)
                        .append(this.$elHiddenWaiter))
                    .append(this.$elFormTable
                        .append(this.$elTableTitle)
                        .append(this.$elTableNumber)
                        .append(this.$elHiddenTable))
                    .append(this.$elOrderDishes
                        .append(this.$elDishesTitle)
                        .append(this.$elListDishes))
                    .append(this.$elSendBtns
                        .append(this.$elBtnCreate)
                        .append(this.$elBtnCount))
                    .append(this.$elCheckReceipt
                        .append(this.$elReceiptWaiter)
                        .append(this.$elReceiptTable)
                        .append(this.$elReceiptNumber)
                        .append(this.$elReceiptOrder))));
    }


    onBtnSelectClick(e) {
        switch (true) {
            case ($(e.target).hasClass(WAITER_BTN_CLASS)):
                this.config.onRenderWaitersList();
                break;

            case ($(e.target).hasClass(TABLE_BTN_CLASS)):
                this.config.onRenderTablesList();
                break;

            case ($(e.target).hasClass(DISH_BTN_CLASS)):
                this.config.onRenderDishesList();
                break;
        }
    }

    onItemListClick(e) {
        const id = this.getIdOrderItem($(e.target));

        switch (true) {
            case ($(e.target).hasClass(ITEM_WAITER_CLASS)):
                this.config.onSelectWaiter(id);
                break;

            case ($(e.target).hasClass(ITEM_TABLE_CLASS)):
                this.config.onSelectTable(id);
                break;

            case ($(e.target).closest(LIST_ORDER_ITEM_SELECTOR).hasClass(ITEM_DISH_CLASS)):
                this.config.onSelectDish(id);
                break;
        }
    }

    onCountFocusout(e) {
        const id = this.getIdDishesItem($(e.target));
        const countDishes = $(e.target).val();

        this.config.onSetCount(id, countDishes);
    }

    onCreateBtnClick() {

        if (this.isDataInvalid()) {
            return;
        }

        this.config.onCreateCheck();
        this.resetData();
    }

    onDeleteClick(e) {
        const id = this.getIdDishesItem($(e.target));

        this.config.onDeleteDish(id);
    }

    isDataInvalid() {
        return this.$elListDishes.html() === '' ||
            this.$elWaiterName.html() === '' ||
            this.$elTableNumber.html() === '';
    }

    resetData() {
        this.$elListDishes.html('');
        this.$elWaiterName.html('');
        this.$elTableNumber.html('');
    }

    getIdOrderItem($el) {
        return $el.closest(LIST_ORDER_ITEM_SELECTOR).data('elemId');
    }

    getIdDishesItem($el) {
        return $el.closest(LIST_DISHES_ITEM_SELECTOR).data('dishId');
    }

    renderWaitersList(list) {
        this.$elListCollection.html(list.map(this.getWaiterHtml).join('\n'));
    }

    getWaiterHtml({ id, name, surname }) {
        return `<div class="list-order__item item-waiter" data-elem-id="${id}">${name} ${surname}</div>`;
    }

    renderTablesList(list) {
        this.$elListCollection.html(list.map(this.getTableHtml).join('\n'));
    }

    getTableHtml({ id, numberTable }) {
        return `<div class="list-order__item item-table" data-elem-id="${id}">столик: ${numberTable}</div>`;
    }

    renderDishesList(list) {
        this.$elListCollection.html(list.map(this.getDishHtml).join('\n'));
    }

    getDishHtml({ id, title, category, price }) {
        return `<div class="list-order__item item-dish" data-elem-id="${id}">
                    <div class="item-title">${title}</div>
                    <div class="item-category">${category}</div>
                    <div class="item-price">${price} <span>грн</span></div>
                </div>`;
    }

    fillFormWaiter({ name, surname }) {
        this.$elWaiterName.html(`${name} ${surname}`);
    }

    fillFormTable({ numberTable  }) {
        this.$elTableNumber.html(`${numberTable}`);
    }

    renderListOrderDishes(list) {
        this.$elListDishes.html(list.map(this.getOrderedDishHtml).join('\n'));
    }

    getOrderedDishHtml({ dish: { id, title, category, price } }) {
        return `<div class="list-dishes__item" data-dish-id="${id}">
                    <span class="delete-dish">x</span>

                    <div class="item-name">${title}</div>
                    <div class="item-category">${category}</div>
                    <div class="item-price">${price} <span>грн</span></div>

                    <input type="text" class="dish-count" value="1">
                </div>`;
    }

    renderCheck({ id, waiter: { name, surname }, table: { numberTable }, order }) {
        const sum = order.map((item) => item.dish.price * item.count).reduce((acc, item) => acc + item);

        this.$elReceiptWaiter.html(`Официант: ${name} ${surname}`);
        this.$elReceiptTable.html(`Столик: ${numberTable}`);
        this.$elReceiptNumber.html(`Номер заказа: ${id}`);

        this.$elReceiptOrder.html(order.map(this.getReceiptOrderHtml).join('\n'))
            .append($(`<div class="receipt-sum">Общая сумма: ${sum} <span>грн</span></div>`));
    }

    getReceiptOrderHtml({ dish: { title, price }, count }) {
        return `<div class="order-dish">
                    <div class="order-dish__title">${title}</div>
                    <div class="order-dish__price">${price} грн</div>
                    <div class="order-dish__count">${count} шт.</div>
                </div>`;
    }
}