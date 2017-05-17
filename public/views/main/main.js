function displayAccountsInDOM(name, balance) {
  var $accountList = $('#accountList');
  var $accountContainer = $(document.createElement('div'));
  var $accountName = $(document.createElement('div'));
  var $accountBalance = $(document.createElement('div'));

  $accountContainer.addClass('pp-account panel panel-success');
  $accountName.addClass('panel-heading');
  $accountBalance.addClass('panel-body');

  $accountName.text(name);
  $accountBalance.text(balance);

  $accountContainer.append($accountName);
  $accountContainer.append($accountBalance);
  $accountList.append($accountContainer);
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
}

document.onload = onPageLoaded();