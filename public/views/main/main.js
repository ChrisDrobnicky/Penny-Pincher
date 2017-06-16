function displayAccountsInDOM(name, balance, id) {
  var $accountList = $('#accountList');
  var $accountContainer = $(document.createElement('li'));
  var $accountName = $(document.createElement('span'));
  var $accountBalance = $(document.createElement('span'));
  var $historyButton = $(document.createElement('a'));

  $accountContainer.addClass('pp-account__listItem');
  $accountName.addClass('pp-account__name');
  $accountBalance.addClass('pp-account__balance');
  $historyButton.addClass('pp-account__button btn btn-xs btn-warning');
  $historyButton.text('Show history');
  $historyButton.attr('href', '../history/history.template.html');
  $historyButton.attr('id', id);
  $historyButton.click(saveClickedAccountID);

  $accountName.text(name);
  $accountBalance.text(balance);
  if (balance < 0) {
    $accountBalance.addClass('pp-account__balance--minus');
  } else {
    $accountBalance.addClass('pp-account__balance--plus');
  }

  $accountContainer.append($accountName);
  $accountContainer.append($accountBalance);
  $accountContainer.append($historyButton);
  $accountList.append($accountContainer);
}

function saveClickedAccountID(event) {
  var clickedAccountID = event.target.id;
  manageLocalStorage.saveClickedAccountID(clickedAccountID);
}

function setListenerOnButton() {
  var $resetLocalStorageButton = $('#resetLocalStorageButton');
  $resetLocalStorageButton.click(resetLocalStorage);
}

function resetLocalStorage() {
  localStorage.clear();
}

function displayTotalBalance() {
  var $totalBalance = $('#totalBalance');
  $totalBalance.text(manageLocalStorage.getTotalBalance().toFixed(2) + ' PLN');
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
  displayTotalBalance();
  setListenerOnButton();
}

document.onload = onPageLoaded();