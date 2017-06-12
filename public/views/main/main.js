function displayAccountsInDOM(name, balance, id) {
  var $accountList = $('#accountList');
  var $accountContainer = $(document.createElement('div'));
  var $accountDetails = $(document.createElement('div'));
  var $accountName = $(document.createElement('div'));
  var $accountBalance = $(document.createElement('div'));
  var $historyButton = $(document.createElement('a'));

  $accountContainer.addClass('pp-account');
  $accountDetails.addClass('pp-account-details panel panel-success');
  $accountName.addClass('panel-heading');
  $accountBalance.addClass('pp-account-details__balance panel-body');
  $historyButton.addClass('pp-account-details__button');
  $historyButton.text('Show history');
  $historyButton.attr('href', '../history/history.template.html');
  $historyButton.attr('id', id);
  $historyButton.click(saveClickedAccountID);

  $accountName.text(name);
  $accountBalance.text(balance);

  $accountDetails.append($accountName);
  $accountDetails.append($accountBalance);
  $accountContainer.append($accountDetails);
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
  $totalBalance.text(manageLocalStorage.getTotalBalance().toFixed(2));
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
  displayTotalBalance();
  setListenerOnButton();
}

document.onload = onPageLoaded();