'use strict';

import $ from "jquery";
import BaseController from "../BaseController";
import WaitersCollection from "../../model/pagePersonnel/WaitersCollection";
import WaitersView from "../../view/pagePersonnel/WaitersView";

export default class WaitersController extends BaseController {
    constructor() {
        super();

        this.config.onWaitersFilter = () => this.waitersFilter();
        this.config.onResetWaitersFilter = () => this.resetWaitersFilter();

        this.collection = new WaitersCollection();
        this.view = new WaitersView(this.config);
        

        this.$el = this.view.$el;
    }

    waitersFilter(){
        this.collection.waitersFilter();
        this.view.renderList(this.collection.filtredList);
    }

    resetWaitersFilter(){
        this.view.renderList(this.collection.list);
    }
}