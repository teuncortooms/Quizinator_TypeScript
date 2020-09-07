class Exercise {

    protected type: string;
    protected description: string;
    protected questions: Question[];

    get Type(): string { return this.type };
    get Description(): string { return this.description };
    get Questions(): Question[] { return this.questions };
    get Box(): string[][] { return null };

    public constructor(params: ExerciseConfig = {} as ExerciseConfig) {
        let {
            type = null,
            description = null,
            idioms = null,
            questionsDto: questionsDto = null
        } = params;
        this.type = type;
        this.description = description;
        this.questions = [];
        if (questionsDto)
            this.AddQuestionsFromJSON(questionsDto);
        else if (idioms)
            this.AddQuestionsFromIdioms(idioms);
        else throw "Constructor parameters missing!";
    }

    private AddQuestionsFromIdioms(idioms: Idiom[]) {
        for (let i = 0; i < idioms.length; i++) {
            this.AddQuestion(idioms[i])
        };
    }

    private AddQuestionsFromJSON(questionsDto: QuestionDto[]) {
        for (let i = 0; i < questionsDto.length; i++) {
            let question: Question = QuestionFactory.Create({
                type: this.type,
                questionDto: questionsDto[i]
            });
            this.questions.push(question);
        };
    }

    public AddQuestion(idiom: Idiom) {
        let question = QuestionFactory.Create({ type: this.type, idiom });
        this.questions.push(question);
    }

    public ReplaceQuestion(questionIndex: number, newIdiom: Idiom) {
        let question = QuestionFactory.Create({ type: this.type, idiom: newIdiom });
        this.questions[questionIndex] = question;
    }

    public DeleteQuestion(questionIndex: number) {

    }
}