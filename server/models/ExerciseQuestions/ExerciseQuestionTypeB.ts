class ExerciseQuestionTypeB extends ExerciseQuestion {
    // Type B: Pick a word from the box and translate.

    // override
    protected setQuestionText() {
        this.questionText = this.makeGapInSentence(this.sentence, this.word);
    }

    // override
    protected setAnswerText() {
        this.answerText = this.word;
    }

}