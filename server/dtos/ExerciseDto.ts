interface ExerciseDto {
    type: string;
    description: string;
    questions: QuestionDto[];
    box?: string[][];
}