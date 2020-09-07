abstract class Question extends Idiom {
    protected questionText: string;
    protected answerText: string;

    get QuestionText() { return this.questionText; }
    get AnswerText() { return this.answerText; }

    public constructor(params: QuestionConfig = {} as QuestionConfig) {
        super();
        let {
            idiom = null,
            questionDto: questionDto = null
        } = params;
        if (idiom) {
            this.convertIdiomToQuestion(idiom);
        }
        else if (questionDto) {
            // TODO: finish Mapper to handle mappings
            this.convertJSONToQuestion(questionDto);
        }
        else throw "Constructor parameters missing!";
    }

    private convertIdiomToQuestion(idiom: Idiom) {
        this.idiomId = idiom.IdiomId;
        this.word = idiom.Word;
        this.sentence = idiom.Sentence;
        this.translation = idiom.Translation;
        this.setQuestionText();
        this.setAnswerText();
    }

    protected convertJSONToQuestion(dto: QuestionDto) {
        this.idiomId = dto.idiomId;
        this.word = dto.word;
        this.sentence = dto.sentence;
        this.translation = dto.translation;
        this.questionText = dto.questionText;
        this.answerText = dto.answerText;
    }

    protected abstract setQuestionText(): void;
    protected abstract setAnswerText(): void;

    protected makeGapInSentence(sentence: string, word: string) {
        let regEx = new RegExp(word, "ig");
        let gappedSentence = sentence.replace(regEx, "________");
        return gappedSentence;
    }

    protected addTranslationToSentence(sentence: string, translation: string) {
        let sentenceWithTranslation = sentence + ' (' + translation + ')';
        return sentenceWithTranslation;
    }

    protected underlineWordInSentence(sentence: string, word: string) {
        let underlinedSentence;
        let wordIndex;

        wordIndex = sentence.toLowerCase().indexOf(word.toLowerCase());
        underlinedSentence = [
            sentence.slice(0, wordIndex),
            "<u>",
            sentence.slice(wordIndex, wordIndex + word.length),
            "</u>",
            sentence.slice(wordIndex + word.length)
        ].join('');

        return underlinedSentence;
    }

}