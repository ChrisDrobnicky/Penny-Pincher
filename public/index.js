function storeAccounts (){
  var accounts = [];
  localStorage.setItem('accounts',JSON.stringify(accounts));
}

if (localStorage.getItem("accounts") === null) {
  storeAccounts();
  window.location.replace("./views/accounts/accounts.template.html");
} else {
  window.location.replace("./views/main/main.template.html");
}


