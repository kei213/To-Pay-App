// import { renderCustomerList } from './functions.js'
let customers = {}
let select = document.querySelector('#customerList')
// console.log('customerHomeView', customerHomeView)
function renderCustomerList() {

  fetch('/all-customers')
      .then(response => response.json())
      .then(data => {
          console.log('data from db', data)
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

//render each customer name to the DOM
/*function renderCustomerList(customerList) {
    customers.forEach( (customer) => {      
          // console.log(customer.name)       
          select.innerHTML += `<option>${customer.name}</option>`
      
    })
}*/

//listenening for selected customer
function loadCustomer(selectedCustomer) {

  const customerData = customers.filter(customer => {
        return customer.name === selectedCustomer
  })
  console.log('customerData.name', customerData[0].name)
  // customerDataStringify = (JSON.stringify(customerData))

  const workingArea = document.getElementById('homeWorkingArea')
  workingArea.innerHTML = `
      <div>name: ${customerData[0].name}</div>`

}


//Adding new customer
const addCustomerForm = document.getElementById('addCustomerForm');

//submit new customer
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

  console.log('customerData ', customerData)
  customerDataStringify = (JSON.stringify(customerData))
  console.log(customerDataStringify)

  const workingArea = document.getElementById('workingArea')
  workingArea.innerHTML = `${customerDataStringify}`  

})  

let searchInput = document.querySelector("#customerNameSearchInput")
searchInput.addEventListener('click', (e) => {
  e.preventDefault() 
  var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
  })
})

const expandList = document.querySelector(".expand-list")
expandList.addEventListener('click', (e) => {  
  e.preventDefault()  

  var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
  var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
  })

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
