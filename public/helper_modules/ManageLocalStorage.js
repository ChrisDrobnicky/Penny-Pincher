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

  /*function addCategory (id, name, isExpense){
    var currentCategories = JSON.parse(localStorage.getItem('categories')) || [];
    var categoryToAdd = { id: id, name: name, isExpense: isExpense };
    currentCategories.push(categoryToAdd);
    localStorage.setItem('categories', JSON.stringify(currentCategories));
  }*/

  return {
    addAccount: addAccount,
    removeAccount: removeAccount,
    getAllAccounts: getAllAccounts,
    generateAccountID: generateAccountID,
    getAccountID: getAccountID
  }
})();