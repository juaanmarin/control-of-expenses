const bAdd=document.querySelector("#bAdd") as HTMLButtonElement;
const inputitle=document.querySelector("#title") as HTMLInputElement;
const inputCost=<HTMLInputElement>document.querySelector("#cost");
const inputCurrency=document.querySelector("#currency") as HTMLInputElement;

//se crea una instancia de la clase expenses 
const expenses=new Expenses("USD");

//el signo d einterrogacion indica que el dato no ba a ser null si no estamos seguros lo cambiamos por ?
bAdd!.addEventListener("click", e=>{
    
    if(inputitle!.value != "" && inputCost!.value !="" && !isNaN(parseFloat(inputCost.value))){
        const title=inputitle!.value;
        const cost=parseFloat(inputCost!.value);
        const currency=<Currency>inputCurrency!.value;

        expenses.add({
            title:title, 
            cost:{number:cost,currency:currency}
        });

        render();
    }else{
        alert("conpleta los datos correctamente");
    }

});

function render(){
    let html="";
    expenses.getItems().forEach(item=>{
        const {id,title,cost}=item;

        html+=`<div class="item">
            <div><span class="currency">${cost.currency}</span> ${cost.number}</div>
            <div>${title}</div>
            <div><button class="bEliminar" data-id="${id}">eliminar</button></div>        
        </div>`;
    });

    $("#items").innerHTML=html;
    $("#display").textContent=expenses.getTotal();

    $$(".bEliminar").forEach(bEliminar=>{
        bEliminar.addEventListener("click", e=>{
            const id=(e.target as HTMLButtonElement).getAttribute("data-id");
            
            expenses.remove(parseInt(id!));

            render();
        })
    })
}

function $(selector:string):HTMLElement{
    return document.querySelector(selector) as HTMLElement;
}

function $$(selector:string):NodeListOf<HTMLElement>{
    return document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
}