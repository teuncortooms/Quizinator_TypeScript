abstract class ExerciseQuestion extends Idiom {
    protected questionText: string;
    protected answerText: string;

    get QuestionText() { return this.questionText; }
    get AnswerText() { return this.answerText; }

    public Init(idiom: Idiom) {
        this.idiomId = idiom.IdiomId;
        this.word = idiom.Word;
        this.sentence = idiom.Sentence;
        this.translation = idiom.Translation;
        this.setQuestionText();
        this.setAnswerText();
    }

    public Load(json: any) {
        this.idiomId = json.idiomId;
        this.word = json.word;
        this.sentence = json.sentence;
        this.translation = json.translation;
        this.questionText = json.questionText;
        this.answerText = json.answerText;
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