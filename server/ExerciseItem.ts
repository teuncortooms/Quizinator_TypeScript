abstract class ExerciseItem {
    protected question: string;
    protected answer: string;
    protected idiomId: number;

    get Question() { return this.question; }
    get Answer() { return this.answer; }
    get IdiomId() { return this.idiomId; }

    public Init(idiom: Idiom) {
        this.setQuestion(idiom);
        this.setAnswer(idiom);
        this.idiomId = idiom.Id;
    }

    public Load(json: any) {
        this.question = json.question;
        this.answer = json.answer;
        this.idiomId = json.idiomId;
    }

    protected abstract setQuestion(idiom: Idiom): void;
    protected abstract setAnswer(idiom: any): void;

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