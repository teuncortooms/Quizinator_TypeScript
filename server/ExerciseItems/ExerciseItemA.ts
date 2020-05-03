class ExerciseItemTypeA extends ExerciseItem {
    // Type A: Translate the underlined word

    // override
    protected setQuestion() {
        this.question = this.underlineWordInSentence(this.sentence, this.word);
    }

    // override
    protected setAnswer() {
        this.answer = this.translation;
    }

}