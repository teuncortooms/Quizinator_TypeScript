// SET ANSWER FOR TEXTITEM VIA SCRIPT NOT YET AVAILABLE IN FORM API

class QuizForm {
    private form: any;

    public get QuizForm() { return this.form }

    public Generate(quiz: Quiz) {
        this.form = this.createForm(quiz);
        this.openSuccessDialog();
    }

    private createForm(quiz: Quiz){
        let name = quiz.Title;
        let form = FormApp.create(name);

        form.setTitle(name).setDescription("Good luck!").setIsQuiz(true).setRequireLogin(true).setCollectEmail(true);

        // for every exercise
        for (let i = 0; i < quiz.Exercises.length - 1; i++) {
            // add header
            let header = form.addSectionHeaderItem();
            header.setTitle(quiz.Exercises[i].Description);

            // add box
            if (quiz.Exercises[i].Box) {
                form.addSectionHeaderItem().setTitle(quiz.Exercises[i].Box[0][0]);
            }

            // add items
            let items = quiz.Exercises[i].ExerciseItems;
            for (let j = 0; j < items.length; j++) {
                let item = form.addTextItem();
                item.setPoints(1).setRequired(true).setTitle(items[j].Question);
                if (quiz.Exercises[i].Type == 'A') {
                    item.setHelpText("(" + items[j].Word + ")");
                }
            }
        }
        return form;
    }

    private openSuccessDialog() {
        let successMessage = HtmlService.createHtmlOutput(''
            + 'Quiz Form successfully created. Click the link.<br><br>'
            + 'Your quiz: <a target=_new href="' + this.form.getPublishedUrl() + '">'
            + this.form.getName() + '</a>');
        SpreadsheetApp.getUi().showModalDialog(successMessage, 'Success');
    }
}