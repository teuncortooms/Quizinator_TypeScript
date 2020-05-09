class QuizDesigner {
    private idiomsManager: IdiomsManager;
    private quiz: Quiz;

    get IdiomsManager() { return this.idiomsManager };
    get Quiz() { return this.quiz };

    public Init(quiz: Quiz, idiomsManager: IdiomsManager) {
        this.quiz = quiz;
        this.idiomsManager = idiomsManager;
        this.save();
    }

    public Load(cachehelper: CacheHelper) {
        this.idiomsManager = new IdiomsManager();
        this.idiomsManager.Load(cachehelper);
        this.quiz = new Quiz();
        this.quiz.Load(cachehelper);
    }

    public ReplaceQuestion(exerciseIndex: number, questionIndex: number, newIdiomId: number) {
        let oldIdiomId: number;
        let newIdiom: Idiom;

        oldIdiomId = this.quiz.Exercises[exerciseIndex].Questions[questionIndex].IdiomId;

        // Update idiomsManager and get new idiom
        this.idiomsManager.ReplaceIdiom(oldIdiomId, newIdiomId);
        newIdiom = this.idiomsManager.GetIdiom(newIdiomId);

        // Update quiz question
        this.quiz.Exercises[exerciseIndex].ReplaceQuestion(questionIndex, newIdiom);

        // Save to cache
        this.save();
    }

    private save() {
        // Save to cache
        let cachehelper: CacheHelper = new CacheHelper;
        cachehelper.Clear();
        cachehelper.Save('idiomsManager', this.idiomsManager);
        cachehelper.Save('quiz', this.quiz);
    }
}