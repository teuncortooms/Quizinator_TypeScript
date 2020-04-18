class ExerciseItemTypeD extends ExerciseItem {
    // Type D: "Translate the words into Dutch."

    // override
    protected setQuestion() {
        this.question = this.word;
    }

    // override
    protected setAnswer() {
        this.answer = this.translation;
    }

}