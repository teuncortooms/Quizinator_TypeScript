function openSidebar() {
  let html = HtmlService.createTemplateFromFile('client/sidebar').evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setTitle("Quizinator for Google Sheets");
  SpreadsheetApp.getUi().showSidebar(html);
}

function getUniqueUnitsFromSheet() {
  return (new SpreadsheetHandler).Units;
}

function createExampleSheetAndUpdateSidebar() {
  let spreadsheet = new SpreadsheetHandler();
  spreadsheet.createExampleSheet();
  return spreadsheet.Units;
}

function getExerciseTypesWithDescriptions() {
  return ExerciseFactory.Descriptions;
}

// function button_previewQuiz_click(formObject: any) {
//   let mainController = new QuizDesigner();
//   mainController.Init(formObject);
//   mainController.previewQuiz();
// }

function createAndPreviewQuiz(formObject: any) {
  let input = new UserInputConverter(formObject);
  let idiomsManager = new IdiomsManager();
  let quiz = new Quiz();
  let quizDesigner = new QuizDesigner();
  idiomsManager.Init(input.Units, input.TotalSize, new SpreadsheetHandler());
  quiz.Init(input.Title, input.ExerciseTypes, input.ExerciseSizes, idiomsManager.SelectedIdioms);
  quizDesigner.Init(quiz, idiomsManager);

  openPreview(quiz);
}