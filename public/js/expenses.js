"use strict";
// clase con dato personalizado de tipo arraylist
class ArrayList {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length === 0) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFerom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
//clase que enplementa todo los metodos de la interfase iexpnses
class Expenses {
    constructor(currency) {
        this.count = 0;
        this.finalCurrency = currency = currency;
        this.expenses = new ArrayList();
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    getTotal() {
        const total = this.expenses.getAll().reduce((acc, item) => {
            return acc += this.convertCurrency(item, this.finalCurrency);
        }, 0);
        return `${this.finalCurrency} ${total.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expenses.createFerom(items);
        return true;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "MXN":
                        return item.cost.number * 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case "MXN":
                switch (currency) {
                    case "USD":
                        return item.cost.number / 22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
}
