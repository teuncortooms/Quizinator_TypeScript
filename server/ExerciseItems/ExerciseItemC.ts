class ExerciseItemTypeC extends ExerciseItem {
    // Type C: Complete the sentence using a translation

    // override
    protected setQuestion() {
        let gappedSentence = this.makeGapInSentence(this.sentence, this.word);
        this.question = this.addTranslationToSentence(gappedSentence, this.translation);
    }

    // override
    protected setAnswer() {
        this.answer = this.word;
    }

}