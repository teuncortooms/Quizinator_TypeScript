class ExerciseQuestionFactory {

    public static Create(type: string, idiom: Idiom) {
        let question: ExerciseQuestion = this.pick(type);
        question.Init(idiom);
        return question;
    }

    public static CreateFromCache(json: any, type: string): ExerciseQuestion {
        let question: ExerciseQuestion = this.pick(type);
        question.Load(json);
        return question;
    }

    private static pick(type: string) {
        let question: ExerciseQuestion;
        if (type == 'A') {
            question = new ExerciseQuestionTypeA();
        }
        else if (type == 'B') {
            question = new ExerciseQuestionTypeB();
        }
        else if (type == 'C') {
            question = new ExerciseQuestionTypeC();
        }
        else if (type == 'D') {
            question = new ExerciseQuestionTypeD();
        }
        else if (type == 'E') {
            question = new ExerciseQuestionTypeE();
        }
        else {
            throw "Unknown question type: " + type;
        }
        return question;
    }
}