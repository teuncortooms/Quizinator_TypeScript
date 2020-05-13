class QuestionTypeC extends Question {
    // Type C: Complete the sentence using a translation

    // override
    protected setQuestionText() {
        let gappedSentence = this.makeGapInSentence(this.sentence, this.word);
        this.questionText = this.addTranslationToSentence(gappedSentence, this.translation);
    }

    // override
    protected setAnswerText() {
        this.answerText = this.word;
    }

}