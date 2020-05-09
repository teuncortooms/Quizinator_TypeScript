function openPreview(quiz: Quiz) {
  let template = HtmlService.createTemplateFromFile('client/preview')
  template.quiz = quiz;
  let html = template.evaluate()
    .setWidth(800)
    .setHeight(2000);
  SpreadsheetApp.getUi().showModalDialog(html, 'Preview');
}

function button_changeQuestion_click() {
  let designer = new QuizDesigner;
  designer.Load();
  return designer.IdiomsManager.AvailableIdioms;
}

function dropDown_idiom_select(exerciseIndex: number, questionIndex: number, idiomId: number) {
  let designer = new QuizDesigner;
  designer.Load();
  designer.ReplaceQuestion(exerciseIndex, questionIndex, idiomId);
  return designer.Quiz;
}

function button_createDoc_click(formObject: any) {
  let quiz = new Quiz();
  quiz.Load(new CacheHelper());
  let docs = new DocsCreator(formObject);
  docs.Generate(quiz);
}

function button_createForm_click() {
  let quiz = new Quiz();
  quiz.Load(new CacheHelper());
  let form = new FormCreator();
  form.Generate(quiz);

  mainController.Load();
  mainController.CreateQuizForm();
}