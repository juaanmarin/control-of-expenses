type Currency = "MXN" | "USD" | "COP";

interface Price{
    number:number;
    currency:Currency
}

interface ExpenseItems{
    id:number;
    title:string;
    cost:Price;
}

class Expenses {
    // constructor(parameters) {  
    // }
}