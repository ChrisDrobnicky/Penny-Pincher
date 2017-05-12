function addAccountToDom (name, balance){
  var accountList = document.querySelector('#accountList');
  var accountID = manageLocalStorage.getAccountID();
  var newListItem = document.createElement('li');
  var newAccountName = document.createElement('span');
  var newAccountBalance = document.createElement('span');
  var deleteButton = document.createElement('button');
  var deleteIcon = document.createElement('span');
  newListItem.classList.add('account-list__item');
  newListItem.setAttribute('id', accountID);
  newAccountName.textContent = name;
  newAccountName.classList.add('account-list__name');
  newAccountBalance.textContent = balance;
  newAccountBalance.classList.add('account-list__balance');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-remove', 'account-list__button');
  deleteIcon.classList.add('glyphicon', 'glyphicon-minus');
  deleteButton.addEventListener('click', removeAccount, false);

  deleteButton.appendChild(deleteIcon);
  newListItem.appendChild(newAccountName);
  newListItem.appendChild(newAccountBalance);
  newListItem.appendChild(deleteButton);
  accountList.appendChild(newListItem);
}

function removeAccountFromDom (listItem){
  listItem.parentNode.removeChild(listItem);
}

function checkInput (accountName, accountBalance){
  var outputDiv = document.querySelector('#outputDiv');
  if (accountName.length === 0 || accountBalance.length === 0) {
    outputDiv.classList.add('alert', 'alert-danger');
    outputDiv.innerHTML = '<strong>Error in your form:</strong> Please enter the gaps';
    return false;
  } else if (isNaN(accountBalance)){
    outputDiv.classList.add('alert', 'alert-danger');
    outputDiv.innerHTML = '<strong>Error in your form:</strong> Your balance must be a number - e.g. 0.00';
    return false;
  } else {
    outputDiv.classList.remove('alert', 'alert-danger');
    outputDiv.textContent = '';
    return true;
  }
}

function clearFormInputs () {
  var nameInput = document.querySelector('#account-name');
  var balanceInput = document.querySelector('#account-balance');
  nameInput.value = '';
  balanceInput.value = '';
}

function saveAccount() {
  var accountName = document.querySelector('#account-name').value;
  var accountBalance = document.querySelector('#account-balance').value;
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

function onPageLoaded() {
  var addButton = document.querySelector('#add-button');
  addButton.addEventListener('click', saveAccount, false);
  getAccountsFromStorage();
  if (localStorage.getItem('accountID')=== null ) {
    manageLocalStorage.generateAccountID();
  }
}

document.onload = onPageLoaded();
