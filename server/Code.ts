function onOpen() {
  // Add a custom menu
  SpreadsheetApp.getUi().createAddonMenu()
    .addItem('Open Sidebar', 'menuItem_openSidebar_click')
    .addToUi();
}

function onInstall() {
  onOpen();
}

function menuItem_openSidebar_click() {
  var html = HtmlService.createTemplateFromFile('client/sidebar').evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Cot's Quizinator");
  SpreadsheetApp.getUi().showSidebar(html);
}

function sidebar_loadUnits() {
  let mainController = new MainController;
  return mainController.getUnitsFromSpreadsheet();
}

function button_previewQuiz_click(formObject: any) {
  let mainController = new MainController;
  mainController.Init(formObject);
  mainController.previewQuiz();
}

function button_changeItem_click() {
  let mainController = new MainController;
  mainController.Load();
  Logger.log("available:");
  Logger.log(mainController.IdiomsStore.AvailableIdioms);
  return mainController.IdiomsStore.AvailableIdioms;
}

function dropDown_items_onChange(exerciseIndex: number, itemIndex: number, idiomId: number) {
  let mainController = new MainController;
  mainController.Load();
  return mainController.ReplaceItem(exerciseIndex, itemIndex, idiomId);
}
