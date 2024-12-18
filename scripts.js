//formulario elementos
const form = document. querySelector("form")
 const amount = document.getElementById("amount")
 const expense = document.getElementById("expense")
 const category = document.getElementById("category")

 //seleciona os elementos da lista 
 const expenseList = document.querySelector("ul")
 const expenseTotal = document.querySelector("aside header h2")
 const expensesQuantity = document. querySelector("aside header p span")
 

 //usa o elemento do imput para colocar o valor
 amount.oninput = () => {
    //colocar apenas numeros
     let value = amount.value. replace(/\D/g, "")

     //valor em centavos
     value = Number (value) / 100

     //autualiza o valor do input
    amount.value = formatCurrencyBRL(value)  
}

function formatCurrencyBRL (value) {
    // formata o valor para REAIS
    value = value. toLocaleString ("pt-BR", { 
        style: "currency",
        currency: "BRL", 
    })

    return value
}
//captura o evento de submit do formulário para obter os valores

form.onsubmit = () => {
    //previne o comportament padrão  de recarregar a página 
    event.preventDefault()
        //cria um objeto com os detalhes na nova despesa 
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex]. text,
        amount: amount.value,
        created_at: new Date(),
        }    
    
     //chama função que irá adicionar o item na lista
     expenseAdd(newExpense)
}

//add um novo item na lista
function expenseAdd(newExpense) {
    try {
                //criar um elemento para add item (LI) na lista (UL)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")
        
         //criar i ícone da contegoria
         const expenseIcon = document.createElement("img")
         expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
         expenseIcon.setAttribute ("alt", newExpense.category_name)
         
         // cria a info da despesa
         const expenseInfo = document.createElement ("div")
         expenseInfo.classList.add("expense-info")

         //cria o nome da despesa
         const expenseName = document.createElement ("strong")
         expenseName.textContent = newExpense.expense

         //cria a categoria da despesa

         const expenseCategory = document.createElement("span")
         expenseCategory.textContent = newExpense.category_name

         //add name e category da div das informações das despesas

         expenseInfo.append(expenseName, expenseCategory)

         //criar o valor da despesa

         const expenseAmount = document.createElement("span")
         expenseAmount.classList.add("expense-amount")
         expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
            .toUpperCase()
            .replace("R$","")}`

            //cria o icone de remover
            const removeIcon = document.createElement("img")
            removeIcon.classList.add("remove-icon")
            removeIcon.setAttribute("src", "img/remove.svg")
            removeIcon.setAttribute("alt", "remover")
                   //add informações de item

         expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
         //add o item na lista
         expenseList.append(expenseItem)

         //atualiza os totais
         updateTotals()
             } catch (error) {
         alert("não foi possível atualizar a lista de despesas.")
         console.log(error)        
    }    
}
// atualiza os totais
function updateTotals(){
    try {
    //recupra todos oos intes (LI) da lista (UL)
    const items = expenseList.children;
    

    //atualiza a quantidade de lista no itens
        expensesQuantity.textContent = `${items.length} ${ 
            items.length > 1 ? "despesas" : "despesa" 
        }`

          //variavel para incrementar o total.

          let total = 0 

         //percorrre cada item (li) da lista (ul)

         for (let item = 0; item < items.length; item++) {
             const itemAmount = items[item]. querySelector(".expense-amount")

            //remover caracteres não numericos é substitui a virgula pelo ponto.
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

            // converte o valor para float.
            value = parseFloat(value)

            //verificar se um numero valido
            if(isNaN(value)){
                return alert ("não foi possivel calcular o total. O  valor não parece ser um número.")
                }
         
         //Incrementar o valor total.
         total += Number(value)
        }

         //criar a apan para add o R$ formatado
         const symbbolBRL = document.createElement("small")
         symbbolBRL.textContent = "R$"
         // formata o valor e remove o R$ que sera exibido pela small com um estilo customizado
         total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

          // limpa o conteúdo do elemento
         expenseTotal.innerHTML = ""

         //add o simboloo da moeda e oo valor total
         expenseTotal.append(symbbolBRL, total)


         // limpa o formulario para add um noovo item. 
         formClear()


         //updateTotals()        
            } catch (error) {
        alert("não fooi possivel atualizr")
        }
}


// captura os clique nos itens da lista. 

expenseList.addEventListener("click", function(event){
    // verifica se o elemento clicado e o icone campo de remover.
    if(event.target.classList.contains("remove-icon")) {
        //obtem o Li pai do elemento clicado

        const item = event.target.closest(".expense")
         //remove o item da lista
        item.remove()

        }
        //atualiza os totais.
        updateTotals()
     
    })

function formClear(){
    expense.value = ""
    category.value = ""
    amount.value = ""

    //coloca o focooooo nooo input de amount. 
    expense.focus()

}