class ExerciseFactory {
    public static Create(type: string, size: number, idioms: Idiom[]) : Exercise {
        let exercise: Exercise = this.pick(type);
        exercise.Init(size, idioms);
        return exercise;
    }

    public static CreateFromCache(json: any) : Exercise {
        let type = json.type;
        let exercise: Exercise = this.pick(type);
        exercise.Load(json);
        return exercise;
    }

    private static pick(type: string) : Exercise {
        let exercise: Exercise;
        if (type == 'A') {
            exercise = new ExerciseTypeA();
        }
        else if (type == 'B') {
            exercise = new ExerciseTypeB();
        }
        else if (type == 'C') {
            exercise = new ExerciseTypeC();
        }
        else if (type == 'D') {
            exercise = new ExerciseTypeD();
        }
        else if (type == 'E') {
            exercise = new ExerciseTypeE();
        }
        else {
            throw "Unknown exercise type: " + type;
        }
        return exercise;
    }
}