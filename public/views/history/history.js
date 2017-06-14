
function addTransactionsToDOM(category, title, date, amount, account) {
  var historyTableBody = document.querySelector('#historyTableBody');
  var accountName = document.querySelector('#accountName');
  accountName.textContent = account + ' - account history';
  var newRow = historyTableBody.insertRow();
  newRow.classList.add('pp-transaction-table-body__tr');

  var categoryCell = newRow.insertCell(0);
  var titleAndDateCell = newRow.insertCell(1);
  //var dateCell = newRow.insertCell(2);
  var amountCell = newRow.insertCell(2);

  categoryCell.innerHTML = category;
  categoryCell.classList.add('pp-transaction-table-body__td');

  titleAndDateCell.innerHTML = title + '</br>' + '<span class="pp-transaction-table-body__td--date">'
    + date + '</span>';
  titleAndDateCell.classList.add('pp-transaction-table-body__td');

  amountCell.innerHTML = amount;
  amountCell.classList.add('pp-transaction-table-body__td');
  if (amount < 0) {
    amountCell.classList.add('pp-transaction-table-body__td--amountMinus');
  } else {
    amountCell.classList.add('pp-transaction-table-body__td--amountPlus')
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


function onPageLoaded() {
  var currentListOfTransactions = manageLocalStorage.getTransactions();
  addAllTransactionsToDOM(currentListOfTransactions);
  manageLocalStorage.setTransactionsToSort();
  setListeners();
}

document.onload = onPageLoaded();