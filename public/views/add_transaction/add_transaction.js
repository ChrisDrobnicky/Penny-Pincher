function addAccountsToForm(accountName, accountID) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName).val(accountID);
  $accountPicker.append($accountToSelect);
}

function setupListeners() {
  var transactionType = document.querySelector('#transaction-select');
  transactionType.addEventListener('change', addCategoriesToForm, false);

  var $addTransactionButton = $('#addTransactionButton');
  $addTransactionButton.click(saveTransaction);
  $addTransactionButton.click(goBackToMainView);
}

function saveTransaction() {
  var $expenseType = $('#expense');
  var isExpense = $expenseType[0].selected;

  var title = document.querySelector('#title').value;
  var date = document.querySelector('#date').value;
  var categoryID = document.querySelector('#category').value;
  var accountID = document.querySelector('#account').value;
  var amount = parseFloat(document.querySelector('#amount').value);
  manageLocalStorage.addTransaction(title, date, categoryID, accountID, amount, isExpense);
}

function addCategoriesToForm() {
  var $categoryPicker = $('#category');
  var $expenseType = $('#expense');
  var isExpense = $expenseType[0].selected;
  var listOfCategories = manageLocalStorage.getListOfCategories(isExpense);
  $categoryPicker.find('option').remove();
  for (var i=0; i < listOfCategories.length; i++){
    var $option = $(document.createElement('option'));
    $option.text(listOfCategories[i].name);
    $option.val(listOfCategories[i].id);
    $categoryPicker.append($option);
  }
}

function goBackToMainView() {
  window.location.replace("../main/main.template.html");
}

function onPageLoaded() {
  manageLocalStorage.getAccountsToForm();
  addCategoriesToForm();
  setupListeners();
}
document.onload = onPageLoaded();