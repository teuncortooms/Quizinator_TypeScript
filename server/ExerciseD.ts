class ExerciseTypeD extends Exercise {
    
    public Init(size: number, idioms: Idiom[]) {
        let type = 'D';
        let description = "Translate the words into Dutch.";
        this.initSuper(type, description, size, idioms);
    }
}