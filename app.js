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
  showAlert(){

  }
  deleteGrocery(target){

  }
  clearFields(){
    document.getElementById('grocery-item').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('perishable').value;
  }
}

// EVENT LISTENERS ADD
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
    ui.showAlert('Book Added!', 'success');
    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});