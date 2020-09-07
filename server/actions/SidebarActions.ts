function openSidebar() {
  let presenter = new Presenter;
  presenter.ShowSidebar(new AppSettings);
}

function getUniqueUnitsFromSheet() {
  let context: SpreadsheetHandler = new SpreadsheetHandler();
  let repo: IdiomsRepository = new IdiomsRepository(context);
  return repo.GetUniqueUnits();
}

function createExampleSheetAndGetUniqueUnits() {
  let SSHandler: SpreadsheetHandler = new SpreadsheetHandler();
  SSHandler.createExampleSheet();
  let repo: IdiomsRepository = new IdiomsRepository(SSHandler);
  return repo.GetUniqueUnits();
}

function getExerciseTypesWithDescriptions() {
  return ExerciseFactory.Descriptions;
}

function createAndPreviewQuiz(formObject: FormData) {
  let input = new UserInputConverter(formObject);
  let idiomsManager = new IdiomsSupplier({
    units: input.Units,
    selectionSize: input.TotalSize,
    spreadsheetHandler: new SpreadsheetHandler()
  });
  let quiz = new Quiz({
    title: input.Title,
    exerciseTypes: input.ExerciseTypes,
    exerciseSizes: input.ExerciseSizes,
    idioms: idiomsManager.SelectedIdioms
  });
  let quizDesigner = new QuizDesigner({ quiz, idiomsManager });

  openPreview(quiz);
}