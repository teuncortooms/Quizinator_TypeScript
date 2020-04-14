class ExerciseItemTypeB extends ExerciseItem {
    // Type B: Pick a word from the box and translate.

    // override
    protected setQuestion(idiom: Idiom) {
        this.question = this.makeGapInSentence(idiom.Sentence, idiom.Word);
    }

    // override
    protected setAnswer(idiom: Idiom) {
        this.answer = idiom.Word;
    }

}