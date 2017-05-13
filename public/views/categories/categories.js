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
  newIncomeCategory.textContent = income;
  incomeItem.appendChild(newIncomeCategory);
  incomeItem.appendChild(deleteButton);
  incomeList.appendChild(incomeItem);
}

function saveExpenseCategory() {
  var expenseCategory = document.querySelector('#expense-category').value;
  addExpenseToDOM(expenseCategory);
}

function saveIncomeCategory() {
  var incomeCategory = document.querySelector('#income-category').value;
  addIncomeToDOM(incomeCategory);
}

function onPageLoaded() {
  var addExpenseButton = document.querySelector('#add-expenseButton');
  var addIncomeButton = document.querySelector('#add-incomeButton');
  addExpenseButton.addEventListener('click', saveExpenseCategory, false);
  addIncomeButton.addEventListener('click', saveIncomeCategory, false);
}

document.onload = onPageLoaded();