function addAccountToForm(accountName) {
  var $accountPicker = $('#account');
  var $accountToSelect = $(document.createElement('option'));

  $accountToSelect.text(accountName);
  $accountPicker.append($accountToSelect);
}

function onPageLoaded() {
  manageLocalStorage.getAccountsNames();
}

document.onload = onPageLoaded();
