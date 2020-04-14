class ExerciseItemTypeD extends ExerciseItem {
    // Type D: "Translate the words into Dutch."

    // override
    protected setQuestion(idiom: Idiom) {
        this.question = idiom.Word;
    }

    // override
    protected setAnswer(idiom: Idiom) {
        this.answer = idiom.Translation;
    }

}