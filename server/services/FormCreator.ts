// SET ANSWER FOR TEXTITEM VIA SCRIPT NOT YET AVAILABLE IN FORM API

class FormCreator {
    private form: any;

    public get QuizForm() { return this.form }

    public Generate(quiz: Quiz) {
        this.form = this.createForm(quiz);
        this.openSuccessDialog();
    }

    private createForm(quiz: Quiz) {
        let name = quiz.Title;
        let form = FormApp.create(name);

        form.setTitle(name).setDescription("Good luck!").setIsQuiz(true)
            .setLimitOneResponsePerUser(true).setCollectEmail(true);

        // for every exercise
        for (let i = 0; i < quiz.Exercises.length - 1; i++) {
            // add header
            let header = form.addSectionHeaderItem();
            header.setTitle(quiz.Exercises[i].Description);

            // add box
            if (quiz.Exercises[i].Box) {
                form.addSectionHeaderItem().setTitle(quiz.Exercises[i].Box[0][0]);
            }

            // add questions
            let questions = quiz.Exercises[i].Questions;
            for (let j = 0; j < questions.length; j++) {
                let question = form.addTextItem();
                if (quiz.Exercises[i].Type != 'A') {
                    question.setPoints(1).setRequired(true).setTitle(questions[j].QuestionText);
                }
                else {
                    // remove <u> and </u>
                    let questionText = questions[j].QuestionText;
                    let findMe = "<u>(.*?)<\/u>";
                    let questionTextNew = questionText.replace(findMe, "");  // NOT WORKING
                    question.setPoints(1).setRequired(true).setTitle(questionTextNew);
                    question.setHelpText("(" + questions[j].Word + ")");
                }
            }
        }
        return form;
    }

    private openSuccessDialog() {
        let successMessage = HtmlService.createHtmlOutput(''
            + 'Quiz Form successfully created. Click the link.<br><br>'
            + 'Your quiz: <a target=_new href="' + this.form.getPublishedUrl() + '">'
            + this.form.getTitle() + '</a>');
        SpreadsheetApp.getUi().showModalDialog(successMessage, 'Success');
    }
}