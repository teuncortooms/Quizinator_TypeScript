class ExerciseItemTypeB extends ExerciseItem {
    // Type B: Pick a word from the box and translate.

    // override
    protected setQuestion() {
        this.question = this.makeGapInSentence(this.sentence, this.word);
    }

    // override
    protected setAnswer() {
        this.answer = this.word;
    }

}