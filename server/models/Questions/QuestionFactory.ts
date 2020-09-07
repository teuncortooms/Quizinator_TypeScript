class QuestionFactory {

    public static Create(params: QuestionConfig = {} as QuestionConfig) {
        let {
            type,
            idiom = null,
            questionDto: questionDto = null,
        } = params;
        console.log(params);
        let question: Question;
        switch (type) {
            case 'A':
                question = new QuestionTypeA({ idiom, questionDto: questionDto });
                break;
            case 'B':
                question = new QuestionTypeB({ idiom, questionDto: questionDto });
                break;
            case 'C':
                question = new QuestionTypeC({ idiom, questionDto: questionDto });
                break;
            case 'D':
                question = new QuestionTypeD({ idiom, questionDto: questionDto });
                break;
            case 'E':
                question = new QuestionTypeE({ idiom, questionDto: questionDto });
                break;
            default: throw "Unknown question type: " + type;
        }
        return question;
    }
}