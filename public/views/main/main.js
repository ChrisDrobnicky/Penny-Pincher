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

function getTotalBalance() {
  var $totalBalance = $('#totalBalance');
  var balanceFromAccounts = 0;
  var allAccounts = document.getElementsByClassName('pp-account-balance');
    for(var i = 0; i < allAccounts.length; i++) {
      balanceFromAccounts = balanceFromAccounts + parseFloat(allAccounts[i].textContent);
    }
  $totalBalance.text(balanceFromAccounts.toFixed(2));
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
  getTotalBalance();
}

document.onload = onPageLoaded();