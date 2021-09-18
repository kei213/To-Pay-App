// import { renderCustomerList } from './functions.js'

//Render products

let select = document.querySelector('#customerSelect')

//render each customer name to the DOM
function renderCustomerList() {
    customers.forEach( (customer) => {      
          // console.log(customer.name)       
          select.innerHTML += `<option>${customer.name}</option>`
      
    })
}

renderCustomerList()

function displayCustomer() {

}

//listenening for selected customer
select.addEventListener('input', () => {
  const selectedCustomer = select.value
  setTimeout(function(){ select.selectedIndex = 0; }, 2000);

  const customerData = customers.filter(customer => {
        return customer.name === selectedCustomer
  })

  customerDataStringify = (JSON.stringify(customerData))

  const workingArea = document.getElementById('workingArea')
  workingArea.innerHTML = `${customerDataStringify}`
})


//Adding new customer
const addCustomerForm = document.getElementById('addCustomerForm');

//submit new customer
addCustomerForm.addEventListener('submit', (e) => {
  console.log('submit ran')
  e.preventDefault();
  //Get message text
  const customerName = e.target.elements.customerName.value;
  const customerNumber = e.target.elements.customerNumber.value;  

  const newCustomer =  {
    id: 7,
    name: customerName,
    price: 29.99,
    instock: 100,

  } 

  customers.push(newCustomer)
  console.log('customers', customers)

  const customerData = customers.filter(customer => {
        return customer.name === newCustomer.name
  })

  console.log('customerData ', customerData)
  customerDataStringify = (JSON.stringify(customerData))
  console.log(customerDataStringify)

  const workingArea = document.getElementById('workingArea')
  workingArea.innerHTML = `${customerDataStringify}`

  select.innerHTML = `<option selected>Select a Customer</option>
                      <option></option>`

  renderCustomerList()

})  

//disabling form submissions if there are invalid fields
function disableFormSubmission() {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
}

disableFormSubmission()
