// import { renderCustomerList } from './functions.js'

let customers = {}
var loadedCustomerData
let select = document.querySelector('#customerList')

function renderCustomerList() {

  fetch('/customer-list')
      .then(response => response.json())
      .then(data => {
          console.log('fetch/customer-list', data)
          customers = data

          select.innerHTML = '<li><h6 class="dropdown-header">Select a customer</h6></li>'

          for (let i = 0; i < customers.length; i++) {
            select.innerHTML += `<li><a class="dropdown-item" href="#" id = "listItem">${customers[i].name}</a></li>`

            if (i - customers.length == -1) {                 
                let listItem = document.querySelectorAll("#listItem")

                for (let i = 0; i < listItem.length; i++) {
                    listItem[i].addEventListener('click', (e) => {
                      e.preventDefault() 
                      const selectedCustomer = listItem[i].innerText               
                      loadCustomer(selectedCustomer)
                    })
                }   
            }
          }                      
      })  
}

renderCustomerList()


//listening for selected customer
function loadCustomer(selectedCustomer) {

  const customerData = customers.filter(customer => {
        return customer.name === selectedCustomer
  })
  
  const workingArea = document.getElementById('homeWorkingArea')
      workingArea.innerHTML = `
      <div class = "text-secondary">
          <p>name: ${customerData[0].name}</p>
          <p>phone number: ${customerData[0].phoneNumber}</p>
      </div>
      <div>
          
      </div>`

  fetch('/selected-customer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'CSRF-Token': Cookies.get('XSRF-TOKEN'),
      },
      body:JSON.stringify({ selectedCustomer }),              
  })
  .then( (response) => { 
      console.log('selected-customer response', response) 
      fetch('./customer-data')
      .then((response) => response.text())      
      .then((data) => {
        console.log('fetch/customer-data', data)
          loadedCustomerData = JSON.parse(data)
      })
     
      .then(() => {
        
        workingArea.innerHTML += `<div>${loadedCustomerData[0].amount}</div>
                                  <div>${loadedCustomerData[0].day}</div>`
      })  

  })

}


//Adding new customer
const addCustomerForm = document.getElementById('addCustomerForm');

//Submit new customer
addCustomerForm.addEventListener('submit', (e) => {
  console.log('submit ran')
  e.preventDefault();

  const name = e.target.elements.customerName.value;
  const phoneNumber = e.target.elements.customerNumber.value; 
 
  return fetch('/add-new-customer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        // 'CSRF-Token': Cookies.get('XSRF-TOKEN'),
      },
      body:JSON.stringify({ name, phoneNumber}),              
  })
  .then( () => {
    // select.innerHTML = "<option></option>";                 
    renderCustomerList()
    
  })
  .then

  console.log('customerData ', customerData)
  customerDataStringify = (JSON.stringify(customerData))
  console.log(customerDataStringify)

  const workingArea = document.getElementById('workingArea')
  workingArea.innerHTML = `${customerDataStringify}`  

})  




