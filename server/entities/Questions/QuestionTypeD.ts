class QuestionTypeD extends Question {
    // Type D: "Translate the words into Dutch."

    // override
    protected setQuestionText() {
        this.questionText = this.word;
    }

    // override
    protected setAnswerText() {
        this.answerText = this.translation;
    }

}