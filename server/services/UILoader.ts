class Presenter {
    public ShowSidebar(settings: IAppSettings) {
        let template = this.createTemplate(settings);
        SpreadsheetApp.getUi().showSidebar(template);
    }

    private createTemplate(settings: IAppSettings) {
        return HtmlService.createTemplateFromFile(settings.PATH_SIDEBAR).evaluate()
            .setSandboxMode(HtmlService.SandboxMode.IFRAME)
            .setTitle(settings.TITLE);
    }
}