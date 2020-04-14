class ExerciseTypeE extends Exercise {
    
    public Init(size: number, idioms: Idiom[]) {
        let type = 'E';
        let description = "Translate the words into English.";
        this.initSuper(type, description, size, idioms);
    }
}