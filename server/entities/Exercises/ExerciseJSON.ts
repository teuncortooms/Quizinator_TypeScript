interface ExerciseJSON {
    type: string;
    description: string;
    questions: QuestionJSON[];
    box?: string[][];
}