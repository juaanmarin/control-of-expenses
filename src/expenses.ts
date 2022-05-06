type Currency = "MXN" | "USD" | "COP"; //definimos que currency no puede tener otro tipo de dato que nos sea("MXN","USD","COP")

//interfas personalizada que espera dos datos uno primitivo y uno personalizado
interface Price{
    number:number,
    currency:Currency
}

//ExpensesItems espera tres datos dos de tipo primitibo y uno personalisado
interface ExpenseItems{
    id?:number,
    title:string,
    cost:Price
}

//interfas en la que se inplemanta un dato personalizado de tipo Arraylist
interface iExpenses{
    expenses:ArrayList<ExpenseItems>,
    finalCurrency: Currency,
    add(item:ExpenseItems):boolean,
    get(index:number):ExpenseItems|null,
    getTotal():string,
    remove(id:number):boolean
}

// clase con dato personalizado de tipo arraylist
class ArrayList<T>{
    private items:T[];

    constructor (){
        this.items=[];
    }
    add(item:T):void{
        this.items.push(item);
    }

    get(index:number):T|null{
        const item:T[]=this.items.filter((x,i:number)=>{
            return i === index;
        });
        if(item.length===0){
            return null;
        }
        else{
            return item[0];
        }
    }
    createFerom(value:T[]):void{
        this.items=[...value];
    }
    getAll():T[]{
        return this.items;
    }
}

//clase que enplementa todo los metodos de la interfase iexpnses
class Expenses implements iExpenses{

    expenses: ArrayList<ExpenseItems>;
    finalCurrency: Currency;

    private count=0;
    
    constructor(currency:Currency) {  
        this.finalCurrency=currency=currency;
        this.expenses=new ArrayList<ExpenseItems>();
    }

    add(item: ExpenseItems): boolean {
        item.id=this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index:number): ExpenseItems | null {
        return this.expenses.get(index);
    }
    getItems():ExpenseItems[]{
        return this.expenses.getAll();
    }
    getTotal(): string {
        const total=this.expenses.getAll().reduce((acc,item)=>{          
            return acc+= this.convertCurrency(item, this.finalCurrency);
        },0);  
        return `${this.finalCurrency} ${total.toFixed(2).toString()}`;
    } 
    remove(id: number): boolean {
        const items=this.getItems().filter(item=>{
            return item.id!=id;
        })
        this.expenses.createFerom(items)
        return true;
    }
    private convertCurrency(item:ExpenseItems, currency:Currency){
        switch(item.cost.currency){
            case "USD":
                switch(currency){
                    case "MXN":
                        return item.cost.number*22;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case "MXN":
                switch(currency){             
                    case "USD":
                        return item.cost.number/22;
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