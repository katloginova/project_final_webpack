'use strict';

import $ from "jquery";
import BaseCollection from "../BaseCollection";
import { URL_TABLES } from "../../config";

export default class TablesCollection extends BaseCollection{
    constructor(){
        super();
        this._url = URL_TABLES;
        this.filtredList = [];
    }

    tablesFilter(){
        const list = [...this.list];

        this.filtredList = list.sort((a, b) => (a.numberTable - b.numberTable));
    }
}