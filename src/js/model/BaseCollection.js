'use strict';

import $ from "jquery";
export default class BaseCollection {
    constructor() {
        this._url = null;
        this.list = [];
    }

    getCollection() {
        return fetch(this._url)
                    .then((res) => res.json())
                    .then((data) => this.setData(data));
    }

    setData(data){
        this.list = data;
    }

    addData(formData){
        return fetch(this._url, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then((data) => this.list.push(data));
    }

    editData(formData){
        this.list = this.list.map((item) => (item.id != formData.id) ? item : formData);

        return fetch(`${this._url}/${formData.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            },
        }).then(res => res.json());
    }

    deleteData(id){
        this.list = this.list.filter((item) => item.id != id);

        return fetch(`${this._url}/${id}`, {
            method: 'DELETE',
        }).then(res => res.json());
    }

    findItem(id){
        return this.list.find((item) => item.id == id);
    }
}