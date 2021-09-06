'use strict';

import $ from "jquery";
import BaseController from "../BaseController";
import TablesCollection from "../../model/pagePersonnel/TablesCollection";
import TablesView from "../../view/pagePersonnel/TablesView";

export default class TablesController extends BaseController {
    constructor() {
        super();

        this.config.onTablesFilter = () => this.tablesFilter();
        this.config.onResetTablesFilter = () => this.resetTablesFilter();

        this.collection = new TablesCollection();
        this.view = new TablesView(this.config);

        this.listTables = this.collection.list;


        this.$el = this.view.$el;
    }

    tablesFilter(){
        this.collection.tablesFilter();
        this.view.renderList(this.collection.filtredList);
    }

    resetTablesFilter(){
        this.view.renderList(this.collection.list);
    }
}