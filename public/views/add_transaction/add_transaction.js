function addAccountsToForm(accountName, accountID) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName).val(accountID);
  $accountPicker.append($accountToSelect);
}

function setupListeners() {
  var $expenseButton = $('#expenseButton');
  var $incomeButton = $('#incomeButton');
  var $addTransactionButton = $('#addTransactionButton');

  $expenseButton.click(function() {
    addCategoriesToForm(true);
  });
  $expenseButton.click(function() {
    setExpenseActive($expenseButton, $incomeButton);
  });


  $incomeButton.click(function() {
    addCategoriesToForm(false);
  });
  $incomeButton.click(function() {
    setIncomeActive($incomeButton, $expenseButton);
  });

  $addTransactionButton.click(saveTransaction);
}

function setExpenseActive (activeButton, inactiveButton) {
  activeButton.addClass('pp-transaction__expense--active');
  inactiveButton.removeClass('pp-transaction__income--active');
}

function setIncomeActive (activeButton, inactiveButton) {
  activeButton.addClass('pp-transaction__income--active');
  inactiveButton.removeClass('pp-transaction__expense--active');
}

function saveTransaction() {
  var title = document.querySelector('#title').value.trim();
  var date = document.querySelector('#date').value;
  var categoryID = document.querySelector('#category').value;
  var accountID = document.querySelector('#account').value;
  var amount = parseFloat(document.querySelector('#amount').value);
  if(validateForm(title, date, amount, categoryID)) {
    manageLocalStorage.addTransaction(title, date, categoryID, accountID, amount);
    goBackToMainView();
  }
}

function validateForm(title, date, amount, category) {
  var amountAfterDecimalPoint = ('' + amount).split('.')[1];
  if (title.length < 1) {
    showError('<strong>Error:</strong>Title must include at least one letter');
    return false;
  } else if (date.length < 1) {
    showError('<strong>Error:</strong> Please select transaction\'s date');
    return false;
  } else if (category.length <1) {
    showError('<strong>Error:</strong> Please choose transaction\'s type to see categories');
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

function addCategoriesToForm(isExpense) {
  var $categoryPicker = $('#category');
  var listOfCategories = manageLocalStorage.getListOfCategories(isExpense);
  $categoryPicker.find('option').remove();
  for (var i=0; i < listOfCategories.length; i++){
    var $option = $(document.createElement('option'));
    $option.text(listOfCategories[i].name);
    $option.val(listOfCategories[i].id);
    $categoryPicker.append($option);
  }
  manageLocalStorage.setIsExpenseTransaction(isExpense);
}

function goBackToMainView() {
  window.location.replace("../main/main.template.html");
}

function displayTotalBalance() {
  var $totalBalance = $('#totalBalance');
  $totalBalance.text(manageLocalStorage.getTotalBalance().toFixed(2) + ' PLN');
}

function onPageLoaded() {
  manageLocalStorage.getAccountsToForm();
  displayTotalBalance();
  setupListeners();
}
document.onload = onPageLoaded();