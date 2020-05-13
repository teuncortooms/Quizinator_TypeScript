class QuestionTypeE extends Question {
    // Type E: "Translate the words into English."

    // override
    protected setQuestionText() {
        this.questionText = this.translation;
    }

    // override
    protected setAnswerText() {
        this.answerText = this.word;
    }

}