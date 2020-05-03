class ExerciseTypeA extends Exercise {
    
    public Init(size: number, idioms: Idiom[]) {
        let type = 'A';
        let description = "Translate the underlined words into Dutch.";
        this.initSuper(type, description, size, idioms);
    }
}