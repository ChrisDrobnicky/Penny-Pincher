var manageLocalStorage = (function() {

  function addAccount(name, balance, id) {
    var currentAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    var accountToAdd = { name: name, balance: balance, id: id };
    currentAccounts.push(accountToAdd);
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
  }

  function removeAccount (name, balance, id) {
    var savedAccounts = localStorage.getItem('accounts');
    //var accountToRemove = {name: name, balance: balance};
    if (savedAccounts !== null) {
      var currentAccounts = JSON.parse(savedAccounts);
      var accountsToSave = currentAccounts.filter(function(item) {
        return item.name !== name;
      });
      localStorage.setItem('accounts', JSON.stringify(accountsToSave));
    }
  }

  function getAllAccounts (){
    var savedAccounts = localStorage.getItem('accounts');
    var listOfAccounts;
    if (savedAccounts) {
      listOfAccounts = JSON.parse(savedAccounts);
      for (var i = 0; i < listOfAccounts.length; i++) {
        var retrievedName = listOfAccounts[i].name;
        debugger;
        var retrievedBalance = listOfAccounts[i].balance;
        addAccountToDom(retrievedName, retrievedBalance);
      }
    }
  }

  function generateID () {
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
    generateID: generateID
  }
})();