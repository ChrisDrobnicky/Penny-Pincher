/**
 * Created by coding on 2017-04-15.
 */

function storeAccounts (){
  var accounts = [];
  localStorage.setItem('accounts',JSON.stringify(accounts));
}

if (localStorage.getItem("accounts") === null) {
  window.location.replace("./views/accounts/accounts.template.html");
  storeAccounts();
} else{
  window.location.replace("./views/main/main.template.html");
}


