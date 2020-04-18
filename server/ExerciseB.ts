class ExerciseTypeB extends Exercise {
    private box: string[][];

    get Box() { return this.box }

    public Init(size: number, idioms: Idiom[]) {
        let type = 'B';
        let description = "Complete the sentences with words from the box. Translate the words into English.";
        this.initSuper(type, description, size, idioms);
        this.box = this.fillBox(idioms);
    };

    public Load(json: any) {
        super.Load(json);
        this.box = json.box;
    }

    private fillBox(idioms: Idiom[]): string[][] {
        let translations: string[] = [];
        for (let i = 0; i < idioms.length; i++) {
            translations.push(idioms[i].Translation);
        }
        // shuffle translations, turn into string, and put string in 
        // double array (needed for quizdoc)
        let shuffledTranslations = [[Util.shuffle(translations).join('  *  ')]];
        this.box = shuffledTranslations;
        return shuffledTranslations;
    }
}

