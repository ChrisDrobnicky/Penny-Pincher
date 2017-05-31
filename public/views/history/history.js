
function addTransactionsToDOM(category, title, date, amount) {
  var historyTableBody = document.querySelector('#historyTableBody');
  var newRow = historyTableBody.insertRow();

  var categoryCell = newRow.insertCell(0);
  var titleCell = newRow.insertCell(1);
  var dateCell = newRow.insertCell(2);
  var amountCell = newRow.insertCell(3);

  categoryCell.innerHTML = category;
  titleCell.innerHTML = title;
  dateCell.innerHTML = date;
  amountCell.innerHTML = amount;

  newRow.classList.add('info');

  historyTableBody.appendChild(newRow);
}

function onPageLoaded() {
  manageLocalStorage.getTransactions();
}

document.onload = onPageLoaded();