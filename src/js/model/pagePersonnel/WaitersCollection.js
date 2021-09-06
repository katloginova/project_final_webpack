'use strict';

import $ from "jquery";
import BaseCollection from "../BaseCollection";
import { URL_WAITERS } from "../../config";

export default class WaitersCollection extends BaseCollection {
    constructor() {
        super();
        this._url = URL_WAITERS;
        this.filtredList = [];
    }

    waitersFilter() {
        const list = [...this.list];

        this.filtredList = list.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (a.name < b.name) {
              return -1;
            }
            return 0;
          });
    }
}