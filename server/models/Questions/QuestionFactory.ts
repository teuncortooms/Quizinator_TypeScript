class QuestionFactory {

    public static Create(params: QuestionConfig = {} as QuestionConfig) {
        let {
            type,
            idiom = null,
            questionJSON = null,
        } = params;
        console.log(params);
        let question: Question;
        switch (type) {
            case 'A':
                question = new QuestionTypeA({ idiom, questionJSON });
                break;
            case 'B':
                question = new QuestionTypeB({ idiom, questionJSON });
                break;
            case 'C':
                question = new QuestionTypeC({ idiom, questionJSON });
                break;
            case 'D':
                question = new QuestionTypeD({ idiom, questionJSON });
                break;
            case 'E':
                question = new QuestionTypeE({ idiom, questionJSON });
                break;
            default: throw "Unknown question type: " + type;
        }
        return question;
    }
}