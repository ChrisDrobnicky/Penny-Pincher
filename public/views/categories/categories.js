function addExpenseToDOM(expense, id) {
  var $expenseList = $('#expenseList');
  var $expenseItem = $(document.createElement('li'));
  var $newExpenseCategory = $(document.createElement('span'));
  var $deleteButton = $(document.createElement('button'));
  var $deleteIcon = $(document.createElement('span'));

  $expenseItem.addClass('pp-categories-list__item');
  $deleteButton.addClass('btn btn-danger btn-remove pp-categories-list__button');
  $newExpenseCategory.addClass('pp-categories-list__name');
  $deleteIcon.addClass('glyphicon glyphicon-minus');

  $deleteButton.append($deleteIcon);
  $deleteButton.click(removeCategory);
  $newExpenseCategory.text(expense);
  $expenseItem.attr('id', id);
  $expenseItem.append($newExpenseCategory);
  $expenseItem.append($deleteButton);
  $expenseList.append($expenseItem);
}

function addIncomeToDOM(income, id) {
  var $incomeList = $('#incomeList');
  var $incomeItem = $(document.createElement('li'));
  var $newIncomeCategory = $(document.createElement('span'));
  var $deleteButton = $(document.createElement('button'));
  var $deleteIcon = $(document.createElement('span'));

  $incomeItem.addClass('pp-categories-list__item');
  $deleteButton.addClass('btn btn-danger btn-remove pp-categories-list__button');
  $newIncomeCategory.addClass('pp-categories-list__name');
  $deleteIcon.addClass('glyphicon glyphicon-minus');

  $deleteButton.append($deleteIcon);
  $deleteButton.click(removeCategory);
  $newIncomeCategory.text(income);
  $incomeItem.attr('id', id);
  $incomeItem.append($newIncomeCategory);
  $incomeItem.append($deleteButton);
  $incomeList.append($incomeItem);
}

function checkCategoryInput(inputToCheck) {
  var $alertForUser = $('#alertForUser');
  if (inputToCheck.length === 0) {
    $alertForUser.addClass('alert alert-danger');
    $alertForUser.html('<strong>Error:</strong> Please enter category');
    return false;
  } else {
    $alertForUser.removeClass('alert alert-danger');
    $alertForUser.text('');
    return true;
  }
}

function clearFormInputs(elementID) {
  var $inputToClear = $('#' + elementID);
  $inputToClear.val('');
}

function saveExpenseCategory() {
  var $expenseCategory = $('#expense-category');
  var currentCategoryID = manageLocalStorage.getCategoryID();
  if (checkCategoryInput($expenseCategory.val()) === true) {
    addExpenseToDOM($expenseCategory.val(), currentCategoryID);
    manageLocalStorage.saveCategory($expenseCategory.val(), true);
    clearFormInputs($expenseCategory.attr('id'));
  }
}

function saveIncomeCategory() {
  var $incomeCategory = $('#income-category');
  var currentCategoryID = manageLocalStorage.getCategoryID();
  if (checkCategoryInput($incomeCategory.val()) === true) {
    addIncomeToDOM($incomeCategory.val(), currentCategoryID);
    manageLocalStorage.saveCategory($incomeCategory.val(), false);
    clearFormInputs($incomeCategory.attr('id'));
  }
}

function removeCategory() {
  debugger;
  var $btn = $(this);
  var categoryToRemove = $btn[0].parentNode;
  var categoryID = categoryToRemove.id;
  removeCategoryFromDOM(categoryToRemove);
  manageLocalStorage.removeCategory(categoryID);
}

function removeCategoryFromDOM(category) {
  $(category).remove();
}

function onPageLoaded() {
  var $addExpenseButton = $('#add-expenseButton');
  var $addIncomeButton = $('#add-incomeButton');
  $addExpenseButton.click(saveExpenseCategory);
  $addIncomeButton.click(saveIncomeCategory);
  if (localStorage.getItem('categoryID')=== null ) {
    manageLocalStorage.generateCategoryID();
  }
  manageLocalStorage.getAllCategories();
}

document.onload = onPageLoaded();