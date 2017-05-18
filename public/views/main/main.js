function displayAccountsInDOM(name, balance) {
  var $accountList = $('#accountList');
  var $accountDetails = $(document.createElement('div'));
  var $accountName = $(document.createElement('div'));
  var $accountBalance = $(document.createElement('div'));

  $accountDetails.addClass('pp-account-details panel panel-success');
  $accountName.addClass('panel-heading');
  $accountBalance.addClass('pp-account-balance panel-body');

  $accountName.text(name);
  $accountBalance.text(balance);

  $accountDetails.append($accountName);
  $accountDetails.append($accountBalance);
  $accountList.append($accountDetails);
}

function displayTotalBalance() {
  var $totalBalance = $('#totalBalance');
  $totalBalance.text(manageLocalStorage.getTotalBalance().toFixed(2));
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
  getTotalBalance();
}

document.onload = onPageLoaded();