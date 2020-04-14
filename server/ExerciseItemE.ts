class ExerciseItemTypeE extends ExerciseItem {
    // Type E: "Translate the words into English."

    // override
    protected setQuestion(idiom: Idiom) {
        this.question = idiom.Translation;
    }

    // override
    protected setAnswer(idiom: Idiom) {
        this.answer = idiom.Word;
    }

}