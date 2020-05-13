class ExerciseTypeB extends Exercise {
    private box: string[][];

    get Box() { return this.box }

    public constructor(params: ExerciseConfig = {} as ExerciseConfig) {
        super(params);
        let {
            box = null
        } = params;
        if (box)
            this.box = box;
        else
            this.box = this.fillBox();
    };

    public ReplaceQuestion(questionIndex: number, newIdiom: Idiom) {
        let question = QuestionFactory.Create({ type: this.type, idiom: newIdiom });
        this.questions[questionIndex] = question;
        this.fillBox();
    }

    private fillBox(): string[][] {
        let translations: string[] = [];
        for (let i = 0; i < this.questions.length; i++) {
            translations.push(this.questions[i].Translation);
        }
        // shuffle translations, turn into string, and put string in 
        // double array (needed for quizdoc)
        let shuffledTranslations = [[Randomizer.Shuffle(translations).join('  *  ')]];
        this.box = shuffledTranslations;
        return shuffledTranslations;
    }
}

