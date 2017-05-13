function addExpenseToDOM(expense) {
  var expenseList = document.querySelector('#expenseList');
  var expenseItem = document.createElement('li');
  var newExpenseCategory = document.createElement('span');
  var deleteButton = document.createElement('button');
  var deleteIcon = document.createElement('span');

  expenseItem.classList.add('pp-categories-list__item');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-remove', 'pp-categories-list__button');
  newExpenseCategory.classList.add('pp-categories-list__name');
  deleteIcon.classList.add('glyphicon', 'glyphicon-minus');

  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener('click', removeCategory, false);
  newExpenseCategory.textContent = expense;
  expenseItem.appendChild(newExpenseCategory);
  expenseItem.appendChild(deleteButton);
  expenseList.appendChild(expenseItem);
}

function addIncomeToDOM(income) {
  var incomeList = document.querySelector('#incomeList');
  var incomeItem = document.createElement('li');
  var newIncomeCategory = document.createElement('span');
  var deleteButton = document.createElement('button');
  var deleteIcon = document.createElement('span');

  incomeItem.classList.add('pp-categories-list__item');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-remove', 'pp-categories-list__button');
  newIncomeCategory.classList.add('pp-categories-list__name');
  deleteIcon.classList.add('glyphicon', 'glyphicon-minus');

  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener('click', removeCategory, false);
  newIncomeCategory.textContent = income;
  incomeItem.appendChild(newIncomeCategory);
  incomeItem.appendChild(deleteButton);
  incomeList.appendChild(incomeItem);
}

function checkCategoryInput(inputToCheck) {
  var alertForUser = document.querySelector('#alertForUser');
  if (inputToCheck.length === 0) {
    alertForUser.classList.add('alert', 'alert-danger');
    alertForUser.innerHTML = '<strong>Error:</strong> Please enter category';
    return false;
  } else {
    alertForUser.classList.remove('alert', 'alert-danger');
    alertForUser.textContent = '';
    return true;
  }
}

function clearFormInputs(elementID) {
  var inputToClear = document.querySelector('#' + elementID);
  inputToClear.value = '';
}

function saveExpenseCategory() {
  var expenseCategory = document.querySelector('#expense-category');
  if (checkCategoryInput(expenseCategory.value) === true) {
    addExpenseToDOM(expenseCategory.value);
    clearFormInputs(expenseCategory.id);
  }
}

function saveIncomeCategory() {
  var incomeCategory = document.querySelector('#income-category');
  if (checkCategoryInput(incomeCategory.value) === true) {
    addIncomeToDOM(incomeCategory.value);
    clearFormInputs(incomeCategory.id);
  }
}

function removeCategory() {
  var $btn = $(this);
  var categoryToRemove = $btn[0].parentNode;
  removeCategoryFromDOM(categoryToRemove);
}

function removeCategoryFromDOM(category) {
  category.parentNode.removeChild(category);
}

function onPageLoaded() {
  var addExpenseButton = document.querySelector('#add-expenseButton');
  var addIncomeButton = document.querySelector('#add-incomeButton');
  addExpenseButton.addEventListener('click', saveExpenseCategory, false);
  addIncomeButton.addEventListener('click', saveIncomeCategory, false);
}

document.onload = onPageLoaded();