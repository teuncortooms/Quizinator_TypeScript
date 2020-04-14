class ExerciseTypeC extends Exercise {
    
    public Init(size: number, idioms: Idiom[]) {
        let type = 'C';
        let description = "Translate the words.";
        this.initSuper(type, description, size, idioms);
    }
}