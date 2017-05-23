function addAccountToForm(accountName) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName);
  $accountPicker.append($accountToSelect);
}

function addListenerToTransaction() {
  var transactionType = document.querySelector("#transaction-select");
  debugger;
  transactionType.addEventListener('change', setCategories, false);
}

function setCategories() {
  var $expenseType = $('#expense');
  var isExpense = $expenseType[0].selected;
  manageLocalStorage.getListOfCategories(isExpense);
}

function addCategoryToForm(category) {
  var $categoryPicker = $('#category');
  var $categoryToSelect = $(document.createElement('option'));
  $categoryToSelect.text(category);
  $categoryPicker.append($categoryToSelect);
}

function onPageLoaded() {
  manageLocalStorage.getAccountsNames();
  addListenerToTransaction();
  setCategories();
}

document.onload = onPageLoaded();
