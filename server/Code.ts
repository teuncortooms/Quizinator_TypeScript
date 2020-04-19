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
  let html = HtmlService.createTemplateFromFile('client/sidebar').evaluate()
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
  return mainController.IdiomsStore.AvailableIdioms;
}

function dropDown_item_select(exerciseIndex: number, itemIndex: number, idiomId: number) {
  let mainController = new MainController;
  mainController.Load();
  mainController.ReplaceItem(exerciseIndex, itemIndex, idiomId);
  return mainController.Quiz;
}

function button_createDoc_click(formObject: any) {
  let mainController = new MainController;
  mainController.Load();
  mainController.CreateQuizDocs(formObject);
}

function button_createForm_click(formObject: any) {
  let mainController = new MainController;
  mainController.Load();
  mainController.CreateQuizForm(formObject);
}