function addAccountToForm(accountName) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName).val(accountName);
  $accountPicker.append($accountToSelect);
}

function setupListeners() {
  var transactionType = document.querySelector('#transaction-select');
  transactionType.addEventListener('change', setCategories, false);

  var $addTransactionButton = $('#addTransactionButton');
  $addTransactionButton.click(saveTransaction);
}

function saveTransaction() {
  var title = document.querySelector('#title').value;
  var date = document.querySelector('#date').value;
  var category = document.querySelector('#category').value;
  var account = document.querySelector('#account').value;
  var amount = document.querySelector('#amount').value;
  manageLocalStorage.addTransaction(title, date, category, account, amount);
  /*
  manageLocalStorage.updateAccountBalance(transactionAmount);
  goBackToMainView();
   */
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
  setupListeners();
  setCategories();
}

document.onload = onPageLoaded();
