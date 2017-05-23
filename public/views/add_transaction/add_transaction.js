function addAccountToForm(accountName) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName).val(accountName);
  $accountPicker.append($accountToSelect);
}

function addListenerToTransaction() {
  var transactionType = document.querySelector("#transaction-select");
  debugger;
  transactionType.addEventListener('change', setCategories, false);
}

function setCategories() {
  var $categoryPicker = $('#category');
  var $expenseType = $('#expense');
  var isExpense = $expenseType[0].selected;
  var listOfCategories = manageLocalStorage.getListOfCategories(isExpense);
  $categoryPicker.find('option').remove();
  for (var i=0; i < listOfCategories.length; i++){
    var $option = $(document.createElement('option'));
    $option.text(listOfCategories[i].name);
    $categoryPicker.append($option);
  }
}

function onPageLoaded() {
  manageLocalStorage.getAccountsNames();
  addListenerToTransaction();
  setCategories();
}

document.onload = onPageLoaded();
