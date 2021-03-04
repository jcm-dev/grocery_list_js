// GROCERY ITEM CLASS
class Grocery {
  constructor(groceryItem, quantity, perishable){
    this.groceryItem = groceryItem;
    this.quantity = quantity;
    this.perishable = perishable;
  }
}

// UI CLASS
class UI {
  addGrocery(grocery){
    // create variable to grab the grocery-list
    const list = document.getElementById('grocery-list');
    // create table row
    const row = document.createElement('tr');
    // insert columns
    row.innerHTML = `
    <td>${grocery.groceryItem}</td>
    <td>${grocery.quantity}</td>
    <td>${grocery.perishable}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }
  showAlert(message, className){
    // create div to hold the alert
    const div = document.createElement('div');
    // add the alert class to the div
    div.className = `alert ${className}`;
    // create a text node and fill it with the passed
    // message and append this to the div
    div.appendChild(document.createTextNode(message));
    // grab the parent element and the form element
    // to insert the alert div between
    const container = document.querySelector('.container'),
          form = document.querySelector('#grocery-form');
    // insert the alert div by grabbing the container,
    // and within the container pass the div in
    // before the form
    container.insertBefore(div, form);
    // remove message aftr 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }
  deleteGrocery(target){
    // test if the target clicked
    // contains the delete class and if so
    // traverse the UI to delete the targets parents
    // parent which is the whole grocey item
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
    document.getElementById('grocery-item').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('perishable').value = '';
  }
}

// LOCAL STORAGE CLASS
class Store {
  static getGrocery(){
    // create local variable to hold each
    // grocery item, then test if localStorage contains
    // a groceryItem array, if not set to empty array
    // if so then parse the groceryItem string array into
    // into a useable object array
    let grocery;
    if (localStorage.getItem('grocery') === null){
      grocery = [];
    } else {
      grocery = JSON.parse(localStorage.getItem('grocery'));
    }
    return grocery;
  }
  static displayGrocery(){
    // create local variable, call the
    // getGrocery Store method and store the
    // results in the variable
    const grocery = Store.getGrocery();
    // loop through each item in grocery and
    // add it to the UI
    grocery.forEach(function(groceryItem){
      const ui = new UI;

      ui.addGrocery(groceryItem);
    });
  }
  static addGrocery(grocery){
    // create local groceryItem variable
    // and call the getGrocery method and assign
    // the results to groceryitem and then push
    // the new groceryItem from the parameter
    // to the groceryItem object array and parse
    // back to string and add to local storage
    const groceryItem = Store.getGrocery();
    groceryItem.push(grocery);
    localStorage.setItem('grocery', JSON.stringify(groceryItem));
  }
  static removeGrocery(something){

  }
}

// DOM LOAD EVENT
document.addEventListener('DOMContentLoaded', Store.displayGrocery());

// EVENT LISTENER ADD
document.getElementById('grocery-form').addEventListener('submit', function(e){
  // grab values from the form and assign them to
  // local variables
  const groceryItem = document.getElementById('grocery-item').value,
        quantity = document.getElementById('quantity').value,
        perishable = document.getElementById('perishable').value;

  // instantiate grocery item
  const grocery = new Grocery(groceryItem, quantity, perishable);

  // instantiate UI
  const ui = new UI();

  // validate field entry
  if(groceryItem === '' || quantity === '' || perishable === ''){
    // alert user of empty text fields
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // add grocery to list
    ui.addGrocery(grocery);

    // add to local storage
    Store.addGrocery(grocery);

    // show completion
    ui.showAlert('Grocery Added!', 'success');
    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// EVENT LISTENER DELETE
document.getElementById('grocery-list').addEventListener('click', function(e){

  // instantiate ui
  const ui = new UI();
  // within the ui class call the deleteGrocery method and
  // pass it the target clicked
  ui.deleteGrocery(e.target);
  // show alert
  ui.showAlert('Grocery Removed', 'success');

  e.preventDefault();
});