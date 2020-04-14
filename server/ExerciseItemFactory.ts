class ExerciseItemFactory {

    public static Create(type: string, idiom: Idiom) {
        let exerciseItem: ExerciseItem = this.pick(type);
        exerciseItem.Init(idiom);
        return exerciseItem;
    }

    public static CreateFromCache(json: any, type: string) : ExerciseItem {
        let exerciseItem: ExerciseItem = this.pick(type);
        exerciseItem.Load(json);
        return exerciseItem;
    }

    private static pick(type: string){
        let exerciseItem: ExerciseItem;
        if (type == 'A') {
            exerciseItem = new ExerciseItemTypeA();
        }
        else if (type == 'B') {
            exerciseItem = new ExerciseItemTypeB();
        }
        else if (type == 'C') {
            exerciseItem = new ExerciseItemTypeC();
        }
        else {
            throw "Unknown item type: " + type;
        }
        return exerciseItem;
    }
}