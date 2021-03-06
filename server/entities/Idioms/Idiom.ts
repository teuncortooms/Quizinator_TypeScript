class Idiom {
    protected idiomId: number;
    protected word: string;
    protected sentence: string;
    protected translation: string;

    get IdiomId(): number { return this.idiomId; }
    get Word(): string { return this.word; }
    get Sentence(): string { return this.sentence; }
    get Translation(): string { return this.translation; }

    public constructor(params: IdiomConfig = {} as IdiomConfig) {
        let {
            id = null,
            rowData = null,
            idiomJSON = null
        } = params;
        if (idiomJSON)
            this.convertJSONToQuestion(idiomJSON)
        else if (id && rowData)
            this.setMembersFromRowData(id, rowData);
    }

    private setMembersFromRowData(id: number, rowData: string[]) {
        const wordCol = 0;
        const translationCol = 1;
        const sentenceCol = 2;

        this.word = this.stripLexicalInfoFromWord(rowData[wordCol]);
        this.sentence = rowData[sentenceCol];
        this.translation = rowData[translationCol];
        this.idiomId = id;
    }

    protected convertJSONToQuestion(json: IdiomJSON) {   
        this.word = json.word;
        this.sentence = json.sentence;
        this.translation = json.translation;
        this.idiomId = json.idiomId;
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