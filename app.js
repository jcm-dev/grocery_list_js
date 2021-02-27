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
  addGrocery(itemName){

  }
  showAlert(){

  }
  deleteGrocery(target){

  }
  clearFields(){

  }
}

// EVENT LISTENERS ADD
document.getElementById('grocery-form').addEventListener('submit', function(e){
  // grab values from the form and assign them to
  // local variables
  const groceryItem = document.getElementById('grocery-item').value,
        quantity = document.getElementById('quantity').value,
        perishable = document.getElementById('perishable');

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
  }

  e.preventDefault();
});