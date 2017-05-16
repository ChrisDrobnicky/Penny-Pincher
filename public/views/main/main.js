function displayToFirstColumn(name, balance) {
  var $accountsList = $('#accountList1');
  var $newListItem = $(document.createElement('li'));
  var $AccountName = $(document.createElement('span'));
  var $AccountBalance = $(document.createElement('span'));

  $newListItem.addClass('pp-account-list__item');
  $AccountName.text(name).addClass('pp-account-list__name');
  $AccountBalance.text(balance).addClass('pp-account-list__balance');

  $newListItem.append($AccountName);
  $newListItem.append($AccountBalance);
  $accountsList.append($newListItem);
}

function displayToSecondColumn(name, balance) {
  var $accountsList = $('#accountList2');
  var $newListItem = $(document.createElement('li'));
  var $AccountName = $(document.createElement('span'));
  var $AccountBalance = $(document.createElement('span'));

  $newListItem.addClass('pp-account-list__item');
  $AccountName.text(name).addClass('pp-account-list__name');
  $AccountBalance.text(balance).addClass('pp-account-list__balance');

  $newListItem.append($AccountName);
  $newListItem.append($AccountBalance);
  $accountsList.append($newListItem);
}

function onPageLoaded() {
  manageLocalStorage.displayAccounts();
}

document.onload = onPageLoaded();