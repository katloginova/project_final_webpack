'use strict';

import $ from "jquery";
import { ACTIVE_CLASS } from "../../config";

const SEND_DISH_SELECTOR = '.send-dish';
const DISH_ITEM_SELECTOR = '.list-dishes__item';
const HIDDEN_CLASS = 'hidden';
const FILTER_ITEM_CLASS = 'list-filter__item';
const FILTER_BTN_CLASS = 'filter-btn';
const DELETE_DISH_SELECTOR = '.delete-dish';



export default class DishesView {
    constructor(config) {
        this.config = config;
        this.$el = null;

        this.$elTitle = null;
        this.$elForm = null;
        this.$elCategoryDish = null;
        this.$elCategoryLabel = null;
        this.$elCategoryInput = null;
        this.$elTitleDish = null;
        this.$elTitleLabel = null;
        this.$elTitleInput = null;
        this.$elPriceDish = null;
        this.$elPriceLabel = null;
        this.$elPriceInput = null;
        this.$elHiddenInput = null;
        this.$elSendBtn = null;
        this.$elFilter = null;
        this.$elListFilter = null;
        this.$elFilterBtn = null;
        this.$elList = null;


        this.initView();
    }

    initView() {
        this.$el = $(`<div class="dishes"></div>`);

        this.$elTitle = $(`<div class="title">Меню</div>`);
        this.$elForm = $(`<form class="form-dish"></form>`);
        this.$elCategoryDish = $(`<div class="dish-category"></div>`);
        this.$elCategoryLabel = $(`<label for="inputCategoryDish">Категория:</label>`);
        this.$elCategoryInput = $(`<input id="inputCategoryDish" type="text" class="form-input">`);
        this.$elTitleDish = $(`<div class="dish-title"></div>`);
        this.$elTitleLabel = $(`<label for="inputNameDish">Наименование:</label>`);
        this.$elTitleInput = $(`<input id="inputNameDish" type="text" class="form-input">`);
        this.$elPriceDish = $(`<div class="dish-price"></div>`);
        this.$elPriceLabel = $(`<label for="inputPriceDish">Цена:</label>`);
        this.$elPriceInput = $(`<input id="inputPriceDish" type="text" class="form-input">`);
        this.$elHiddenInput = $(`<input type="hidden" value="id">`);
        this.$elSendBtn = $(`<input type="submit" value="отправить" class="send-dish btn"></input>`);
        this.$elFilter = $(`<div class="filter"></div>`);
        this.$elListFilter = $(`<div class="list-filter"></div>`);
        this.$elFilterBtn = $(`<div class="filter-btn btn hidden">отключить фильтрацию</div>`);
        this.$elList = $(`<div class="list-dishes"></div>`);


        this.appendElements();

        this.$elForm.on('click', SEND_DISH_SELECTOR, this.onDishSubmit.bind(this));
        this.$elList.on('click', DELETE_DISH_SELECTOR, this.onDeleteDishClick.bind(this));
        this.$elList.on('click', DISH_ITEM_SELECTOR, this.onDishClick.bind(this));
        this.$elFilter.on('click', this.onFilterDishesClick.bind(this));
    }

    appendElements() {
        this.$el
            .append(this.$elTitle)
            .append(this.$elForm
                .append(this.$elCategoryDish
                    .append(this.$elCategoryLabel)
                    .append(this.$elCategoryInput))
                .append(this.$elTitleDish
                    .append(this.$elTitleLabel)
                    .append(this.$elTitleInput))
                .append(this.$elPriceDish
                    .append(this.$elPriceLabel)
                    .append(this.$elPriceInput))
                .append(this.$elHiddenInput)
                .append(this.$elSendBtn))
            .append(this.$elFilter
                .append(this.$elListFilter)
                .append(this.$elFilterBtn))
            .append(this.$elList);
    }


    onDishSubmit(e) {
        e.preventDefault();

        const dish = this.getFormData();

        if (this.isInputsInvalid()) {
            return;
        }

        if (!dish.id) {
            this.config.onSubmitData(dish);
        } else {

            this.config.onEditData(dish);
        }

        this.resetForm();
    }

    onDeleteDishClick(e) {
        const id = this.getIdElem($(e.target));
        this.config.onDeleteData(id);

        e.stopPropagation();
    }

    onDishClick(e) {
        const id = this.getIdElem($(e.target));
        const $elDish = $(e.target.closest(DISH_ITEM_SELECTOR));

        this.toggleClass($elDish, ACTIVE_CLASS);
        this.config.onFillForm(id);
    }

    onFilterDishesClick(e) {
        switch (true) {
            case ($(e.target).hasClass(FILTER_ITEM_CLASS)):
                const category = $(e.target).html();

                this.config.onFilterDishes(category);
                this.$elFilterBtn.removeClass(HIDDEN_CLASS);
                break;

            case ($(e.target).hasClass(FILTER_BTN_CLASS)):

                this.config.onRenderAllDishes();
                this.$elFilterBtn.addClass(HIDDEN_CLASS);
                break;
        }
    }

    getFormData() {
        return {
            id: this.$elHiddenInput.val(),
            category: this.$elCategoryInput.val(),
            title: this.$elTitleInput.val(),
            price: this.$elPriceInput.val(),
        };
    }

    isInputsInvalid() {
        return this.$elCategoryInput.val() === '' ||
            this.$elTitleInput.val() === '' ||
            this.$elPriceInput.val() === '';
    }

    resetForm() {
        this.$elHiddenInput.val('');
        this.$elCategoryInput.val('');
        this.$elTitleInput.val('');
        this.$elPriceInput.val('');
    }

    getIdElem($el) {
        return $el.closest(DISH_ITEM_SELECTOR).data('dishId');
    }

    toggleClass($el, className) {
        if (!($el).hasClass(className)) {
            $el.siblings().removeClass(className);
            $el.addClass(className);
        }
    }

    renderList(list) {
        this.$elList.html(list.map(this.getDishHtml).join('\n'));
    }

    renderListCategories(list) {
        let listCategories = list.map((item) => item.category);

        listCategories = [...new Set(listCategories)];
        this.$elListFilter.html(listCategories.map(this.getCategoryhHtml).join(`\n`));
    }

    getDishHtml({ id, title, category, price }) {
        return `<div class="list-dishes__item" data-dish-id="${id}"><span class="delete-dish">x</span>
                    <div class="item-name">${title}</div>
                    <div class="item-category">${category}</div>
                    <div class="item-price">${price} <span>грн</span></div>
                </div>`;
    }

    getCategoryhHtml(category) {
        return `<div class="list-filter__item">${category}</div>`;
    }

    fillForm(dish) {
        this.$elHiddenInput.val(dish.id);
        this.$elCategoryInput.val(dish.category);
        this.$elTitleInput.val(dish.title);
        this.$elPriceInput.val(dish.price);
    }
}