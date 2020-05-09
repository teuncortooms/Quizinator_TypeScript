class DocsCreator {
    private norm: number;
    private quizDoc: any;
    private answerKeyDoc: any;

    public get QuizDoc() { return this.quizDoc }
    public get AnswerKeyDoc() { return this.answerKeyDoc }

    public constructor(formObject: any) {
        this.setNorm(formObject.percentage, formObject.other_percentage);
    }

    public Generate(quiz: Quiz) {
        this.quizDoc = this.createDoc(quiz, "quiz");
        this.answerKeyDoc = this.createDoc(quiz, "key");
        this.openSuccessDialog();
    }

    private openSuccessDialog() {
        let successMessage = HtmlService.createHtmlOutput(''
            + 'Files successfully created. Click the links.<br><br>'
            + 'Your quiz: <a target=_blank href="' + this.QuizDoc.getUrl() + '">'
            + this.QuizDoc.getName() + '</a><br>'
            + 'Answer key: <a target=_blank href="' + this.AnswerKeyDoc.getUrl() + '">'
            + this.AnswerKeyDoc.getName() + '</a>');
        SpreadsheetApp.getUi().showModalDialog(successMessage, 'Success');
    }

    private setNorm(percentage: any, other_percentage: any) {
        if (percentage == 'other') {
            this.norm = Number(other_percentage);
        }
        else {
            this.norm = Number(percentage);
        }
    }

    private createDoc(quiz: Quiz, type: string) {
        let name = type == 'key' ? quiz.Title + " key" : quiz.Title;
        let doc = DocumentApp.create(name);
        let body = doc.getBody();
        let header = doc.addHeader();

        header.insertParagraph(0, "\n\nName: _______________________").setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
        body.insertParagraph(0, doc.getName()).setHeading(DocumentApp.ParagraphHeading.HEADING1);

        if (type == "key" && this.quizDoc) {
            body.appendParagraph("Link to SO").editAsText().setLinkUrl(this.quizDoc.getUrl()).appendText("\r");
        }

        // for every exercise
        for (let i = 0; i < quiz.Exercises.length; i++) {
            // add heading
            body.appendParagraph(quiz.Exercises[i].Description).setHeading(DocumentApp.ParagraphHeading.HEADING3)

            // add box
            if (quiz.Exercises[i].Box) {
                body.appendTable(quiz.Exercises[i].Box);
            }

            // add questions
            let questions = quiz.Exercises[i].Questions;
            let table = body.appendTable();
            let listId = null;
            for (let j = 0; j < questions.length; j++) {
                let row = table.appendTableRow();
                let cell1 = row.appendTableCell();
                let listItem = cell1.appendListItem(questions[j].QuestionText);
                if (listId == null) {
                    listId = listItem;
                }
                else {
                    listItem.setListId(listId);
                }
                listItem.getPreviousSibling().removeFromParent(); // removes empty paragraph from cell


                if (type == "quiz") {
                    // add empty cell for student answer
                    row.appendTableCell();
                }
                else if (type == "key") {
                    // add cell with answer
                    row.appendTableCell(quiz.Exercises[i].Questions[j].AnswerText);
                }

                table.setColumnWidth(0, 350);
            }

            // underline words if type A
            if (quiz.Exercises[i].Type == 'A') {
                // let findMe = "<\/u>";
                let findMe = "<u>(.*?)<\/u>";
                let foundElement = table.findText(findMe);
                while (foundElement != null) {
                    let foundText = foundElement.getElement().asText();
                    let start = foundElement.getStartOffset();
                    let end = foundElement.getEndOffsetInclusive();
                    foundText.setUnderline(start, end, true);
                    foundText.replaceText("<u>", "");
                    foundText.replaceText("<\/u>", "");
                    foundElement = body.findText(findMe, foundElement);
                    
                }
            }

        }
        if (type == "key") {
            let gradeInfo = this.getGradingInfo(quiz);
            doc.getBody().editAsText().appendText("\r\r");
            doc.getBody().appendTable(gradeInfo[0]);
            doc.getBody().appendTable(gradeInfo[1]);
        }
        return doc;
    }


    private getGradingInfo(quiz: Quiz): any[] {
        let maxPoints = 0;
        let norm = this.norm;

        for (let ex of quiz.Exercises) {
            maxPoints += ex.Questions.length;
        }

        let normTable: any[][] = [["Max Punten: " + maxPoints + "\r" + norm + "% goed = " + Math.round(norm * maxPoints) / 100 + " punten = cijfer 6"]];
        let gradeTable: any[][] = [["aantal goed", "aantal fout", "cijfer"]];

        for (let i = 0; i < maxPoints; i++) {
            let cijfer = Math.round((10 - i * 4 / (maxPoints - norm / 100 * maxPoints)) * 10) / 10
            if (cijfer > 1) {
                gradeTable.push([maxPoints - i, i, cijfer]);
            }
        }
        return [normTable, gradeTable];
    }
}