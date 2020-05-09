class ExerciseQuestionTypeA extends ExerciseQuestion {
    // Type A: Translate the underlined word

    // override
    protected setQuestionText() {
        this.questionText = this.underlineWordInSentence(this.sentence, this.word);
    }

    // override
    protected setAnswerText() {
        this.answerText = this.translation;
    }

}