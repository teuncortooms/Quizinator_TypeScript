class ExerciseTypeB extends Exercise {
    private box: string[][];

    get Box() { return this.box }

    public Init(type: string, description: string, size: number, idioms: Idiom[]) {
        this.initSuper(type, description, size, idioms);
        this.box = this.fillBox();
    };

    public Load(json: any) {
        super.Load(json);
        this.box = json.box;
    }

    public ReplaceQuestion(questionIndex: number, newIdiom: Idiom) {
        let question = ExerciseQuestionFactory.Create(this.type, newIdiom);
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
        let shuffledTranslations = [[Util.shuffle(translations).join('  *  ')]];
        this.box = shuffledTranslations;
        return shuffledTranslations;
    }
}

