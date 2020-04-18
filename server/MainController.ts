class MainController {
    private spreadsheet: Spreadsheet;
    private userInput: UserInput;
    private idiomsStore: IdiomsStore;
    private quiz: Quiz;
    private preview: Preview;
    private quizDocs: QuizDocs;

    get IdiomsStore() { return this.idiomsStore };
    get Quiz() { return this.quiz };

    public getUnitsFromSpreadsheet() {
        this.setSpreadsheet();
        return this.spreadsheet.Units;
    }

    public Init(formObject: any) {
        // Handle input and pick idioms
        this.setSpreadsheet();
        this.userInput = new UserInput(formObject);
        this.idiomsStore = new IdiomsStore();
        this.idiomsStore.Init(this.userInput.Units, this.userInput.getTotalSize(), this.spreadsheet);

        let title: string = this.userInput.Title;
        let exerciseTypes: string[] = this.userInput.TypePerExercise;
        let exerciseSizes: number[] = this.userInput.SizePerExercise;
        let idioms: Idiom[] = this.idiomsStore.SelectedIdioms;

        // Make quiz
        this.quiz = new Quiz();
        this.quiz.Init(title, exerciseTypes, exerciseSizes, idioms);

        // Save
        this.save();
    }

    public Load() {
        let dataString = CacheHelper.Load('idiomsStore');
        this.idiomsStore = new IdiomsStore();
        this.idiomsStore.Load(dataString);

        dataString = CacheHelper.Load('quiz');
        this.quiz = new Quiz();
        this.quiz.Load(dataString);
    }

    public previewQuiz() {
        this.preview = new Preview();
        this.preview.Show(this.quiz);
    }

    public ReplaceItem(exerciseIndex: number, itemIndex: number, newIdiomId: number) {
        let oldIdiomId: number;
        let newIdiom: Idiom;
        let newItem: ExerciseItem;

        oldIdiomId = this.quiz.Exercises[exerciseIndex].ExerciseItems[itemIndex].IdiomId;

        // Update idiomsStore and get new idiom
        this.idiomsStore.ReplaceIdiom(oldIdiomId, newIdiomId);
        newIdiom = this.idiomsStore.GetIdiom(newIdiomId);

        // Update quiz item
        this.quiz.Exercises[exerciseIndex].ReplaceItem(itemIndex, newIdiom);

        // Save to cache
        this.save();
    }

    public CreateQuizDocs(formObject: any) {
        this.quizDocs = new QuizDocs(formObject);
        this.quizDocs.Generate(this.quiz);
    }

    private setSpreadsheet() {
        if (this.spreadsheet == null) {
            this.spreadsheet = new Spreadsheet;
        }
    }

    private save() {
        // Save to cache
        CacheHelper.Clear();
        CacheHelper.Save('idiomsStore', this.idiomsStore);
        CacheHelper.Save('quiz', this.quiz);
    }
}