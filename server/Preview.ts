class Preview {
    private template: any;

    public constructor() {
        this.template = HtmlService.createTemplateFromFile('client/preview');
    }

    public Show(quiz: Quiz) {
        this.template.quiz = quiz;
        let html = this.template.evaluate()
            .setWidth(800)
            .setHeight(2000);
        SpreadsheetApp.getUi().showModalDialog(html, 'Preview');
    }
}