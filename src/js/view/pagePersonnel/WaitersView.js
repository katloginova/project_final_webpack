'use strict';

import $ from "jquery";
import { ACTIVE_CLASS, FILTER_CLASS } from "../../config";

const SEND_WAITER_SELECTOR = '.send-waiter';
const DELETE_WAITER_SELECTOR = '.delete-waiter';
const WAITER_ITEM_SELECTOR = '.list-waiters__item';
const FILTER_WAITER_SELECTOR = 'filter-waiter';


export default class WaitersView {
    constructor(config) {
        this.config = config;
        this.$el = null;
        this.$elTitle = null;
        this.$elTitle = null;
        this.$elForm = null;
        this.$elNameWaiter = null;
        this.$elNameLabel = null;
        this.$elNameInput = null;
        this.$elSurnameWaiter = null;
        this.$elSurnameLabel = null;
        this.$elSurnameInput = null;
        this.$elHiddenInput = null;
        this.$elSendBtn = null;
        this.$elBtnFilter = null;
        this.$elList = null;


        this.initView();
    }

    initView() {
        this.$el = $(`<div class="waiters"></div>`);
        this.$elTitle = $(`<div class="title">Список официантов</div>`);
        this.$elForm = $(`<form class="form-waiter"></form>`);
        this.$elNameWaiter = $(`<div class="waiter-name form-input"></div>`);
        this.$elNameLabel = $(`<label for="inputWaiterName">Имя:</label>`);
        this.$elNameInput = $(`<input id="inputWaiterName" type="text" class="input-item">`);
        this.$elSurnameWaiter = $(`<div class="waiter-surname form-input"></div>`);
        this.$elSurnameLabel = $(`<label for="inputWaiterSurname">Фамилия:</label>`);
        this.$elSurnameInput = $(`<input id="inputWaiterSurname" type="text" class="input-item">`);
        this.$elHiddenInput = $(`<input type="hidden" value="id">`);
        this.$elSendBtn = $(`<input type="submit" value="отправить" class="send-waiter btn">`);
        this.$elBtnFilter = $(`<button class="filter-btn btn">включить филтрацию</button>`);
        this.$elList = $(`<div class="list-waiters"></div>`);


        this.addElements();

        this.$elForm.on('click', SEND_WAITER_SELECTOR, this.onWaiterSubmit.bind(this));
        this.$elList.on('click', DELETE_WAITER_SELECTOR, this.onDeleteWaiterClick.bind(this));
        this.$elList.on('click', WAITER_ITEM_SELECTOR, this.onWaiterClick.bind(this));
        this.$elBtnFilter.on('click', this.onWaitersFilterClick.bind(this));
    }


    addElements() {
        this.$el
            .append(this.$elTitle)
            .append(this.$elForm
                .append(this.$elNameWaiter
                    .append(this.$elNameLabel)
                    .append(this.$elNameInput))
                .append(this.$elSurnameWaiter
                    .append(this.$elSurnameLabel)
                    .append(this.$elSurnameInput))
                .append(this.$elHiddenInput)
                .append(this.$elSendBtn)
                .append(this.$elBtnFilter))
            .append(this.$elList);
    }

    onWaiterSubmit(e) {
        e.preventDefault();

        const waiter = this.getFormData();

        if (this.isInputsInvalid()) {
            return;
        }

        if (!waiter.id) {
            this.config.onSubmitData(waiter);
        } else {
            this.config.onEditData(waiter);
        }

        this.resetForm();

    }

    onDeleteWaiterClick(e) {
        const id = this.getIdElem($(e.target));
        this.config.onDeleteData(id);

        e.stopPropagation();
    }

    onWaiterClick(e) {
        const id = this.getIdElem($(e.target));
        const $elWaiter = $(e.target).closest(WAITER_ITEM_SELECTOR);

        this.toggleClass($elWaiter, ACTIVE_CLASS);
        this.config.onFillForm(id);
    }

    onWaitersFilterClick(e) {
        e.preventDefault();

        if ($(e.target).hasClass(FILTER_CLASS)) {
            this.config.onResetWaitersFilter();

            $(e.target).removeClass(FILTER_CLASS);
            this.$elBtnFilter.html('включить филтрацию');

        } else {
            this.config.onWaitersFilter();

            $(e.target).addClass(FILTER_CLASS);
            this.$elBtnFilter.html('отключить филтрацию');
        }
    }

    getFormData() {
        return {
            name: this.$elNameInput.val(),
            surname: this.$elSurnameInput.val(),
            id: this.$elHiddenInput.val(),
        };
    }

    isInputsInvalid() {
        return this.$elNameInput.val() === '' ||
            this.$elSurnameInput.val() === '';
    }

    resetForm() {
        this.$elNameInput.val('');
        this.$elSurnameInput.val('');
        this.$elHiddenInput.val('');
    }

    getIdElem($el) {
        return $el.closest(WAITER_ITEM_SELECTOR).data('waiterId');
    }

    toggleClass($el, className) {
        if (!($el).hasClass(className)) {
            $el.siblings().removeClass(className);
            $el.addClass(className);
        }
    }

    renderList(list) {
        this.$elList.html(list.map(this.getWaiterHtml).join('\n'));
    }

    getWaiterHtml({
        id,
        name,
        surname
    }) {
        return `<div class="list-waiters__item" data-waiter-id="${id}">
                    ${name} ${surname}<span class="delete delete-waiter">X</span>
                </div>`;
    }

    fillForm({
        id,
        name,
        surname
    }) {
        this.$elNameInput.val(name);
        this.$elSurnameInput.val(surname);
        this.$elHiddenInput.val(id);
    }
}