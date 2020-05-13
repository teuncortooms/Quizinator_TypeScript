class QuizDesigner {
    private idiomsManager: IdiomsSupplier;
    private quiz: Quiz;

    get IdiomsManager() { return this.idiomsManager };
    get Quiz() { return this.quiz };

    public constructor(params: QuizDesignerConfig = {} as QuizDesignerConfig) {
        let {
            quiz = null,
            idiomsManager = null,
            cachehelper = null
        } = params;
        if (cachehelper)
            this.Load(cachehelper);
        else if (quiz && idiomsManager) {
            this.Init(quiz, idiomsManager);
            this.save();
        }
        else throw "constructor params missing!";
    }

    private Init(quiz: Quiz, idiomsManager: IdiomsSupplier) {
        this.quiz = quiz;
        this.idiomsManager = idiomsManager;
    }

    private Load(cachehelper: CacheHelper) {
        this.idiomsManager = new IdiomsSupplier({ cachehelper });
        this.quiz = new Quiz({ cachehelper });
    }

    public ReplaceQuestion(exerciseIndex: number, questionIndex: number, newIdiomId: number) {
        let oldIdiomId: number;
        let newIdiom: Idiom;

        oldIdiomId = this.quiz.Exercises[exerciseIndex].Questions[questionIndex].IdiomId;
        newIdiom = this.idiomsManager.GetIdiom(newIdiomId);

        this.idiomsManager.ReplaceIdiom(oldIdiomId, newIdiomId);
        this.quiz.Exercises[exerciseIndex].ReplaceQuestion(questionIndex, newIdiom);

        this.save();
    }

    private save() {
        let cachehelper: CacheHelper = new CacheHelper;
        cachehelper.Clear();
        cachehelper.Save('idiomsManager', this.idiomsManager);
        cachehelper.Save('quiz', this.quiz);
    }
}