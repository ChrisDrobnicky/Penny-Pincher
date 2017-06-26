function addAccountToDom (name, balance){
  var $accountList = $('#accountList');
  var accountID = manageLocalStorage.getAccountID();
  var $newListItem = $(document.createElement('li'));
  var $newAccountName = $(document.createElement('span'));
  var $newAccountBalance = $(document.createElement('span'));
  var $deleteButton = $(document.createElement('button'));
  var $deleteIcon = $(document.createElement('span'));
  $newListItem.addClass('pp-account-list__item').attr('id', accountID);
  $newAccountName.text(name).addClass('pp-account-list__name');
  $newAccountBalance.text(balance).addClass('pp-account-list__balance');
  $deleteButton.addClass('pp-account-list__button');
  $deleteIcon.addClass('pp-account-list__icon glyphicon glyphicon-trash');

  $deleteButton.click(removeAccount);

  $deleteButton.append($deleteIcon);
  $newListItem.append($newAccountName);
  $newListItem.append($newAccountBalance);
  $newListItem.append($deleteButton);
  $accountList.append($newListItem);
}

function removeAccountFromDom(listItem){
  $(listItem).remove();
}


function checkInput(accountName, accountBalance){
  var amountAfterDecimalPoint = ('' + accountBalance).split('.')[1];
  var $outputDiv = $('#outputDiv');
  if (accountName.length === 0 || accountBalance.length === 0) {
    $outputDiv.addClass('alert alert-danger');
    $outputDiv.html('<strong>Error in your form:</strong> Please enter the gaps');
    return false;
  } else if (isNaN(accountBalance)) {
    $outputDiv.addClass('alert alert-danger');
    $outputDiv.html('<strong>Error in your form:</strong> Your balance must be a number - e.g. 0.00');
    return false;
  } else if (amountAfterDecimalPoint && amountAfterDecimalPoint.length > 2)  {
    $outputDiv.addClass('alert alert-danger');
    $outputDiv.html('<strong>Error in your form:</strong> Please enter maximum two numbers after decimal point in balance');

  } else {
    $outputDiv.removeClass('alert alert-danger');
    $outputDiv.text('');
    return true;
  }
}

function clearFormInputs() {
  var $nameInput = $('#account-name');
  var $balanceInput = $('#account-balance');
  $nameInput.val('');
  $balanceInput.val('');
}

function saveAccount() {
  var accountName = $('#account-name').val();
  var accountBalance = $('#account-balance').val();
  var accountID = localStorage.getItem('accountID');
  checkInput(accountName, accountBalance);
  if (checkInput(accountName, accountBalance) === true) {
    addAccountToDom(accountName, accountBalance, accountID);
    manageLocalStorage.generateAccountID();
    manageLocalStorage.addAccount(accountName, accountBalance, accountID);
    clearFormInputs();
    }
  }

function removeAccount () {
  var $btn = $(this);
  var listItem = $btn[0].parentNode;
  var accountID = listItem.id;
  removeAccountFromDom(listItem);
  manageLocalStorage.removeAccount(accountID);
}

function getAccountsFromStorage () {
  manageLocalStorage.getAllAccounts();
}

function setListenerOnButton() {
  var $continueButton = $('#continueButton');
  $continueButton.click(checkAndContinue);
}

function checkAndContinue() {
  var accountList = document.querySelector('#accountList');
  var $outputDiv = $('#outputDiv');
  if (accountList.children.length === 0) {
    $outputDiv.addClass('alert alert-danger');
    $outputDiv.html('<strong>Warning:</strong> Please create at least one account');
  } else {
    $outputDiv.removeClass('alert alert-danger');
    $outputDiv.text('');
    window.location.replace("../categories/categories.template.html");
  }
}

function onPageLoaded() {
  setListenerOnButton();
  var $addButton = $('#add-button');
  $addButton.click(saveAccount);
  getAccountsFromStorage();
  if (localStorage.getItem('accountID')=== null ) {
    manageLocalStorage.generateAccountID();
  }
}

document.onload = onPageLoaded();
