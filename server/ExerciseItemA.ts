class ExerciseItemTypeA extends ExerciseItem {
    // Type A: Translate the underlined word

    // override
    protected setQuestion(idiom: Idiom) {
        this.question = this.underlineWordInSentence(idiom.Sentence, idiom.Word);
    }

    // override
    protected setAnswer(idiom: Idiom) {
        this.answer = idiom.Translation;
    }

}