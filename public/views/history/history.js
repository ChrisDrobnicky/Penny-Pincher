
function addTransactionsToDOM(category, title, date, amount, account) {
  var historyTableBody = document.querySelector('#historyTableBody');
  var accountName = document.querySelector('#accountName');
  accountName.textContent = account + ' - account history';
  var newRow = historyTableBody.insertRow();
  newRow.classList.add('info');

  var categoryCell = newRow.insertCell(0);
  var titleCell = newRow.insertCell(1);
  var dateCell = newRow.insertCell(2);
  var amountCell = newRow.insertCell(3);

  categoryCell.innerHTML = category;
  titleCell.innerHTML = title;
  dateCell.innerHTML = date;
  amountCell.innerHTML = amount;

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
  var amountHeader = document.querySelector('#amountHeader');
  amountHeader.addEventListener('click', sortByAmount, false);
}

function sortByAmount() {
  var isDescending = manageLocalStorage.getIsDescendingValue('amount');
  var historyTableBody = document.querySelector('#historyTableBody');
  var currentList = manageLocalStorage.getTransactions();
  var sortedTransactions;
  historyTableBody.innerHTML = '';
  if (isDescending) {
    sortedTransactions = currentList.sort(function(a, b) {
      return b.amount - a.amount
    })
  } else {
    sortedTransactions = currentList.sort(function(a, b) {
      return a.amount - b.amount
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