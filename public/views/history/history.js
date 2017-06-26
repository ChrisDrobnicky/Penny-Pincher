
function addTransactionsToDOM(category, title, date, amount, account) {
  var historyTableBody = document.querySelector('#historyTableBody');
  var accountName = document.querySelector('#accountName');
  accountName.textContent = account.toUpperCase() + ' - ACCOUNT BALANCE';
  var newRow = historyTableBody.insertRow();
  newRow.classList.add('pp-table__tr');

  var categoryCell = newRow.insertCell(0);
  var titleAndDateCell = newRow.insertCell(1);
  var amountCell = newRow.insertCell(2);

  categoryCell.innerHTML = category;
  categoryCell.classList.add('pp-table__td--category');

  titleAndDateCell.innerHTML = title + '</br>' + '<span class="pp-table__td--date">'
    + date + '</span>';
  titleAndDateCell.classList.add('pp-table__td--titledate');

  amountCell.innerHTML = amount;
  amountCell.classList.add('pp-table__td--amount');
  if (amount < 0) {
    amountCell.classList.add('pp-table__td--amountMinus');
  } else {
    amountCell.classList.add('pp-table__td--amountPlus')
  }

  historyTableBody.appendChild(newRow);
}


function addAllTransactionsToDOM(listOfTransactions) {
  for (var j = 0; j < listOfTransactions.length; j++) {
    var transactionCategoryID = listOfTransactions[j].categoryID;
    var transactionTitle = listOfTransactions[j].title;
    var transactionDate = listOfTransactions[j].date;
    var transactionAmount = listOfTransactions[j].amount;
    var transactionCategoryName = manageLocalStorage.getCategory(transactionCategoryID).name;
    var accountName = manageLocalStorage.getClickedAccountName();
    addTransactionsToDOM(transactionCategoryName, transactionTitle, transactionDate, transactionAmount, accountName);
  }
}

function setListeners() {
  var amountSorter = document.querySelector('#amountSorter');
  amountSorter.addEventListener('click', function() {
    sortByNumber('amount');
  }, false);

  var categorySorter = document.querySelector('#categorySorter');
  categorySorter.addEventListener('click', function() {
    sortByNumber('categoryID');
  }, false);

  var dateSorter = document.querySelector('#dateSorter');
  dateSorter.addEventListener('click', sortByDate, false);

  var titleSorter = document.querySelector('#titleSorter');
  titleSorter.addEventListener('click', sortByTitle, false);
}

function sortByNumber(propertyName) {
  var isDescending = manageLocalStorage.getIsDescendingValue(propertyName);
  var historyTableBody = document.querySelector('#historyTableBody');
  var currentList = manageLocalStorage.getTransactions();
  var sortedTransactions;
  historyTableBody.innerHTML = '';
  if (isDescending) {
    sortedTransactions = currentList.sort(function(a, b) {
      return b[propertyName] - a[propertyName]
    })
  } else {
    sortedTransactions = currentList.sort(function(a, b) {
      return a[propertyName] - b[propertyName]
    })
  }
  addAllTransactionsToDOM(sortedTransactions);
}

function sortByDate() {
  var isDescending = manageLocalStorage.getIsDescendingValue('date');
  var historyTableBody = document.querySelector('#historyTableBody');
  var currentList = manageLocalStorage.getTransactions();
  var sortedTransactions;
  historyTableBody.innerHTML = '';
  if (isDescending) {
    sortedTransactions = currentList.sort(function(a, b) {
      return new Date(b.date) - new Date(a.date)
    })
  } else {
    sortedTransactions = currentList.sort(function(a, b) {
      return new Date(a.date) - new Date(b.date)
    })
  }
  addAllTransactionsToDOM(sortedTransactions);
}

function sortByTitle() {
  var isDescending = manageLocalStorage.getIsDescendingValue('title');
  var historyTableBody = document.querySelector('#historyTableBody');
  var currentList = manageLocalStorage.getTransactions();
  var sortedTransactions;
  historyTableBody.innerHTML = '';
  if (isDescending) {
    sortedTransactions = currentList.sort(function(a, b) {
      return a.title.localeCompare(b.title);
    })
  } else {
    sortedTransactions = currentList.sort(function(a, b) {
      return b.title.localeCompare(a.title);
    })
  }
  addAllTransactionsToDOM(sortedTransactions);
}

function displayAccountBalance() {
  var accountID = manageLocalStorage.getClickedAccountID();
  var $accountBalance = $('#accountBalance');
  $accountBalance.text(manageLocalStorage.getClickedAccountBalance(accountID).toFixed(2) + ' PLN');
}

function onPageLoaded() {
  var currentListOfTransactions = manageLocalStorage.getTransactions();
  displayAccountBalance();
  addAllTransactionsToDOM(currentListOfTransactions);
  manageLocalStorage.setTransactionsToSort();
  setListeners();
}

document.onload = onPageLoaded();