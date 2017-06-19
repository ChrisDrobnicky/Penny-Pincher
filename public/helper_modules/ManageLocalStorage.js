var manageLocalStorage = (function() {

  function addAccount(name, balance, id) {
    var currentAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    var accountToAdd = { name: name, balance: balance, id: id, transactions: [] };
    currentAccounts.push(accountToAdd);
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
  }

  function removeAccount(id) {
    var savedAccounts = localStorage.getItem('accounts');
    var currentAccounts = JSON.parse(savedAccounts);
    if (savedAccounts !== null) {
      var accountsToSave = currentAccounts.filter(function(item) {
        return item.id !== id;
      });
      currentAccounts = accountsToSave;
      localStorage.setItem('accounts', JSON.stringify(accountsToSave));
    }
    if (currentAccounts.length === 0) {
      localStorage.setItem('accountID', 1);
    }
  }

  function removeCategory(id) {
    var savedCategories = localStorage.getItem('categories');
    var currentCategories = JSON.parse(savedCategories);
    if (savedCategories !== null) {
      var categoriesToSave = currentCategories.filter(function(item) {
        return Number(item.id) !== Number(id);
      });
      currentCategories = categoriesToSave;
      localStorage.setItem('categories', JSON.stringify(categoriesToSave));
    }
    if (currentCategories.length === 0) {
      localStorage.setItem('categoryID', 10);
    }
  }

  function getAllAccounts(){
    var savedAccounts = localStorage.getItem('accounts');
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        var retrievedName = listOfAccounts[i].name;
        var retrievedBalance = listOfAccounts[i].balance;
        addAccountToDom(retrievedName, retrievedBalance);
      }
    }
  }

  function getAllCategories() {
    var savedCategories = localStorage.getItem('categories');
    var listOfCategories = JSON.parse(savedCategories);
    if (listOfCategories === null || (listOfCategories && listOfCategories.length === 0)) {
      listOfCategories = [
        {id: 1, isExpense: true, name: 'rent&bills'},
        {id: 2, isExpense: true, name: 'food'},
        {id: 3, isExpense: true, name: 'entertainment'},
        {id: 4, isExpense: true, name: 'car'},
        {id: 5, isExpense: true, name: 'clothes'},
        {id: 6, isExpense: true, name: 'sports'},
        {id: 7, isExpense: false, name: 'salary'},
        {id: 8, isExpense: false, name: 'lottery wins'},
        {id: 9, isExpense: false, name: 'rent'},
      ]
      localStorage.setItem('categories', JSON.stringify(listOfCategories));
    }
    for (var i = 0; i < listOfCategories.length; i++) {
      var currentCategory = listOfCategories[i];
      if (listOfCategories[i].isExpense === true) {
        addExpenseToDOM(currentCategory.name, currentCategory.id);
      } else {
        addIncomeToDOM(currentCategory.name, currentCategory.id);
      }
    }
  }

  function generateAccountID() {
    var existingAccountID = localStorage.getItem('accountID');
    var updateAccountID;
    if (existingAccountID) {
      existingAccountID = Number(existingAccountID);
      updateAccountID = existingAccountID + 1;
    } else {
      updateAccountID = 1;
    }
    localStorage.setItem('accountID', updateAccountID);
  }

  function getAccountID() {
    return localStorage.getItem('accountID');
  }

  function getCategoryID () {
    return localStorage.getItem('categoryID');
  }

  function generateCategoryID() {
    var existingCategoryID = localStorage.getItem('categoryID');
    var updateCategoryID;
    if (existingCategoryID) {
      existingCategoryID = Number(existingCategoryID);
      updateCategoryID = existingCategoryID + 1;
    } else {
      updateCategoryID = 10;
    }
    localStorage.setItem('categoryID', updateCategoryID);
  }

  function saveCategory(name, isExpense) {
    var currentCategories = JSON.parse(localStorage.getItem('categories')) || [];
    var categoryID = localStorage.getItem('categoryID');
    var categoryToAdd = { name: name, isExpense: isExpense, id: categoryID};
    currentCategories.push(categoryToAdd);
    localStorage.setItem('categories', JSON.stringify(currentCategories));
    generateCategoryID();
    return categoryToAdd;
  }

  function displayAccounts() {
    if (!localStorage.getItem('accounts')) {
      return false;
    } else {
      var listOfAccounts = JSON.parse(localStorage.getItem('accounts'));
      for (var i = 0; i < listOfAccounts.length; i++) {
        var retrievedName = listOfAccounts[i].name;
        var retrievedBalance = listOfAccounts[i].balance;
        var retrievedID = listOfAccounts[i].id;
        displayAccountsInDOM(retrievedName, retrievedBalance, retrievedID);
      }
    }
  }

  function getTotalBalance() {
    if (!localStorage.getItem('accounts')) {
      return false;
    } else {
      var totalBalance = 0;
      var listOfAccounts = JSON.parse(localStorage.getItem('accounts'));
      for (var i = 0; i < listOfAccounts.length; i++) {
        var accountBalance = parseFloat(listOfAccounts[i].balance);
        totalBalance = totalBalance + accountBalance;
      }
      return totalBalance;
    }
  }

  function getAccountsToForm() {
    var savedAccounts = localStorage.getItem('accounts');
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        var accountName = listOfAccounts[i].name;
        var accountID = listOfAccounts[i].id;
        addAccountsToForm(accountName, accountID);
      }
    }
  }


  function getListOfCategories(isExpense) {
    var savedCategories = localStorage.getItem('categories');
    var listOfCategories;
    if (savedCategories) {
      listOfCategories = JSON.parse(savedCategories).filter(function(n){return n.isExpense=== isExpense});
      return listOfCategories;
    }
  }

  function addTransaction(title, date, categoryID, accountID, amount) {
    var currentAccounts = JSON.parse(localStorage.getItem('accounts'));
    var amountToAdd;
    var transactionToAdd;
    var accountBalance;
    var isExpense = manageLocalStorage.getIsExpenseTransaction();
    if (isExpense === 'true') {
      amountToAdd = -Math.abs(Number(amount.toFixed(2)));
    } else {
      amountToAdd = Number(amount.toFixed(2));
    }
    transactionToAdd = { title: title, date: date, categoryID: Number(categoryID), amount: amountToAdd, isExpense: isExpense };

    for (var i = 0; i < currentAccounts.length; i++) {
      if (currentAccounts[i].id === accountID) {
        currentAccounts[i].transactions.push(transactionToAdd);
        accountBalance = parseFloat(currentAccounts[i].balance);
        accountBalance += amountToAdd;
        currentAccounts[i].balance = accountBalance;
        }
      }
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
  }

  function updateAccountBalance (isExpense, accountID, amount) {
    var currentAccounts = JSON.parse(localStorage.getItem('accounts'));
    var newBalance;
    for (var i = 0; i < currentAccounts.length; i++) {
      if (currentAccounts[i].id === accountID && isExpense === true) {
        var accountBalance = parseFloat(currentAccounts[i].balance);
        newBalance = accountBalance - amount;
        currentAccounts[i].balance = newBalance;
      } else if (currentAccounts[i].id === accountID && isExpense === false) {
        var accountBalance = parseFloat(currentAccounts[i].balance);
        newBalance = accountBalance + amount;
        currentAccounts[i].balance = newBalance;
      }
    }
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
  }

  function saveClickedAccountID(clickedAccountID) {
    localStorage.setItem('clickedAccountID', clickedAccountID);
  }

  function getClickedAccountID() {
    return localStorage.getItem('clickedAccountID');
  }

  function getClickedAccountName() {
    var savedAccounts = localStorage.getItem('accounts');
    var clickedID = manageLocalStorage.getClickedAccountID();
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        if (listOfAccounts[i].id === clickedID) {
          return listOfAccounts[i].name;
        }
      }
    }
  }

  function getClickedAccountBalance() {
    var savedAccounts = localStorage.getItem('accounts');
    var clickedID = manageLocalStorage.getClickedAccountID();
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        if (listOfAccounts[i].id === clickedID) {
          return parseFloat(listOfAccounts[i].balance);
        }
      }
    }
  }

  function getCategory(categoryID) {
    var savedCategories = localStorage.getItem('categories');
    var categoryToGet;
    if (savedCategories) {
      categoryToGet = JSON.parse(savedCategories).filter(function (n) {
        return Number(n.id) === Number(categoryID);
      });
      return categoryToGet[0];
    }
  }

  function getTransactions() {
    var savedAccounts = localStorage.getItem('accounts');
    var clickedID = manageLocalStorage.getClickedAccountID();
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        if (listOfAccounts[i].id === clickedID) {
          return listOfAccounts[i].transactions;
        }
      }
    }
  }

  function setTransactionsToSort() {
    if (localStorage.getItem('allColumnsToSort')) {
      return;
    } else {
      var allColumnsToSort = [
        {column: 'categoryID', isDescending: true},
        {column: 'title', isDescending: true},
        {column: 'date', isDescending: true},
        {column: 'amount', isDescending: true}
      ];
      localStorage.setItem('allColumnsToSort', JSON.stringify(allColumnsToSort));
    }
  }

  function getIsDescendingValue(columnName) {
    var savedColumnsToSort = localStorage.getItem('allColumnsToSort');
    var updateColumnsToSort;
    var updateIsDescending;
    var checkIfDescending;
    if (savedColumnsToSort) {
      updateColumnsToSort = JSON.parse(savedColumnsToSort);
      for (var i = 0; i < updateColumnsToSort.length; i ++) {
        if (updateColumnsToSort[i].column === columnName) {
          checkIfDescending = updateColumnsToSort[i].isDescending;
          updateIsDescending = !checkIfDescending;
          updateColumnsToSort[i].isDescending = updateIsDescending;
        }
      }
      localStorage.setItem('allColumnsToSort',JSON.stringify(updateColumnsToSort));
      return updateIsDescending;
    }
  }

  function setIsExpenseTransaction(isExpense) {
    localStorage.setItem('isExpenseStatus', isExpense);
  }

  function getIsExpenseTransaction() {
    return localStorage.getItem('isExpenseStatus');
  }

  return {
    addAccount: addAccount,
    removeAccount: removeAccount,
    removeCategory: removeCategory,
    getAllAccounts: getAllAccounts,
    generateAccountID: generateAccountID,
    getAccountID: getAccountID,
    getCategoryID: getCategoryID,
    generateCategoryID: generateCategoryID,
    saveCategory: saveCategory,
    getAllCategories: getAllCategories,
    displayAccounts: displayAccounts,
    getTotalBalance: getTotalBalance,
    getAccountsToForm: getAccountsToForm,
    getListOfCategories: getListOfCategories,
    addTransaction: addTransaction,
    updateAccountBalance: updateAccountBalance,
    getTransactions: getTransactions,
    saveClickedAccountID: saveClickedAccountID,
    getClickedAccountID: getClickedAccountID,
    getClickedAccountName: getClickedAccountName,
    getCategory: getCategory,
    setTransactionsToSort: setTransactionsToSort,
    getIsDescendingValue: getIsDescendingValue,
    setIsExpenseTransaction: setIsExpenseTransaction,
    getIsExpenseTransaction: getIsExpenseTransaction,
    getClickedAccountBalance: getClickedAccountBalance
  }
})();