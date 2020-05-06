class ExerciseFactory {
    private static descriptions: { [id: string]: string } = {
        "A": "Translate the underlined words into Dutch.",
        "B": "Complete the sentences with words from the box. Translate the words into English.",
        "C": "Translate the word to complete the sentence.",
        "D": "Translate the words into Dutch.",
        "E": "Translate the words into English."
    }

    static get Descriptions(){ return this.descriptions };

    public static Create(type: string, size: number, idioms: Idiom[]): Exercise {
        let exercise: Exercise = this.pick(type);
        exercise.Init(type, this.descriptions[type], size, idioms);
        return exercise;
    }

    public static CreateFromCache(json: any): Exercise {
        let type = json.type;
        let exercise: Exercise = this.pick(type);
        exercise.Load(json);
        return exercise;
    }

    private static pick(type: string): Exercise {
        switch (type) {
            case 'A':
            case 'C':
            case 'D':
            case 'E': return new Exercise();
            case 'B': return new ExerciseTypeB();
            default: throw "Unknown exercise type: " + type;
        }
    }
}