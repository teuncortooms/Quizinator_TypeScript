class Exercise {

    protected type: string;
    protected description: string;
    protected questions: ExerciseQuestion[];

    get Type(): string { return this.type };
    get Description(): string { return this.description };
    get Questions(): ExerciseQuestion[] { return this.questions };
    get Box(): string[][] { return null };

    public Init(type: string, description: string, size: number, idioms: Idiom[]) {
        this.initSuper(type, description, size, idioms);
    }

    protected initSuper(type: string, description: string, size: number, idioms: Idiom[]) {
        this.type = type;
        this.description = description;
        this.questions = [];
        for (let i = 0; i < size; i++) {
            this.AddQuestion(idioms[i])
        };
    }

    public Load(json: any) {
        this.type = json.type;
        this.description = json.description;
        this.questions = [];
        for (let i = 0; i < json.questions.length; i++) {
            let question = ExerciseQuestionFactory.CreateFromCache(json.questions[i], json.type);
            this.questions.push(question);
        };
    }

    public AddQuestion(idiom: Idiom) {
        let question = ExerciseQuestionFactory.Create(this.type, idiom);
        this.questions.push(question);
    }

    public ReplaceQuestion(questionIndex: number, newIdiom: Idiom) {
        let question = ExerciseQuestionFactory.Create(this.type, newIdiom);
        this.questions[questionIndex] = question;
    }

    public DeleteQuestion(questionIndex: number) {

    }
}