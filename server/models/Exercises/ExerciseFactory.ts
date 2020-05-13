class ExerciseFactory {
    private static descriptions: { [id: string]: string } = {
        "A": "Translate the underlined words into Dutch.",
        "B": "Complete the sentences with words from the box. Translate the words into English.",
        "C": "Translate the word to complete the sentence.",
        "D": "Translate the words into Dutch.",
        "E": "Translate the words into English."
    }

    static get Descriptions() { return this.descriptions };

    public static Create(params: ExerciseConfig = {} as ExerciseConfig): Exercise {
        params.description = params.description || this.descriptions[params.type];
        let exercise: Exercise;
        switch (params.type) {
            case 'A':
            case 'C':
            case 'D':
            case 'E': 
                exercise = new Exercise(params);
                break;
            case 'B': 
                exercise = new ExerciseTypeB(params);
                break;
            default: throw "Unknown exercise type: " + params.type;
        }
        return exercise;
    }
}