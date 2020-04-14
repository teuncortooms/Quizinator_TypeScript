class Idiom {
    private id: number;
    private word: string;
    private sentence: string;
    private translation: string;

    get Id(): number { return this.id; }
    get Word(): string { return this.word; }
    get Sentence(): string { return this.sentence; }
    get Translation(): string { return this.translation; }

    public Init(id: any, rowData: any) {
        let wordCol = 0;
        let translationCol = 1;
        let sentenceCol = 2;

        this.word = this.stripWord(rowData[wordCol]);
        this.sentence = rowData[sentenceCol];
        this.translation = rowData[translationCol];
        this.id = id;
    }

    public Load(json: any) {
        this.word = json.word;
        this.sentence = json.sentence;
        this.translation = json.translation;
        this.id = json.id;
    }

    protected stripWord(word: string) {
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