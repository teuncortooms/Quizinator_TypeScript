class Quiz {
    private title: string;
    private exercises: Exercise[];

    get Title() { return this.title; }
    get Exercises() { return this.exercises; }

    public Init(title: string, exerciseTypes: string[], exerciseSizes: number[], idioms: Idiom[]) {
        this.title = title;
        this.exercises = [];
        this.makeExercises(exerciseTypes, exerciseSizes, idioms);
    }

    public Load(cachehelper: CacheHelper) {
        let str = cachehelper.Load('quiz');
        let json = JSON.parse(str);
        this.title = json.title;
        this.exercises = [];
        for(let i = 0; i < json.exercises.length; i++){
            this.exercises[i] = ExerciseFactory.CreateFromCache(json.exercises[i]);
        }
    }

    private makeExercises(exTypes: string[], exSizes: number[], idioms: Idiom[]) {
        let idiomsFrom = 0;
        let idiomsUntil;
        for (let i = 0; i < exTypes.length; i++) {
            let type: string = exTypes[i];
            let size: number = exSizes[i];
            idiomsUntil = idiomsFrom + size;
            let IdiomsSlice = idioms.slice(idiomsFrom, idiomsUntil);

            let exercise: Exercise = ExerciseFactory.Create(type, size, IdiomsSlice);
            this.exercises.push(exercise);
            idiomsFrom = idiomsUntil;
        }
    }
}
