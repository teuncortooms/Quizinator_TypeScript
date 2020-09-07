class Idiom {
    protected idiomId: number;
    protected word: string;
    protected sentence: string;
    protected translation: string;

    get IdiomId(): number { return this.idiomId; }
    get Word(): string { return this.word; }
    get Sentence(): string { return this.sentence; }
    get Translation(): string { return this.translation; }

    public constructor(
        id: number = null,
        word: string = null,
        sentence: string = null,
        translation: string = null
    ) {
        this.word = this.stripLexicalInfoFromWord(word);
        this.sentence = sentence;
        this.translation = translation;
        this.idiomId = id;
    }

    protected stripLexicalInfoFromWord(word: string) {
        // strip lexical info from an idiom word, i.e. info like (v), (n), (adj) etc.
        let strippedWord = word
            .replace(/\s+\(v\)\s*$/, '') // \s+ = one or more spaces; s\* = zero or more spaces; $ = end of word
            .replace(/\s+\(n\)\s*$/, '')
            .replace(/\s+\(adj\)\s*$/, '')
            .replace(/\s+\(phr\s+v\)\s*$/, '')
            .replace(/\s+\(n\s+pl\)\s*$/, '')
            .replace(/\s+pl\s+n\s*$/, '')
            .replace(/\s+n\s+pl\s*$/, '')
            .replace(/\s+adj\s*$/, '')
            .replace(/\s+n\s*$/, '')
            .replace(/\s+v\s*$/, '')
            .replace(/\s+prep\s*$/, '')
            .replace(/\s+pron\s*$/, '')
            .replace(/\s+adv\s*$/, '')
            .trim();
        return strippedWord;
    }
}