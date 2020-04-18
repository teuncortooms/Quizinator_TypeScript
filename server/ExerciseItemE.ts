class ExerciseItemTypeE extends ExerciseItem {
    // Type E: "Translate the words into English."

    // override
    protected setQuestion() {
        this.question = this.translation;
    }

    // override
    protected setAnswer() {
        this.answer = this.word;
    }

}