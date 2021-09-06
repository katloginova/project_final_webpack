'use strict';

import $ from "jquery";
import '../scss/style.scss';
import GlobalController from './controller/GlobalController';

$(() => {
    new GlobalController($('body'));
});
