class ExerciseItemTypeC extends ExerciseItem {
    // Type C: Complete the sentence using a translation

    // override
    protected setQuestion(idiom: Idiom) {
        let gappedSentence = this.makeGapInSentence(idiom.Sentence, idiom.Word);
        this.question = this.addTranslationToSentence(gappedSentence, idiom.Translation);
    }

    // override
    protected setAnswer(idiom: Idiom) {
        this.answer = idiom.Word;
    }

}