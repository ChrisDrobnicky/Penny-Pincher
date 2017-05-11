var manageLocalStorage = (function() {

  function addAccount(name, balance) {
    var currentAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    var accountToAdd = { name: name, balance: balance };
    currentAccounts.push(accountToAdd);
    localStorage.setItem('accounts', JSON.stringify(currentAccounts));
  }

  function removeAccount (name, balance) {
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

  function addCategory (id, name, isExpense){
    var currentCategories = JSON.parse(localStorage.getItem('categories')) || [];
    var categoryToAdd = { id: id, name: name, isExpense: isExpense };
    currentCategories.push(categoryToAdd);
    localStorage.setItem('categories', JSON.stringify(currentCategories));
  }

  return {
    addAccount: addAccount,
    removeAccount: removeAccount,
    getAllAccounts: getAllAccounts
  }
})();