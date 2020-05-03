abstract class Exercise {

    protected type: string;
    protected description: string;
    protected exerciseItems: ExerciseItem[];

    get Type(): string { return this.type };
    get Description(): string { return this.description };
    get ExerciseItems(): ExerciseItem[] { return this.exerciseItems };
    get Box(): string[][] { return null };

    public abstract Init(size: number, idioms: Idiom[]): void;

    protected initSuper(type: string, description: string, size: number, idioms: Idiom[]) {
        this.type = type;
        this.description = description;
        this.exerciseItems = [];
        for (let i = 0; i < size; i++) {
            this.AddItem(idioms[i])
        };
    }

    public Load(json: any) {
        this.type = json.type;
        this.description = json.description;
        this.exerciseItems = [];
        for (let i = 0; i < json.exerciseItems.length; i++) {
            let item = ExerciseItemFactory.CreateFromCache(json.exerciseItems[i], json.type);
            this.exerciseItems.push(item);
        };
    }

    public AddItem(idiom: Idiom) {
        let item = ExerciseItemFactory.Create(this.type, idiom);
        this.exerciseItems.push(item);
    }

    public ReplaceItem(itemIndex: number, newIdiom: Idiom) {
        let item = ExerciseItemFactory.Create(this.type, newIdiom);
        this.exerciseItems[itemIndex] = item;
    }

    public DeleteItem(itemIndex: number) {

    }
}