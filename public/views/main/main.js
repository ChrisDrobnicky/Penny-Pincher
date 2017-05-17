function displayAccountsInDOM(name, balance) {
  var $accountList = $('#accountList');
  var $accountDetails = $(document.createElement('div'));
  var $accountName = $(document.createElement('div'));
  var $accountBalance = $(document.createElement('div'));

  $accountDetails.addClass('pp-account-details panel panel-success');
  $accountName.addClass('panel-heading');
  $accountBalance.addClass('panel-body');

  $accountName.text(name);
  $accountBalance.text(balance);

  $accountDetails.append($accountName);
  $accountDetails.append($accountBalance);
  $accountList.append($accountDetails);
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
}

document.onload = onPageLoaded();