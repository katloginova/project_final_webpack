'use strict';

import $ from "jquery";
import WaitersController from "./WaitersController";
import TablesController from "./TablesController";

export default class PersonnelController {
    constructor($container) {
        this.$container = $container;

        this.waitersController = new WaitersController();
        this.tablesController = new TablesController();

        this.waitersCollection = this.waitersController.collection;
        this.tablesCollection = this.tablesController.collection;

        this.$elWaiters = this.waitersController.$el;
        this.$elTables = this.tablesController.$el;


        this.waitersController.init();
        this.tablesController.init();
    }
}