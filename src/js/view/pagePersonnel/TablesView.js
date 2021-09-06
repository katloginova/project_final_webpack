'use strict';

import $ from "jquery";
import { FILTER_CLASS, ACTIVE_CLASS } from "../../config";

const SEND_TABLE_SELECTOR = '.send-table';
const DELETE_TABLE_SELECTOR = '.delete-table';
const TABLES_ITEM_SELECTOR = '.list-tables__item';



export default class TablesView {
    constructor(config) {
        this.config = config;
        
        this.$el = null;
        this.$elTitle = null;
        this.$elTablesList = null;
        this.$elForm = null;
        this.$elTableNumber = null;
        this.$elNumberLabel = null;
        this.$elNumberInput = null;
        this.$elHiddenInput = null;
        this.$elSendBtn = null;

        this.initView();
    }

    initView() {
        this.$el = $(`<div class="tables"></div>`);
        this.$elTitle = $(`<div class="title">Столики</div>`);
        this.$elList = $(`<div class="list-tables"></div>`);

        this.$elForm = $(`<form class="form-table"></form>`);
        this.$elTableNumber = $(`<div class="table-number"> </div>`);
        this.$elNumberLabel = $(`<label for="inputTable">Столик:</label>`);
        this.$elNumberInput = $(`<input id="inputTable" type="text" class="input-item">`);

        this.$elHiddenInput = $(`<input type="hidden" value="id">`);
        this.$elSendBtn = $(`<input type="submit" value="отправить" class="send-table btn">`);
        this.$elBtnFilter = $(`<button class="filter-btn btn">включить филтрацию</button>`);

        this.addElements();

        this.$elForm.on('click', SEND_TABLE_SELECTOR, this.onTableSubmit.bind(this));
        this.$elList.on('click', DELETE_TABLE_SELECTOR, this.onDeleteTableClick.bind(this));
        this.$elList.on('click', TABLES_ITEM_SELECTOR, this.onTableClick.bind(this));
        this.$elBtnFilter.on('click', this.onTablesFilterClick.bind(this));
    }


    addElements() {
        this.$el
            .append(this.$elTitle)
            .append(this.$elList)
            .append(this.$elForm
                .append(this.$elTableNumber
                    .append(this.$elNumberLabel)
                    .append(this.$elNumberInput)
                    .append(this.$elHiddenInput)
                    .append(this.$elSendBtn)
                    .append(this.$elBtnFilter)));
    }


    onTableSubmit(e){
        e.preventDefault();

        const table = this.getFormData();

        if(this.isInputsInvalid()){
            return;
        }

        if(!table.id){
            this.config.onSubmitData(table);
        } else {
            this.config.onEditData(table);
        }

        this.resetForm();
    }

    onDeleteTableClick(e){
        const id = this.getIdElem($(e.target));
        this.config.onDeleteData(id);

        e.stopPropagation();
    }

    onTableClick(e){
        const id = this.getIdElem($(e.target));
        const $elTable = $(e.target).closest(TABLES_ITEM_SELECTOR);

        this.toggleClass($elTable, ACTIVE_CLASS);
        this.config.onFillForm(id);
    }

    onTablesFilterClick(e){
        e.preventDefault();

        if ($(e.target).hasClass(FILTER_CLASS) && $(e.target).hasClass(FILTER_CLASS)){
            this.config.onResetTablesFilter();

            $(e.target).removeClass(FILTER_CLASS);
            this.$elBtnFilter.html('включить филтрацию');

        } else{
            this.config.onTablesFilter();

            $(e.target).addClass(FILTER_CLASS);
            this.$elBtnFilter.html('отключить филтрацию');
        }
 
    }


    getFormData(){
        return {
            numberTable: +this.$elNumberInput.val(),
            id: this.$elHiddenInput.val(),
        };
    }

    isInputsInvalid() {
        return this.$elNumberInput.val() === '';
    }

    resetForm(){
        this.$elNumberInput.val('');
        this.$elHiddenInput.val('');
    }

    getIdElem($el) {
        return $el.closest(TABLES_ITEM_SELECTOR).data('tableId');
    }

    toggleClass($el, className){
        if(!($el).hasClass(className)){
            $el.siblings().removeClass(className);
            $el.addClass(className);
        }
    }

    renderList(list) {
        this.$elList.html(list.map(this.getTableHtml).join('\n'));
    }

    getTableHtml({numberTable, id}){
        return `<div class="list-tables__item" data-table-id="${id}">
                    ${numberTable}<span class="delete delete-table">x</span>
                </div>`;
    }

    fillForm({id, numberTable}){
        this.$elNumberInput.val(numberTable);
        this.$elHiddenInput.val(id);
    }
}