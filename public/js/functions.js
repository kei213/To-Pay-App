//render each customer name to the DOM
function renderCustomerList() {
    customers.forEach( (customer) => {      
          // console.log(customer.name)       
          select.innerHTML += `<option>${customer.name}</option>`
      
    })
}

export function renderCustomerList()