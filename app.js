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
    console.log(row);
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
    document.getElementById('perishable').value;
  }
}

// LOCAL STORAGE CLASS
class Store {
  static getGrocery(){

  }
  static displayGrocery(){

  }
  static addGrocery(grocery){

  }
  static removeGrocery(something){
    
  }
}

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