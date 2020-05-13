class Quiz {
    private title: string;
    private exercises: Exercise[];

    get Title() { return this.title; }
    get Exercises() { return this.exercises; }

    public constructor(params: QuizConfig = {} as QuizConfig) {
        let {
            title = null,
            exerciseTypes = null,
            exerciseSizes = null,
            idioms = null,
            cachehelper = null
        } = params;
        if (cachehelper)
            this.Load(cachehelper);
        else if (title && exerciseTypes && exerciseSizes && idioms)
            this.setMembers(title, exerciseTypes, exerciseSizes, idioms)
        else throw "constructor params missing!";
    }

    private setMembers(title: string, exerciseTypes: string[], exerciseSizes: number[], idioms: Idiom[]) {
        this.title = title;
        this.exercises = [];
        this.makeExercises(exerciseTypes, exerciseSizes, idioms);
    }

    private Load(cachehelper: CacheHelper) {
        let str = cachehelper.Load('quiz');
        let json = JSON.parse(str);
        this.title = json.title;
        this.exercises = [];
        for (let i = 0; i < json.exercises.length; i++) {
            let exerciseJSON = json.exercises[i];
            this.exercises.push(ExerciseFactory.Create({
                type: exerciseJSON.type,
                description: exerciseJSON.description,
                questionsJSON: exerciseJSON.questions
            }));
        }
    }

    private makeExercises(exTypes: string[], exSizes: number[], idioms: Idiom[]) {
        let idiomsFrom = 0;
        let idiomsUntil;
        for (let i = 0; i < exTypes.length; i++) {
            let type: string = exTypes[i];
            let size: number = exSizes[i];
            idiomsUntil = idiomsFrom + size;
            let IdiomsSlice: Idiom[] = idioms.slice(idiomsFrom, idiomsUntil);

            let exercise: Exercise = ExerciseFactory.Create({
                type,
                idioms: IdiomsSlice
            });
            this.exercises.push(exercise);
            idiomsFrom = idiomsUntil;
        }
    }
}
