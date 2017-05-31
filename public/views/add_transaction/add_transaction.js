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
}

function saveTransaction() {
  var $expenseType = $('#expense');
  var isExpense = $expenseType[0].selected;

  var title = document.querySelector('#title').value.trim();
  var date = document.querySelector('#date').value;
  var categoryID = document.querySelector('#category').value;
  var accountID = document.querySelector('#account').value;
  var amount = parseFloat(document.querySelector('#amount').value);
  if(validateForm(title, date, amount)) {
    manageLocalStorage.addTransaction(title, date, categoryID, accountID, amount, isExpense);
    goBackToMainView();
  }
}


function validateForm(title, date, amount) {
  var amountAfterDecimalPoint = ('' + amount).split('.')[1];
  if (title.length < 1) {
    showError('<strong>Error:</strong>Title must include at least one letter');
    return false;
  } else if (date.length < 1) {
    showError('<strong>Error:</strong> Please select transaction\'s date');
    return false;
  } else if (isNaN(amount) || amount <= 0) {
    showError('<strong>Error:</strong> Please type transaction\'s amount');
    return false;
  } else if (amountAfterDecimalPoint && amountAfterDecimalPoint.length > 2){
    showError('<strong>Error:</strong> Please enter maximum two numbers after decimal point in Amount');
    return false;
  } else {
    return true;
  }
}

function showError(alertText) {
  var $alertForUser = $('#alertForUser');
  $alertForUser.addClass('alert alert-danger');
  $alertForUser.html(alertText);
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