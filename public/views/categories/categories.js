function addExpenseToDOM(expense) {
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
  $expenseItem.append($newExpenseCategory);
  $expenseItem.append($deleteButton);
  $expenseList.append($expenseItem);
}

function addIncomeToDOM(income) {
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
  if (checkCategoryInput($expenseCategory.val()) === true) {
    addExpenseToDOM($expenseCategory.val());
    manageLocalStorage.saveCategory($expenseCategory.val(), true);
    clearFormInputs($expenseCategory.attr('id'));
  }
}

function saveIncomeCategory() {
  var $incomeCategory = $('#income-category');
  if (checkCategoryInput($incomeCategory.val()) === true) {
    addIncomeToDOM($incomeCategory.val());
    manageLocalStorage.saveCategory($incomeCategory.val(), false);
    clearFormInputs($incomeCategory.attr('id'));
  }
}

function removeCategory() {
  var $btn = $(this);
  var $categoryToRemove = $btn[0].parentNode;
  removeCategoryFromDOM($categoryToRemove);
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
}

document.onload = onPageLoaded();