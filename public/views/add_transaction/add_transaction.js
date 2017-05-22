function addAccountToForm(accountName) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName);
  $accountPicker.append($accountToSelect);
}

function checkTransactionType() {
  var $expenseType = $('#expense');
  var $incomeType = $('#income');
  if ($expenseType[0].checked = true){
    manageLocalStorage.getExpenseCategories();
  } else if ($incomeType[0].checked = true){
    manageLocalStorage.getIncomeCategories();
  }
}

function addCategoryToForm(category) {
  var $categoryPicker = $('#category');
  var $categoryToSelect = $(document.createElement('option'));
  $categoryToSelect.text(category);
  $categoryPicker.append($categoryToSelect);
}

function onPageLoaded() {
  manageLocalStorage.getAccountsNames();
  checkTransactionType();
}

document.onload = onPageLoaded();
