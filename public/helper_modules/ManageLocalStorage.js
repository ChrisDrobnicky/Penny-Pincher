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
/* not used yet:
  function getAccountsNumber() {
    if (!localStorage.getItem('accounts')) {
      return false
    }
    return JSON.parse(localStorage.getItem('accounts')).length;
  } */

  function displayAccounts() {
    var listOfAccounts = JSON.parse(localStorage.getItem('accounts'));
    for (var i = 0; i < listOfAccounts.length; i++) {
      var retrievedName = listOfAccounts[i].name;
      var retrievedBalance = listOfAccounts[i].balance;
      if (i <= 2) {
        displayToFirstColumn(retrievedName, retrievedBalance);
      } else {
        displayToSecondColumn(retrievedName, retrievedBalance);
      }
    }
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
    /*getAccountsNumber: getAccountsNumber, */
    displayAccounts: displayAccounts
  }
})();